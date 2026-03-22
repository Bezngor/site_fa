# Constitution: site_factoryall

## Stack
- Language: TypeScript 5.x
- Framework: Next.js 15 (App Router, SSG)
- State Management: React Context (form/modal state only)
- Styling: Tailwind CSS 4
- Infrastructure: Vercel (static export)

## Coding Standards
- Linter: ESLint with next/core-web-vitals + typescript-eslint
- Formatter: Prettier (.prettierrc)
- Naming: camelCase for variables/functions, PascalCase for components
- Max function length: 40 lines
- Max nesting depth: 3 levels
- Use Server Components by default, 'use client' only when needed
- Colocate components with routes in app/ directory
- One component per file

## Testing
- Minimum coverage: N/A (static landing page)
- Smoke test: Playwright — check that all 8 sections render and CTA form submits

## Constraints
- Static generation (next export) — no server-side runtime
- Bundle size budget: 150 KB gzipped (initial JS)
- Images via next/image only (WebP, optimized)
- No database, no authentication
- Contact form: mailto: link or Formspree (no backend)

## Security
- Input validation: Zod schema on contact form fields (client-side)
- Secrets: no secrets needed (static site)
- XSS: no dangerouslySetInnerHTML

## LLM Rules
- Do not leave stubs without explicit TODO with justification
- Do not duplicate code: prefer reuse and clear abstractions
- Do not make hidden assumptions — if unsure, ask
- Always generate AI_NOTES.md per template
- Follow the coding style described above
- Prefer Server Components; add 'use client' only with justification
- All sections as separate components in /components/sections/
- Use Tailwind CSS only, no CSS Modules
- Color palette: primary #1B2A4A (dark navy), accent #F59E0B (amber), white #FFFFFF
- Russian language only — all copy in Russian
