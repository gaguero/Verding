#!/usr/bin/env node

/**
 * Create Test Users Script
 * 
 * Creates 3 test users - one for each property:
 * - Verde Valley Farm (admin@verdingfarm.com)
 * - City Greens Hub (manager@citygreens.com) 
 * - Innovation Lab (researcher@innovationlab.com)
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config(); // Also load .env if it exists

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://peyneptmzomwjcbulyvf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY is required for user creation');
    console.log('   Add it to your .env file or get it from Supabase Dashboard > Settings > API');
    process.exit(1);
}

// Create Supabase client with service role key (can create users)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Test users to create
const testUsers = [
    {
        email: 'admin@verdingfarm.com',
        password: 'VerdingAdmin123!',
        userData: {
            full_name: 'Verde Valley Admin',
            role: 'admin'
        },
        propertyName: 'Verde Valley Farm'
    },
    {
        email: 'manager@citygreens.com', 
        password: 'CityGreens123!',
        userData: {
            full_name: 'City Greens Manager',
            role: 'manager'
        },
        propertyName: 'City Greens Hub'
    },
    {
        email: 'researcher@innovationlab.com',
        password: 'Innovation123!',
        userData: {
            full_name: 'Innovation Researcher',
            role: 'researcher'
        },
        propertyName: 'Innovation Lab'
    }
];

async function createTestUsers() {
    console.log('🧪 Creating Test Users for Verding\n');
    
    try {
        // First, check existing properties
        console.log('📋 Checking existing properties...');
        const { data: properties, error: propError } = await supabase
            .from('properties')
            .select('id, name')
            .order('name');
            
        if (propError) {
            console.error('❌ Error fetching properties:', propError.message);
            return;
        }
        
        console.log(`✅ Found ${properties.length} properties:`);
        properties.forEach(prop => {
            console.log(`   - ${prop.name} (${prop.id})`);
        });
        
        console.log('\n👤 Creating test users...\n');
        
        for (const user of testUsers) {
            console.log(`Creating user: ${user.email} for ${user.propertyName}`);
            
            // Create user via Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                email: user.email,
                password: user.password,
                email_confirm: true, // Auto-confirm email
                user_metadata: user.userData
            });
            
            if (authError) {
                if (authError.message.includes('already registered')) {
                    console.log(`   ⚠️  User ${user.email} already exists, skipping...`);
                    continue;
                } else {
                    console.error(`   ❌ Error creating ${user.email}:`, authError.message);
                    continue;
                }
            }
            
            console.log(`   ✅ Created user: ${authData.user.email}`);
            console.log(`   📧 User ID: ${authData.user.id}`);
            
            // The user registration trigger should automatically:
            // 1. Create user profile
            // 2. Assign to property
            // 3. Set up permissions
            
            // Wait a moment for triggers to complete
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        console.log('\n🔍 Verifying user creation...');
        
        // Check created users
        const { data: userProfiles, error: profileError } = await supabase
            .from('user_profiles')
            .select(`
                id,
                email,
                full_name,
                user_property_access (
                    role,
                    properties (name)
                )
            `);
            
        if (profileError) {
            console.error('❌ Error fetching user profiles:', profileError.message);
            return;
        }
        
        console.log(`\n✅ Successfully verified ${userProfiles.length} user profiles:`);
        userProfiles.forEach(profile => {
            const propertyAccess = profile.user_property_access[0];
            const propertyName = propertyAccess?.properties?.name || 'No property assigned';
            console.log(`   📧 ${profile.email} (${profile.full_name})`);
            console.log(`      🏢 Property: ${propertyName}`);
            console.log(`      👤 Role: ${propertyAccess?.role || 'No role assigned'}`);
            console.log('');
        });
        
        console.log('🎉 Test user creation completed successfully!\n');
        
        console.log('📝 Login credentials:');
        testUsers.forEach(user => {
            console.log(`   ${user.propertyName}:`);
            console.log(`   📧 Email: ${user.email}`);
            console.log(`   🔑 Password: ${user.password}`);
            console.log('');
        });
        
        console.log('🚀 Next steps:');
        console.log('   1. Test login with any of the above credentials');
        console.log('   2. Verify property access and data isolation');
        console.log('   3. Test the web interface with real user authentication');
        
    } catch (error) {
        console.error('❌ Script failed with error:', error.message);
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    createTestUsers();
}

module.exports = { createTestUsers }; 
