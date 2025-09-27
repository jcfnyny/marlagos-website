# Marlagos Website - Vercel Deployment Guide

This project is configured for deployment on Vercel with serverless functions.

## Prerequisites

1. **Database**: You need a Neon PostgreSQL database
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)

## Environment Variables

Set these environment variables in Vercel:

### Required
- `DATABASE_URL`: Your Neon PostgreSQL connection string

### Optional
- `NODE_ENV`: Set to `production` (Vercel sets this automatically)

## Deployment Steps

### 1. Database Setup
1. Create a Neon PostgreSQL database
2. Run database migrations:
   ```bash
   npm run db:push
   ```

### 2. Vercel Deployment

#### Option A: Deploy from Git (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

#### Option B: Deploy with Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project root
3. Follow the prompts
4. Set environment variables: `vercel env add DATABASE_URL`

### 3. Domain Configuration
- Vercel provides a free domain (yourproject.vercel.app)
- Add custom domain in Vercel dashboard if needed

## Project Structure

```
├── api/                    # Serverless API endpoints
│   ├── properties/
│   ├── activities/
│   ├── bookings/
│   ├── contacts/
│   └── newsletters/
├── client/                 # React frontend
├── lib/                   # Shared utilities
│   ├── db.ts              # Database connection (serverless optimized)
│   └── storage.ts         # Data access layer
├── shared/                # Shared schemas and types
└── vercel.json           # Vercel configuration
```

## Key Changes for Vercel

1. **Serverless Functions**: API routes moved to `/api` directory
2. **Database Connections**: Optimized for serverless with connection limits
3. **Build Process**: Updated to work with Vercel's build system
4. **Static Files**: Frontend built to `/dist` for static hosting

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Ensure DATABASE_URL is set correctly in Vercel environment
   - Check Neon database is accessible

2. **API Endpoints Not Working**
   - Verify API routes are in `/api` directory
   - Check serverless function logs in Vercel dashboard

3. **Build Failures**
   - Ensure all dependencies are in package.json
   - Check TypeScript errors

### Vercel Logs
View logs in Vercel dashboard or with CLI:
```bash
vercel logs
```

## Performance Optimization

- Static assets are cached by Vercel's CDN
- API functions are serverless and auto-scale
- Database connections are optimized for serverless cold starts

## Monitoring

- Use Vercel Analytics for performance monitoring
- Monitor API function performance in Vercel dashboard
- Set up error tracking (Sentry, etc.) if needed