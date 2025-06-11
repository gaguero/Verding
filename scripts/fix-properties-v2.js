const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixPropertiesV2() {
  console.log('🔧 Fixing Properties V2 - Checking and updating is_active\n');
  
  try {
    // First, let's try to add the is_active column if it doesn't exist
    console.log('1. Adding is_active column if missing...');
    const { error: alterError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE properties 
        ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
      `
    });
    
    if (alterError) {
      console.log('   ⚠️  Could not add column (might already exist):', alterError.message);
    } else {
      console.log('   ✅ Column added or already exists');
    }
    
    // Now update all properties to be active using raw SQL
    console.log('\n2. Updating all properties to be active...');
    const { error: updateError } = await supabase.rpc('exec_sql', {
      sql: `
        UPDATE properties 
        SET is_active = TRUE 
        WHERE is_active IS NULL OR is_active = FALSE;
      `
    });
    
    if (updateError) {
      console.log('   ❌ Error with SQL update:', updateError.message);
      
      // Try the regular Supabase client method
      console.log('\n3. Trying regular update method...');
      const { data, error } = await supabase
        .from('properties')
        .update({ is_active: true })
        .neq('is_active', true) // Only update if not already true
        .select('id, name, is_active');
      
      if (error) {
        console.error('   ❌ Regular update also failed:', error.message);
        return;
      }
      
      console.log('   ✅ Updated via regular method:', data.length, 'properties');
    } else {
      console.log('   ✅ SQL update successful');
    }
    
    // Verify the results
    console.log('\n4. Verifying properties status...');
    const { data: properties, error: selectError } = await supabase
      .from('properties')
      .select('id, name, is_active');
    
    if (selectError) {
      console.error('   ❌ Error checking properties:', selectError.message);
      return;
    }
    
    console.log('   ✅ Current properties status:');
    properties.forEach(prop => {
      console.log(`      - ${prop.name}: is_active = ${prop.is_active}`);
    });
    
    const activeCount = properties.filter(p => p.is_active === true).length;
    console.log(`\n📊 Active properties: ${activeCount}/${properties.length}`);
    
    if (activeCount > 0) {
      console.log('\n🎉 Properties are now ready for user creation!');
    } else {
      console.log('\n⚠️  Still no active properties. Manual intervention may be needed.');
    }
    
  } catch (error) {
    console.error('❌ Script error:', error.message);
  }
}

fixPropertiesV2(); 
