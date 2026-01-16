# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SDRAG (Structured Data Retrieval Augmented Generation) landing page - a static website for a master's research project focused on AI-assisted financial analytics. The site is hosted at https://sdrag.com.

## Architecture

The project consists of two main components:

1. **Frontend (Static Site)**: HTML/CSS/JS served via Nginx in Docker
   - `index.html`, `about.html`, `contact.html` - Main pages
   - `styles.css` - Custom CSS with Tailwind
   - `script.js` - Contact form handling with environment-aware API routing

2. **API Service (Node.js/Express)**: Contact form backend using Resend for email
   - Lives in `api/` directory
   - Runs on port 3002
   - Proxied via Nginx at `/api/`

## Development Commands

### Local Development
```bash
# Run API locally with hot reload
cd api && npm run dev

# Serve static files (use any static server)
python3 -m http.server 5500
```

### Docker Build
```bash
# Build frontend (Nginx)
docker build -t sdrag-landing -f Dockerfile .

# Build API
docker build -t sdrag-api -f Dockerfile.api .
```

## Key Implementation Details

- **Contact Form Routing**: `script.js` detects environment and routes to either:
  - Production: `https://resend.sdrag.com/api/contact`
  - Development: local `send-email.php`

- **API Configuration**: Requires `RESEND_API_KEY` in `api/.env` (see `api/.env.example`)

- **CORS Origins**: API allows `sdrag.com`, `www.sdrag.com`, `localhost:3000`, `localhost:5500`

## Code Style Guidelines

- Minimal code with clear intent
- Avoid verbose comments and decorative print statements
- Use Context7 or other MCP tools for library documentation when needed
