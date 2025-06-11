const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkProperties() {
  console.log('🔍 Checking Properties Table\n');
  
  try {
    // Get all properties with all fields
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*');
    
    if (error) {
      console.error('❌ Error:', error.message);
      return;
    }
    
    console.log('✅ Found', properties.length, 'properties:\n');
    
    properties.forEach((prop, index) => {
      console.log(`${index + 1}. ${prop.name}`);
      console.log(`   ID: ${prop.id}`);
      console.log(`   Active: ${prop.is_active}`);
      console.log(`   Created: ${prop.created_at}`);
      console.log(`   Description: ${prop.description}`);
      console.log('');
    });
    
    // Check if any are active
    const activeProperties = properties.filter(p => p.is_active === true);
    console.log(`📊 Active properties: ${activeProperties.length}/${properties.length}`);
    
    if (activeProperties.length === 0) {
      console.log('\n⚠️  No active properties found! This will cause user creation to fail.');
      console.log('💡 Need to update properties to set is_active = true');
    }
    
  } catch (error) {
    console.error('❌ Script error:', error.message);
  }
}

checkProperties(); 
