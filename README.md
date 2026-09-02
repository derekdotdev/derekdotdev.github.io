# Derek DiLeo — Portfolio

Personal portfolio for Derek DiLeo, an Android and software engineer. The site is built with Astro and TypeScript and deployed as a static site.

## Local development

Node.js 22 is recommended. If you use `nvm`, run:

```sh
nvm use
npm install
npm run dev
```

The local site is available at `http://localhost:4321`.

## Checks

```sh
npm run check
npm run build
npm run format:check
```

The production output is generated in `dist/`.

Use `npm run format` to apply the project’s formatting rules.

## Project structure

The active site lives entirely in `src/` and is organized from high-level composition to implementation details:

- `src/pages/index.astro` — page composition and metadata
- `src/layouts/` — shared document structure and global behavior
- `src/components/sections/` — one focused component per homepage section
- `src/components/` — reusable UI such as navigation, icons, project cards, and resume links
- `src/data/` — typed portfolio and profile content
- `src/scripts/` — browser behavior, organized with public initializers first and implementation helpers below
- `src/styles/global.css` — design tokens, shared styles, section styles, and responsive rules
- `src/assets/` — files processed by Astro, including the downloadable resume
- `public/` — static images, fonts, favicon, and social preview

## Common changes

- Edit project content or image paths in `src/data/projects.ts`.
- Edit professional-impact and approach cards in `src/data/profile.ts`.
- Edit section copy in its matching component under `src/components/sections/`.
- Change colors through the dark and light design tokens at the top of `src/styles/global.css`.
- Replace the resume at `src/assets/derek-dileo-resume.pdf` without changing component links.

The site is deployed to GitHub Pages by `.github/workflows/deploy.yml` whenever `main` changes.
