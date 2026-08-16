# Ali Berrehail — Elite B2B E-commerce Marketing & International Food Sourcing Consultancy

A cinematic, 3D-animated portfolio website built with React 19, Vite, Tailwind CSS, and React Three Fiber.

## Overview

This website represents Ali Berrehail's consultancy practice combining B2B e-commerce marketing, performance advertising (Meta, Google, TikTok), high-ticket lead generation, and international food sourcing for ambitious food businesses.

### Key Features

- **Cinematic 3D universe** — persistent, interactive Three.js scene rendered with React Three Fiber
- **Hero video** — `hero-background.mp4` with autoplay, loop, muted, playsInline
- **Scroll-driven animations** — cinematic reveal and parallax effects
- **Mouse interaction** — parallax cursor response and 3D camera controls
- **15-section architecture** — Home, Trust Strip, Ecosystem, Differentiator, Services, Sourcing, Comprehensive, Catalog, Private Label, Quality, Logistics, About, Trust Section, CTA, Inquiry, FAQ, Contact
- **17 food sourcing categories** with multi-select inquiry
- **5 languages** — EN, AR (RTL), ZH, TR, ES
- **Arabic RTL** — full right-to-left layout support
- **Contact forms** — contact and wholesale inquiry forms with success/error states
- **WhatsApp integration** — click-to-chat with pre-filled message
- **ANAE verification** — registration ID displayed
- **Responsive** — fully responsive across desktop, tablet, and mobile

## Technology Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| 3D Graphics | Three.js + React Three Fiber |
| Animation | Framer Motion |
| Internationalization | Custom i18n (EN/AR/ZH/TR/ES) |
| API (local) | PowerShell server (`server.ps1`) |
| API (production) | Vercel serverless functions |
| Deployment | Vercel |

## Development

### Prerequisites

- Node.js >= 18
- npm

### Local Development (Frontend)

```bash
cd site
npm install
npm run dev
```

Vite dev server starts at `http://localhost:5173`.

### Local Development (Full Stack with API)

1. First, build the frontend:
   ```bash
   cd site
   npm run build
   ```
   This outputs to `../public/`.

2. Then start the PowerShell server:
   ```cmd
   start.bat
   ```
   Opens at `http://localhost:8080`.

### Build for Production

```bash
cd site
npm run build
```

Outputs to `dist/` (or `../public/` when `VERCEL` is not set).

### Linting

```bash
cd site
npm run lint
```

## Project Structure

```
.
├── site/                      # Vite React application
│   ├── src/
│   │   ├── components/        # 15+ React components (15 sections)
│   │   ├── components/three/    # 3D scene components
│   │   ├── data/              # Catalog data (17 categories)
│   │   ├── i18n/              # Internationalization (5 languages)
│   │   ├── lib/               # Utility libraries (scroll, device detection)
│   │   ├── App.tsx            # Main app component (15-section layout)
│   │   ├── main.tsx           # Entry point
│   │   ├── config.ts          # Central site configuration
│   │   ├── index.css          # Global styles
│   │   └── vite.config.ts     # Vite configuration
│   ├── public/                # Static assets (fonts, favicon, video)
│   ├── api/                   # Vercel serverless functions
│   │   ├── contact.ts
│   │   ├── wholesale.ts
│   │   └── config.ts
│   └── package.json
├── public/                    # Production build output (for local server)
├── server.ps1                 # PowerShell web server (port 8080)
├── config.json                # Runtime config (gitignored)
├── start.bat                  # Launches server.ps1
├── data/                      # User submissions (gitignored)
├── kaggle-comfyui/            # AI asset generation notebooks
├── vercel.json                # Vercel deployment configuration
└── .env.example               # Environment variable template
```

## Production Deployment

### Vercel

```bash
vercel --prod
```

The project is configured for automatic deployment via `vercel.json`:
- **Root directory**: `site/`
- **Build command**: `npm run build`
- **Output directory**: `dist/`
- **API routes**: `api/` (serverless functions)

### Environment Variables

Copy `.env.example` to create your environment configuration:

| Variable | Default | Description |
|----------|---------|-------------|
| `BRAND` | Ali Berrehail | Brand name |
| `BRAND_TAG` | B2B · Food Sourcing | Brand tagline |
| `SITE_EMAIL` | a.ecommerce@outlook.fr | Contact email |
| `WHATSAPP_NUMBER` | 213555231119 | WhatsApp phone number |
| `DIRECT_PHONE` | +213 664 58 28 45 | Direct phone |
| `REGISTRATION_ID` | 109404******6109 | ANAE registration |
| `ADMIN_KEY` | change-me | Admin API key |

## API Endpoints

### Vercel (production)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/config` | GET | Returns site configuration |
| `/api/contact` | POST | Contact form submission |
| `/api/wholesale` | POST | Wholesale inquiry submission |

### PowerShell (local)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/config` | GET | Returns site configuration |
| `/api/contact` | POST | Contact form submission (stores in `data/messages.json`) |
| `/api/quote` | POST | Quote request submission |
| `/api/wholesale` | POST | Wholesale inquiry submission |
| `/api/messages` | GET | Admin: list all submissions (requires `key` query param) |

## Kaggle / ComfyUI

The `kaggle-comfyui/` directory contains AI asset-generation notebooks used during development for generating 3D models and backgrounds. These are **development tools only** — the production website uses procedural Three.js rendering and does not require Kaggle or ComfyUI to be online.

## License

All rights reserved. © 2026 Ali Berrehail.
