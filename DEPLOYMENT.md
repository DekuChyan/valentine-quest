# 🚀 Deployment Instructions

## Option 1: Render (Recommended - Easiest & Free)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/valentine-quest.git
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to https://render.com and sign up (free)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: Free
5. Click "Create Web Service"
6. Wait 5-10 minutes
7. Your site will be at: `https://your-app-name.onrender.com`

### Step 3: Updates
When you make changes:
```bash
git add .
git commit -m "Updated content"
git push
```
Render will automatically redeploy!

---

## Option 2: PythonAnywhere

1. Sign up at https://www.pythonanywhere.com (free)
2. Upload all project files
3. Create a new web app (Flask, Python 3.10)
4. Configure WSGI file
5. Add static files mapping: `/static/` → `/home/USERNAME/valentine-quest/static/`
6. Reload the app

---

## Option 3: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Create `vercel.json`:
```json
{
  "builds": [{"src": "app.py", "use": "@vercel/python"}],
  "routes": [{"src": "/(.*)", "dest": "app.py"}]
}
```
3. Run: `vercel --prod`

---

## Security

Change the secret key in `app.py`:
```python
app.secret_key = os.environ.get('SECRET_KEY', 'your-random-key-here')
```

Add as environment variable in your deployment platform.

---

## Testing After Deployment

- ✅ Homepage loads
- ✅ All story pages work
- ✅ Progress bar updates
- ✅ Final surprise appears
- ✅ Mobile responsive

---

Good luck! Your loved one will be amazed! 💕
