# AGENTS.md

Guidelines for agentic coding assistants working in this repository.

## Project Overview

SDRAG (Structured Data Retrieval Augmented Generation) - a static landing page for a master's research project on AI-assisted financial analytics. Hosted at https://sdrag.com.

## Architecture

```
tesis_landing_page/
├── api/                    # Node.js/Express API (contact form)
│   ├── server.js           # Express server using Resend for email
│   ├── package.json        # Dependencies and scripts
│   └── .env.example        # Environment template
├── index.html              # Home page
├── about.html              # About page
├── contact.html            # Contact form page
├── styles.css              # Custom CSS (extends Tailwind)
├── script.js               # Frontend JavaScript
├── nginx.conf              # Production Nginx configuration
├── Dockerfile              # Frontend container (Nginx)
├── Dockerfile.api          # API container (Node.js)
└── send-email.php          # Development email fallback
```

## Build/Run Commands

### Local Development

```bash
# Start API with hot reload (port 3002)
cd api && npm run dev

# Serve static files (pick any method)
python3 -m http.server 5500
npx serve -p 5500
```

### Docker Builds

```bash
# Build frontend (Nginx)
docker build -t sdrag-landing -f Dockerfile .

# Build API
docker build -t sdrag-api -f Dockerfile.api .
```

### API Scripts (from api/package.json)

| Script | Command | Description |
|--------|---------|-------------|
| start  | `npm start` | Production server |
| dev    | `npm run dev` | Development with watch mode |

### Testing

No formal test suite exists. Manual testing recommended:
- Verify static pages load correctly
- Test contact form submission in dev (uses `send-email.php`)
- Test contact form in production (uses Resend API)

## Environment Configuration

### API Environment Variables (api/.env)

```bash
RESEND_API_KEY=your_resend_api_key
PORT=3002
```

Copy `api/.env.example` to `api/.env` and configure.

### CORS Origins

The API accepts requests from:
- `https://sdrag.com`
- `https://www.sdrag.com`
- `http://localhost:3000`
- `http://localhost:5500`

## Code Style Guidelines

### General Principles

- Write minimal code with clear intent
- Avoid verbose comments and decorative print statements
- No unnecessary logging or debug output
- Simple and elegant solutions over complex ones

### JavaScript (ES Modules)

```javascript
// Imports: Named imports from packages
import express from 'express';
import { Resend } from 'resend';

// Variables: camelCase
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const formObject = {};

// Functions: camelCase, async/await preferred
async function handleSubmit(e) { ... }

// DOM queries
const mobileMenuButton = document.getElementById('mobile-menu-button');

// Destructuring for request data
const { name, email, company, role, message } = req.body;
```

### CSS Classes

```css
/* kebab-case for custom classes */
.hero-text { }
.card-hover { }
.glass-effect { }
.form-input { }
```

### HTML

- Use Tailwind utility classes via CDN
- Combine with custom CSS classes from `styles.css`
- Semantic elements: `<nav>`, `<section>`, `<footer>`
- Font: Inter via Google Fonts

### Error Handling (API)

```javascript
// Return structured JSON responses
res.status(400).json({
    success: false,
    message: 'Error description'
});

// Log errors minimally
console.error('Context:', error);
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Styling | Tailwind CSS (CDN), custom CSS |
| API | Node.js, Express.js, ES Modules |
| Email | Resend API |
| Server | Nginx (static), Node.js (API) |
| Container | Docker (Alpine images) |
| Fonts | Google Fonts (Inter) |

## Key Implementation Notes

### Contact Form Routing (script.js)

Environment detection determines API endpoint:
- **Production** (`sdrag.com`): `https://resend.sdrag.com/api/contact`
- **Development**: `send-email.php`

### Node.js Configuration

- Uses ES Modules (`"type": "module"` in package.json)
- Runs on port 3002 by default
- Proxied via Nginx at `/api/`

### Nginx Configuration

- Gzip compression enabled
- Static assets cached for 1 year
- API proxy to localhost:3002
- Security headers (X-Frame-Options, X-Content-Type-Options)

## Tool Usage

- Use Context7 or other MCP tools for library documentation
- When creating Python charts, use Vega-Altair
- For Python environments, use `uv` (not pip)

## Tailscale Network Access

SSH access to development machines (passwordless):
```bash
ssh cfocoder3   # ARM server
ssh macmini     # Mac Mini
ssh vostro      # Dell laptop
ssh inspiron13  # Dell laptop
ssh inspiron15  # Dell laptop
```

## File Modification Guidelines

### When adding new pages
1. Create HTML file following existing structure
2. Add navigation links to all pages
3. Use consistent Tailwind + custom CSS patterns

### When modifying the API
1. Maintain ES Module syntax
2. Follow existing error response format
3. Keep CORS origins list updated if adding new domains
4. Use minimal console.log statements

### When updating styles
1. Add custom classes to `styles.css`
2. Use Tailwind utilities for layout and spacing
3. Follow kebab-case naming for CSS classes
