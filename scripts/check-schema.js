const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSchema() {
  console.log('🔍 Checking database schema...\n');
  
  // Check properties
  const { data: properties, error: propError } = await supabase
    .from('properties')
    .select('*');
  
  if (propError) {
    console.log('❌ Properties error:', propError.message);
  } else {
    console.log('✅ Properties found:', properties.length);
    properties.forEach(p => console.log('  -', p.name, p.id));
  }
  
  // Check if auth.users table exists and what we can access
  console.log('\n🔍 Checking auth.users access...');
  const { data: users, error: userError } = await supabase.auth.admin.listUsers();
  
  if (userError) {
    console.log('❌ Auth users error:', userError.message);
  } else {
    console.log('✅ Auth users accessible, found:', users.users.length, 'users');
  }
  
  // Check user_profiles table
  console.log('\n🔍 Checking user_profiles table...');
  const { data: profiles, error: profileError } = await supabase
    .from('user_profiles')
    .select('*')
    .limit(1);
    
  if (profileError) {
    console.log('❌ User profiles error:', profileError.message);
  } else {
    console.log('✅ User profiles accessible, found:', profiles.length, 'profiles');
  }
  
  // Check user_property_access table
  console.log('\n🔍 Checking user_property_access table...');
  const { data: access, error: accessError } = await supabase
    .from('user_property_access')
    .select('*')
    .limit(1);
    
  if (accessError) {
    console.log('❌ User property access error:', accessError.message);
  } else {
    console.log('✅ User property access accessible, found:', access.length, 'records');
  }
}

checkSchema().catch(console.error); 
