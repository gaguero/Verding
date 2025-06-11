#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createSingleUser() {
  console.log('🧪 Creating Single Test User\n');
  
  try {
    console.log('📧 Creating user: admin@verdingfarm.com');
    
    // Create user via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@verdingfarm.com',
      password: 'VerdingAdmin123!',
      email_confirm: true,
      user_metadata: {
        full_name: 'Verde Valley Admin',
        role: 'admin'
      }
    });
    
    if (authError) {
      console.error('❌ Auth error:', authError);
      return;
    }
    
    console.log('✅ User created successfully!');
    console.log('📧 Email:', authData.user.email);
    console.log('🆔 User ID:', authData.user.id);
    console.log('📝 Metadata:', authData.user.user_metadata);
    
    // Wait for triggers to complete
    console.log('\n⏳ Waiting for database triggers...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check if user profile was created
    console.log('\n🔍 Checking user profile creation...');
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();
      
    if (profileError) {
      console.log('❌ Profile check error:', profileError.message);
    } else {
      console.log('✅ User profile created:', profile);
    }
    
    // Check property access
    console.log('\n🔍 Checking property access...');
    const { data: access, error: accessError } = await supabase
      .from('user_property_access')
      .select('*, properties(name)')
      .eq('user_id', authData.user.id);
      
    if (accessError) {
      console.log('❌ Access check error:', accessError.message);
    } else {
      console.log('✅ Property access records:', access);
    }
    
  } catch (error) {
    console.error('❌ Script error:', error.message);
  }
}

createSingleUser(); 
