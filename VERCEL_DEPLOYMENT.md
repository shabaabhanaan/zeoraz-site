# Deploying Zeoraz Site to Vercel

This guide provides step-by-step instructions for deploying **Zeoraz Site** to Vercel seamlessly.

---

## 📋 Prerequisites

1. A **Vercel Account** ([vercel.com](https://vercel.com/))
2. A **MongoDB Atlas** database URI ([mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))
3. Your **GitHub repository** connected to Vercel

---

## 🚀 Step-by-Step Vercel Deployment

### 1. Push Code to GitHub
Ensure all your latest changes are pushed to your GitHub repository:
```bash
git add .
git commit -m "Prepare site for Vercel deployment"
git push origin main
```

---

### 2. Import Project into Vercel
1. Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Select your repository (`zeoraz-site`) from your GitHub organization or account.
4. Framework Preset: **Next.js** (automatically detected).
5. Root Directory: `./` (default).

---

### 3. Configure Environment Variables in Vercel

Under **Environment Variables** in the Vercel deployment configuration screen, add the following variables:

| Key | Example / Description | Required? |
| :--- | :--- | :---: |
| `DATABASE_URL` | `mongodb+srv://user:password@cluster.mongodb.net/zeoraz?retryWrites=true&w=majority` | **Yes** |
| `JWT_SECRET` | Secure 32+ character random string (e.g. `3b8f1c4e9d0a2f5b6c7e8a9d0b1c2d3e...`) | **Yes** |
| `NEXT_PUBLIC_APP_URL` | Your deployment URL, e.g. `https://zeoraz.vercel.app` | **Yes** |
| `RESEND_API_KEY` | Resend API key (`re_...`) for production transactional emails | Optional |
| `GOOGLE_CLIENT_ID` | OAuth Client ID from Google Cloud Console | Optional |
| `GOOGLE_CLIENT_SECRET` | OAuth Client Secret from Google Cloud Console | Optional |

---

### 4. Build Settings Verification

Vercel automatically detects the build command from `package.json`:
- **Build Command**: `prisma generate && next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

*(Prisma Client is automatically generated during build & postinstall steps).*

---

### 5. Click Deploy

Click **Deploy**. Vercel will install dependencies, generate the Prisma client for MongoDB, build the Next.js pages, and deploy your site to production.

---

## 🔒 Post-Deployment Setup (Optional)

### Google OAuth Redirect URIs
If using Google Login, update your Authorized Redirect URIs in [Google Cloud Console](https://console.cloud.google.com/):
- **Authorized JavaScript origins**: `https://<your-project>.vercel.app`
- **Authorized redirect URIs**: `https://<your-project>.vercel.app/api/auth/google/callback`

---

## 🧪 Verifying Production Build Locally

You can test the exact production build locally before pushing:

```bash
npm run build
npm run start
```
Open `http://localhost:3000` to verify.
