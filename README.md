# is-host.in Waitlist

A minimal, modern waitlist site built with Next.js 16 and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Validation:** Zod
- **Integration:** Google Sheets API
- **Deployment:** Vercel-ready

## Quick Start

### 1. Install deps

```bash
npm install
```

### 2. Configure Google Sheets (Optional)

```bash
cp .env.local.example .env.local
# Edit .env.local with your Google Sheets credentials
```

### 3. Run dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## Google Sheets Integration

Emails are automatically saved to Google Sheets with:
- ✅ Duplicate detection
- ✅ Timestamp tracking
- ✅ Secure service account authentication
- ✅ No exposed credentials (uses environment variables)

## Deployment

### Vercel (Recommended)

```bash
vercel
```

Add environment variables in Vercel dashboard:
- `GOOGLE_SHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

### Other Platforms

Ensure you set the environment variables in your platform's settings.

## 🤝 Contributing

This is a waitlist page for **is-host.in** by **Mohammed Araan Sheikh**

## 📄 License

**Private project** — Copyright © 2025 Mohammed Araan Sheikh. All rights reserved.

✅ You may use as a template for your own projects  
❌ You may not redistribute or claim as your own  

See [LICENSE.md](./LICENSE.md) for full terms.
