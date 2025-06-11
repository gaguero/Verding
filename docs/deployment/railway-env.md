# Railway Environment Configuration

This document outlines the environment variables that need to be configured in
Railway for staging and production deployments.

## Required Environment Variables

### Supabase Configuration

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Authentication & Security

```
JWT_SECRET=your_super_secret_32_character_jwt_key_here
SESSION_SECRET=your_super_secret_32_character_session_key
ENCRYPTION_KEY=your_32_character_encryption_key_here
```

### API Configuration

```
PORT=3001
CORS_ORIGIN=https://your-web-app.railway.app
```

### n8n Agent Configuration

```
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/verding
N8N_API_KEY=your_n8n_api_key_here
AGENT_API_URL=https://your-agent-api.com/v1
```

## Optional Environment Variables

### Email Service (SMTP)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your_app_password
```

### File Storage (AWS S3)

```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=verding-assets-prod
```

### Monitoring & Analytics

```
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
ANALYTICS_KEY=your_analytics_key
```

## Service-Specific Configuration

### Backend Service

- Set all environment variables above
- Ensure `PORT` is set to the port Railway expects (usually 3001)
- Set `NODE_ENV=production` for production, `NODE_ENV=staging` for staging

### Web Service

- Set `VITE_` prefixed versions of client-safe variables:
  ```
  VITE_SUPABASE_URL=https://your-project-ref.supabase.co
  VITE_SUPABASE_ANON_KEY=your_anon_key_here
  VITE_API_BASE_URL=https://your-backend.railway.app
  ```

## Railway CLI Commands

### Set environment variables:

```bash
# Staging
railway login
railway link your-project-id
railway env set SUPABASE_URL=https://your-staging.supabase.co --environment staging

# Production
railway env set SUPABASE_URL=https://your-prod.supabase.co --environment production
```

### List environment variables:

```bash
railway env list --environment staging
railway env list --environment production
```

### Deploy with environment:

```bash
railway up --environment staging
railway up --environment production
```

## Security Notes

1. **Never commit actual environment values** to git
2. **Use Railway's web dashboard** for sensitive variables
3. **Rotate secrets regularly** especially JWT and encryption keys
4. **Use different Supabase projects** for staging and production
5. **Monitor environment variable access** in Railway logs

## Environment Validation

The application will validate all required environment variables on startup. If
any required variables are missing or invalid, the application will fail to
start with a detailed error message.

## Troubleshooting

### Common Issues:

1. **Invalid URL format**: Ensure URLs include protocol (https://)
2. **JWT Secret too short**: Must be at least 32 characters
3. **Missing CORS origin**: Set to your web app's Railway URL
4. **Supabase key mismatch**: Ensure keys match your Supabase project

### Debugging Environment Variables:

```bash
# Check current environment in Railway
railway env list

# Check application logs for validation errors
railway logs
```
