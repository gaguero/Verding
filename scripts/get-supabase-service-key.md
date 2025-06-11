# Getting Supabase Service Role Key for n8n Integration

## Overview
The Service Role Key is required for n8n to perform server-side operations with full database access, bypassing Row Level Security (RLS) policies when needed for agent operations.

## Steps to Obtain Service Role Key

### 1. Access Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Select your **VTF** project

### 2. Navigate to API Settings
1. In the left sidebar, click on **Settings**
2. Click on **API** in the settings menu

### 3. Copy Service Role Key
1. Scroll down to the **Project API keys** section
2. Find the **service_role** key (marked as "secret")
3. Click the **Copy** button next to the service_role key
4. **⚠️ IMPORTANT**: This key has full database access - keep it secure!

### 4. Update Environment File
1. Open `.env.local` in your project root
2. Replace `your_supabase_service_role_key_here` with the copied key:
   ```
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 5. Configure in n8n
1. In your n8n Cloud account, go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Search for and select **Supabase**
4. Configure:
   - **Name**: `Verding Supabase`
   - **Host**: `peyneptmzomwjcbulyvf.supabase.co`
   - **API Key**: Paste the service_role key
   - **Database**: `postgres`

## Security Notes
- The service_role key bypasses RLS policies
- Only use it for trusted server-side operations
- Never expose it in client-side code
- Consider rotating it periodically for security

## Next Steps
After configuring the credential:
1. Test the connection with a simple query
2. Create webhook endpoints for agent communication
3. Set up workflow templates for common operations

## Verification
You can test the connection by creating a simple n8n workflow:
```
Manual Trigger → Supabase → Execute Query: "SELECT 1 as test"
```

If successful, you should see `{"test": 1}` in the output. 