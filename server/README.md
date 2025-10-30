# Portfolio Backend Server

## Deployment Options

### 1. Vercel (Recommended for Serverless)
```bash
npm install -g vercel
vercel --prod
```

### 2. Render.com
- Connect your GitHub repository
- Use the `render.yaml` configuration
- Set environment variables in Render dashboard

### 3. Railway
```bash
npm install -g @railway/cli
railway login
railway deploy
```

### 4. Docker
```bash
docker build -t portfolio-backend .
docker run -p 5000:5000 --env-file .env portfolio-backend
```

### 5. PM2 (VPS/Server)
```bash
npm install -g pm2
pm2 start ecosystem.config.js --env production
```

## Environment Variables
Copy `.env.example` to `.env` and configure:
- `Mongo_URL`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `RESEND_API`: Email service API key
- `CUSTOM_DOMAIN`: Production domain URL
- `NODE_ENV`: Set to 'production' for deployment

## Health Check
- GET `/health` - Server health status
- GET `/` - Basic server alive check