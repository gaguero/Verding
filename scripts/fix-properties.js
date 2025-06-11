const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixProperties() {
  console.log('🔧 Fixing Properties - Setting is_active = true\n');
  
  try {
    // Update all properties to be active
    const { data, error } = await supabase
      .from('properties')
      .update({ is_active: true })
      .select('id, name, is_active');
    
    if (error) {
      console.error('❌ Error updating properties:', error.message);
      return;
    }
    
    console.log('✅ Successfully updated properties:');
    data.forEach(prop => {
      console.log(`   - ${prop.name}: is_active = ${prop.is_active}`);
    });
    
    console.log('\n🎉 Properties are now ready for user creation!');
    
  } catch (error) {
    console.error('❌ Script error:', error.message);
  }
}

fixProperties(); 
