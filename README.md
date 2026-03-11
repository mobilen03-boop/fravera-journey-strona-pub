# FraVeRa Journey — Website Deployment Guide

## Project Overview

Complete multi-language website for FraVeRa Journey — a disclosed travel agent connecting Western European clients with premium health resorts in Poland.

### Languages Supported
- **PL** — Polish (primary)
- **EN** — English
- **NL** — Dutch

### Key Features
- ✅ Language selector at root
- ✅ Consistent components across all languages
- ✅ Basin form integration (placeholders ready)
- ✅ Interactive map of Polish health resorts
- ✅ Cookie consent banner
- ✅ SEO optimized (canonical, hreflang, OG tags)
- ✅ Mobile-first responsive design
- ✅ Legal pages (Privacy, Terms, Cookies, Impressum)

---

## File Structure

```
/
├── index.html                    # Language selector (root)
├── 404.html                      # Error page
├── robots.txt                    # SEO robots
├── sitemap.xml                   # SEO sitemap
├── site.webmanifest              # PWA manifest
├── README.md                     # This file
│
├── /partials/                    # Reusable components
│   ├── header-pl.html
│   ├── header-en.html
│   ├── header-nl.html
│   ├── footer-pl.html
│   ├── footer-en.html
│   └── footer-nl.html
│
├── /assets/
│   ├── /css/styles.css           # Main stylesheet
│   ├── /js/
│   │   ├── app.js                # Main JS functionality
│   │   └── includes.js           # Partial loader
│   ├── /img/                     # Images (uploaded assets)
│   └── /map/                     # Interactive map
│       ├── map.html
│       ├── map.js
│       ├── map.css
│       └── poland.svg
│
├── /pl/                          # Polish pages
│   ├── index.html
│   ├── offer.html
│   ├── destinations.html
│   ├── b2b.html
│   ├── faq.html
│   ├── contact.html
│   ├── journey-form.html
│   ├── blog.html
│   ├── blog-post.html
│   ├── privacy.html
│   ├── terms.html
│   ├── cookies.html
│   ├── impressum.html
│   └── thank-you.html
│
├── /en/                          # English pages (same structure)
│   └── ...
│
└── /nl/                          # Dutch pages (same structure)
    └── ...
```

---

## TODO — Before Production

### 1. Basin Form Integration
Replace placeholders in form actions:

**File:** `/pl/journey-form.html`, `/en/journey-form.html`, `/nl/journey-form.html`
```html
<!-- Replace this: -->
action="[WSTAW_LINK_BASIN_JOURNEY]"

<!-- With your Basin endpoint, e.g.: -->
action="https://usebasin.com/f/YOUR_FORM_ID"
```

**File:** `/pl/b2b.html`, `/en/b2b.html`, `/nl/b2b.html`
```html
<!-- Replace this: -->
action="[WSTAW_LINK_BASIN_B2B]"

<!-- With your Basin endpoint, e.g.: -->
action="https://usebasin.com/f/YOUR_B2B_FORM_ID"
```

### 2. Company Registration Details
Update Impressum pages with actual company data:

**Files:** `/pl/impressum.html`, `/en/impressum.html`, `/nl/impressum.html`
```html
<!-- Replace: -->
VAT Number: [WSTAW_NUMERO_VAT]
KvK Number: [WSTAW_NUMERO_KVK]

<!-- With actual numbers: -->
VAT Number: NL123456789B01
KvK Number: 12345678
```

### 3. Domain Configuration
Update all canonical URLs and OG tags:

Search and replace in all HTML files:
```
https://fravera-journey.com
```
→ Your actual domain

### 4. Email Address
Update contact email if different:

Search and replace:
```
hello@fravera-journey.com
```
→ Your actual email

---

## Deployment Instructions

### Option 1: Cloudflare Pages (Recommended)

1. **Create a new project** in Cloudflare Dashboard
2. **Upload files:**
   - Drag and drop all files from `/mnt/okcomputer/output/fravera-journey/`
   - Or connect Git repository
3. **Build settings:**
   - Build command: `None` (static site)
   - Build output directory: `/`
4. **Custom domain:**
   - Add your domain in Cloudflare Pages settings
   - Configure DNS records as instructed
5. **Done!** 🎉

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the project folder
3. Configure custom domain in settings
4. Done!

### Option 3: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import project or drag and drop
3. Configure as static site
4. Done!

### Option 4: Traditional Hosting (FTP)

1. Connect to your hosting via FTP
2. Upload all files to `public_html/` or `www/`
3. Ensure `.htaccess` is configured for clean URLs (optional)

---

## Testing Checklist

### Functionality
- [ ] Language selector works on root
- [ ] All navigation links work
- [ ] Mobile menu opens/closes
- [ ] Forms submit to Basin
- [ ] Thank-you page displays after form submission
- [ ] Cookie banner appears
- [ ] Cookie accept/reject buttons work
- [ ] Map loads and is interactive

### SEO
- [ ] Canonical URLs are correct
- [ ] hreflang tags present on all pages
- [ ] OG tags present
- [ ] Sitemap.xml is accessible
- [ ] robots.txt is accessible

### Performance
- [ ] Images are optimized
- [ ] Lazy loading works
- [ ] No console errors
- [ ] Page loads under 3 seconds

### Legal
- [ ] Privacy Policy is accessible
- [ ] Terms & Conditions are accessible
- [ ] Cookie Policy is accessible
- [ ] Impressum is accessible

---

## Local Testing

### Using VS Code Live Server

1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Test at `http://localhost:5500`

### Using Python

```bash
cd /mnt/okcomputer/output/fravera-journey
python3 -m http.server 8000
```
Then open `http://localhost:8000`

### Using Node.js (http-server)

```bash
npm install -g http-server
cd /mnt/okcomputer/output/fravera-journey
http-server -p 8080
```
Then open `http://localhost:8080`

---

## Cache Settings (Cloudflare)

Recommended cache rules:

```
*.css, *.js → Cache: 1 month
*.html → Cache: 1 hour
/images/* → Cache: 6 months
```

---

## Support

For questions or issues:
- Email: hello@fravera-journey.com
- Website: https://fravera-journey.com

---

**Built with ❤️ for FraVeRa Journey**
*Nature-based Wellness in Poland*
