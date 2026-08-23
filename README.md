# Jommel Joseph R. Lingad — Portfolio

A modern 3D professional portfolio focused on DevOps, infrastructure, automation, software engineering, and technical leadership.

## Stack

- React 19 and TypeScript
- Vinext / Vite on OpenAI Sites
- React Three Fiber, Drei, and Three.js
- Motion for React
- Zod validation

## Local development

Install dependencies with `npm install`, then run `npm run dev`. Use `npm run lint` and `npm run build` for validation.

## Content editing

Résumé-backed experience and skills are centralized near the top of `app/page.tsx`. Add real project data only after titles, descriptions, technologies, screenshots, GitHub URLs, and live URLs are verified. GitHub and LinkedIn controls should remain hidden until valid URLs are supplied.

## Contact configuration

Copy `.env.example` to `.env.local` and set an email recipient/provider when delivery is connected. The current endpoint validates submissions and returns a configuration-safe response without exposing secrets.

## Deployment

The project is configured for OpenAI Sites and Cloudflare Worker-compatible ESM output. Metadata, robots, sitemap, health, and contact routes are included.
