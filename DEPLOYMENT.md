# 🚀 Deployment Guide - Oroboros-Anthropic

## ✅ Completed Steps

### 1. GitHub Repository
- ✅ Repository created: `https://github.com/oroboroslabs-ai/anthropic`
- ✅ Code pushed to main branch
- ✅ Vercel configuration updated

### 2. Files Deployed
- ✅ `chat-anthropic.html` - Main chat interface
- ✅ `api/chat.js` - Chat API endpoint
- ✅ `api/models.js` - Models listing endpoint
- ✅ `api/status.js` - Status endpoint
- ✅ `vercel.json` - Vercel configuration
- ✅ `README.md` - Documentation

## 📋 Next Steps - Vercel Deployment

### Option 1: Deploy via Vercel Dashboard

1. **Go to Vercel**: https://vercel.com
2. **Click "Add New Project"**
3. **Import GitHub Repository**:
   - Search: `oroboroslabs-ai/anthropic`
   - Click "Import"
4. **Configure Project**:
   - **Project Name**: `oroboroslabs-ai-anthropic`
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (leave empty)
   - **Output Directory**: `./`
5. **Environment Variables**:
   - `OLLAMA_HOST`: `https://desktop-f4s5n12.taild4a403.ts.net`
6. **Click "Deploy"**

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd Q:\anthropic-claude-ai-model-chat
vercel

# Follow the prompts:
# - Set project name: oroboroslabs-ai-anthropic
# - Link to existing project: No
# - Override settings: No
```

## 🔧 Vercel Configuration

The `vercel.json` file is already configured with:

```json
{
  "version": 2,
  "name": "oroboroslabs-ai-anthropic",
  "routes": [
    {
      "src": "/claude-ai",
      "dest": "/chat-anthropic.html"
    }
  ],
  "env": {
    "OLLAMA_HOST": "https://desktop-f4s5n12.taild4a403.ts.net"
  }
}
```

## 🌐 Access URLs

After deployment, your chat interface will be available at:

- **Main URL**: `https://oroboroslabs-ai-anthropic.vercel.app`
- **Chat Interface**: `https://oroboroslabs-ai-anthropic.vercel.app/claude-ai`
- **API Endpoints**:
  - `https://oroboroslabs-ai-anthropic.vercel.app/api/chat`
  - `https://oroboroslabs-ai-anthropic.vercel.app/api/models`
  - `https://oroboroslabs-ai-anthropic.vercel.app/api/status`

## 🧪 Testing the Deployment

### 1. Test Main Page
```bash
curl https://oroboroslabs-ai-anthropic.vercel.app
```

### 2. Test Chat Interface
Open in browser: `https://oroboroslabs-ai-anthropic.vercel.app/claude-ai`

### 3. Test API Status
```bash
curl https://oroboroslabs-ai-anthropic.vercel.app/api/status
```

### 4. Test Models List
```bash
curl https://oroboroslabs-ai-anthropic.vercel.app/api/models
```

## 🐛 Troubleshooting

### Issue: 404 NOT_FOUND
**Solution**: The Vercel deployment hasn't been created yet. Follow the deployment steps above.

### Issue: Connection Refused
**Solution**: 
1. Check Ollama is running: `ollama list`
2. Verify Tailscale funnel: `tailscale funnel 11434`
3. Check environment variable in Vercel dashboard

### Issue: Models Not Found
**Solution**:
1. Verify models are installed: `ollama list`
2. Check model names match the configuration
3. Test connection locally first

## 📊 Monitoring

### Vercel Dashboard
- **Deployments**: View deployment history
- **Logs**: Check function logs
- **Analytics**: Monitor usage and performance

### Local Testing
```bash
# Test locally before deploying
cd Q:\anthropic-claude-ai-model-chat
node server.js

# Access at: http://127.0.0.1:8788/claude-ai
```

## 🔄 Updates

To update the deployment:

```bash
# Make changes to files
# Commit changes
git add .
git commit -m "Update description"
git push

# Vercel will auto-deploy on push to main branch
```

## 📞 Support

- **GitHub Issues**: https://github.com/oroboroslabs-ai/anthropic/issues
- **Vercel Docs**: https://vercel.com/docs
- **Ollama Docs**: https://ollama.ai/docs

---

**Status**: ✅ GitHub repository ready, awaiting Vercel deployment
**Repository**: https://github.com/oroboroslabs-ai/anthropic
**Branch**: main