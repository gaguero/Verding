# n8n Credential Setup Guide for Verding Agent

## Overview
This guide covers setting up all necessary credentials in your n8n Cloud account for the Verding agent system to function properly.

## Required Credentials

### 1. Supabase Credential
**Purpose**: Database operations, user management, and data storage

#### Setup Steps:
1. In n8n, go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Search for and select **Supabase**
4. Configure:
   - **Name**: `Verding Supabase`
   - **Host**: `peyneptmzomwjcbulyvf.supabase.co`
   - **API Key**: [Your Supabase Service Role Key]
   - **Database**: `postgres`

#### Getting the Service Role Key:
Follow the guide in `scripts/get-supabase-service-key.md` to obtain your service role key from the Supabase dashboard.

### 2. OpenAI Credential
**Purpose**: AI-powered agent responses and natural language processing

#### Setup Steps:
1. In n8n, go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Search for and select **OpenAI**
4. Configure:
   - **Name**: `OpenAI Verding`
   - **API Key**: [Your OpenAI API Key]
   - **Organization ID**: (Optional, leave blank if not using)

#### Getting OpenAI API Key:
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in to your OpenAI account
3. Click **Create new secret key**
4. Name it "Verding Agent" and copy the key
5. **⚠️ Important**: Store this key securely - you won't see it again!

### 3. HTTP Request Credential (Optional)
**Purpose**: Custom API calls to external services

#### Setup Steps:
1. In n8n, go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Search for and select **HTTP Request Auth**
4. Configure:
   - **Name**: `Verding API Auth`
   - **Authentication**: `Header Auth`
   - **Name**: `Authorization`
   - **Value**: `Bearer [your-api-token]`

## Credential Security Best Practices

### 1. Access Control
- Only share credentials with team members who need access
- Use n8n's built-in credential sharing features
- Regularly review who has access to credentials

### 2. Key Rotation
- Rotate API keys every 90 days
- Update credentials in n8n when keys are rotated
- Test workflows after credential updates

### 3. Environment Separation
- Use different credentials for development and production
- Never use production credentials in test workflows
- Consider using separate n8n instances for different environments

### 4. Monitoring
- Monitor API usage for unusual patterns
- Set up alerts for credential failures
- Keep logs of credential access and usage

## Testing Credentials

### Test Supabase Connection:
Create a simple workflow:
```
Manual Trigger → Supabase (Execute Query: "SELECT 1 as test") → Display Result
```

### Test OpenAI Connection:
Create a simple workflow:
```
Manual Trigger → OpenAI (Chat: "Hello, test message") → Display Result
```

## Troubleshooting

### Common Issues:

#### Supabase Connection Fails:
- Verify the service role key is correct
- Check that the host URL is exactly: `peyneptmzomwjcbulyvf.supabase.co`
- Ensure the database name is `postgres`

#### OpenAI Connection Fails:
- Verify the API key is valid and not expired
- Check your OpenAI account has sufficient credits
- Ensure the API key has the necessary permissions

#### Credential Not Found:
- Verify the credential name matches exactly in your workflows
- Check that the credential is saved and not in draft mode
- Ensure you have permission to access the credential

## Environment Variables for Local Development

If you're also running local development, update your `.env.local` file:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# n8n Configuration (for local n8n instance)
N8N_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook
N8N_API_KEY=your_n8n_api_key_here
```

## Next Steps

After setting up credentials:
1. Import the starter workflow: `scripts/n8n-verding-starter-workflow.json`
2. Update credential references in the workflow
3. Test the complete workflow end-to-end
4. Set up webhook endpoints for external integrations

## Support

If you encounter issues:
1. Check the n8n execution logs for detailed error messages
2. Verify all credentials are properly configured
3. Test each credential individually before using in complex workflows
4. Consult the n8n documentation for specific node requirements 