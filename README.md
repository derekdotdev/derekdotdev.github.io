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
```

The production output is generated in `dist/`.

## Content

- Page content: `src/pages/index.astro`
- Project data: `src/data/projects.ts`
- Components: `src/components/`
- Global styles and design tokens: `src/styles/global.css`
- Static files, including the résumé: `public/`

The previous Jekyll implementation remains in the repository temporarily while the new site is reviewed.
