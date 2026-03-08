# SEO Strategy & Implementation

**Domain:** https://nginx.suhail.app  
**Brand:** Nginx Config Generator

## 1. Keyword & Page Mapping (1 keyword = 1 page)

| Page            | Primary keyword              | Intent        | Secondary / LSI keywords                                      |
|-----------------|-----------------------------|---------------|---------------------------------------------------------------|
| `/`             | nginx config generator      | Commercial    | nginx reverse proxy config, nginx server block generator     |
| `/how-it-works` | how nginx reverse proxy works | Informational | nginx proxy config, nginx websocket config, server block      |

## 2. URL structure

- `https://nginx.suhail.app` — Home (generator)
- `https://nginx.suhail.app/how-it-works` — How it works (pillar support)
- Canonical: HTTPS, lowercase, no trailing slash

## 3. Technical SEO (implemented)

- **Framework:** Next.js (SSR/SSG)
- **Sitemap:** `/sitemap.xml` (auto-generated)
- **Robots:** `/robots.txt` (allow /, disallow /api/, sitemap + host)
- **Structured data:** JSON-LD (WebApplication on home, BreadcrumbList on all pages)
- **Meta:** Unique title (≤60 chars), meta description with CTA, canonical, `lang="en"`

## 4. Social & OG

- Open Graph and Twitter Card metadata on all pages
- Dynamic OG image 1200×630 via `app/opengraph-image.tsx`
- `og:url` and `twitter:url` use canonical URLs

## 5. Favicons & PWA

- `/favicon.ico` — app/icon.tsx (generated)
- `/favicon.svg` — static
- `/apple-touch-icon` — app/apple-icon.tsx (180×180)
- `site.webmanifest` with icons and theme colors

## 6. Performance & UX

- Mobile-first layout
- Semantic HTML (header, main, article, nav)
- One H1 per page, logical H2/H3 hierarchy
- Breadcrumbs with schema
- Custom 404 with link back to home
- Cache headers for static assets

## 7. Analytics (optional)

To add tracking, set env and include your script in the root layout or use Next.js Analytics. No script is included by default for privacy.
