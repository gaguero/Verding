const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runSQLDirect() {
  console.log('🔧 Running SQL directly to fix properties\n');
  
  try {
    // Try to run the SQL using the REST API directly
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY
      },
      body: JSON.stringify({
        sql: `
          -- Add is_active column if it doesn't exist
          ALTER TABLE properties 
          ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
          
          -- Update all existing properties to be active
          UPDATE properties 
          SET is_active = TRUE 
          WHERE is_active IS NULL OR is_active = FALSE;
        `
      })
    });
    
    if (!response.ok) {
      console.log('❌ Direct SQL failed, trying alternative approach...');
      
      // Alternative: Try to manually set the values using individual updates
      console.log('\n🔄 Trying manual property updates...');
      
      // Get all properties first
      const { data: properties, error: selectError } = await supabase
        .from('properties')
        .select('id, name');
      
      if (selectError) {
        console.error('❌ Error getting properties:', selectError.message);
        return;
      }
      
      console.log(`Found ${properties.length} properties to update`);
      
      // Try to update each property individually using raw SQL through PostgREST
      for (const prop of properties) {
        try {
          const updateResponse = await fetch(`${process.env.SUPABASE_URL}/rest/v1/properties?id=eq.${prop.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
              'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
              'Prefer': 'return=representation'
            },
            body: JSON.stringify({
              is_active: true
            })
          });
          
          if (updateResponse.ok) {
            console.log(`   ✅ Updated ${prop.name}`);
          } else {
            const errorText = await updateResponse.text();
            console.log(`   ❌ Failed to update ${prop.name}: ${errorText}`);
          }
        } catch (error) {
          console.log(`   ❌ Error updating ${prop.name}:`, error.message);
        }
      }
      
    } else {
      console.log('✅ SQL executed successfully');
    }
    
    // Verify the results
    console.log('\n🔍 Verifying results...');
    const { data: updatedProperties, error: verifyError } = await supabase
      .from('properties')
      .select('id, name, is_active');
    
    if (verifyError) {
      console.log('❌ Error verifying:', verifyError.message);
    } else {
      console.log('✅ Current properties:');
      updatedProperties.forEach(prop => {
        console.log(`   - ${prop.name}: is_active = ${prop.is_active}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Script error:', error.message);
  }
}

runSQLDirect(); 
