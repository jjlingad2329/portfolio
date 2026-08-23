# Portfolio implementation plan

## Architecture

Single-route React/TypeScript site built with the Vinext Sites runtime. Content is rendered from structured arrays, with server routes for health and contact validation. Hosting remains Cloudflare Worker compatible.

## Experience strategy

- Editorial dark graphite design with restrained mint and aqua accents.
- React Three Fiber infrastructure core in the hero, capped device pixel ratio, no textures, and reduced-motion removal.
- Motion viewport reveals and a spring-driven scroll indicator.
- Responsive layouts collapse to deliberate one-column compositions.
- Semantic sections, visible focus states, form labels, status announcements, and reduced motion support.

## Content and deployment

The résumé is the only source for public career facts. Projects, GitHub, and LinkedIn remain hidden until verified. The contact route validates payloads now and is ready for an email provider. Sites handles the production build and deployment.
