# Restroworks Web Frontend (Next.js)

Public-facing website consuming CMS data.

## 🚀 Setup
```bash
npm install
npm run dev:web
```

Runs at: http://localhost:3001

## 📂 Highlights
- pages/ → routes (home/[lang], contact/[lang])
- components/ → UI + block renderers
- lib/payloadClient.ts → API client
- styles/ → Tailwind setup

## 🌐 How it works
- Fetches content from CMS API
- Renders via block renderer
- Uses Tailwind + Framer Motion

## ✍️ Editing
1. Edit content in CMS
2. Web auto-fetches updated pages
