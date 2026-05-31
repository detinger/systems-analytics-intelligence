# Systems Analytics Intelligence Lab

Interactive courseware for business information systems, business analytics, decision modelling, and applied analytics practice. The app is a self-contained Vite React site with structured lessons, visual explainers, case studies, glossary support, progress state, and simulation-style labs.

## Features

- Splash homepage with learning path and applied lab entry points.
- Modular learning path covering business systems, information systems, BI, analytics, data warehousing, OLAP, and decision modelling.
- Lesson pages with explanations, visual concepts, key concepts, business examples, case studies, glossary terms, checkpoints, and navigation.
- Applied labs for ETL logic, data warehouses, OLAP thinking, dashboards, decision tables, decision trees, AHP-style decisions, and process analysis.
- Responsive dark enterprise-style UI built with reusable React views, Lucide icons, Recharts visualizations, and static course images.
- Static deployment model with no backend, database, or environment variables required.

## Tech Stack

- React 18
- TypeScript
- Vite 5
- Recharts
- Lucide React
- Netlify-ready static hosting

## Project Structure

```text
.
├── index.html
├── netlify.toml
├── package.json
├── package-lock.json
├── pictures/
│   └── Course and app visual assets
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── index.css
│   ├── content/
│   │   ├── cases.ts
│   │   ├── glossary.ts
│   │   └── modules.ts
│   ├── store/
│   │   └── progressStore.ts
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Vite serves the app at:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Runs the Vite development server.

```bash
npm run build
```

Runs TypeScript checks and builds the production app into `dist/`.

```bash
npm run preview
```

Serves the production build locally for review.

```bash
npm run lint
```

Runs ESLint across TypeScript and React source files.

## Content Model

Course content lives in `src/content/`:

- `modules.ts` defines modules, lessons, explanations, checkpoints, learning outcomes, and lab relationships.
- `cases.ts` defines case studies used by lesson and resource views.
- `glossary.ts` defines glossary terms used throughout the learning experience.

The main app composition lives in `src/app/App.tsx`. Styling and responsive behavior live in `src/app/index.css`. Lightweight progress and badge metadata live in `src/store/progressStore.ts`.

## Visual Assets

All app images are stored in `pictures/` and imported through Vite asset URLs in `src/app/App.tsx`.

When replacing an image, keep the filename stable when possible. If a filename changes, update the corresponding entry in the `visualAssets` object in `src/app/App.tsx`.

## Deployment

The app is designed for static hosting. Netlify build settings are already defined in `netlify.toml`:

```text
Build command: npm run build
Publish directory: dist
```

The redirect rule sends all routes to `index.html`, so client-side navigation remains deployment-safe.

### Deploy From Git

1. Push this project to a Git repository.
2. In Netlify, choose **Add new site**.
3. Connect the repository.
4. Keep the detected build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy the site.

### Deploy With Netlify CLI

Install the Netlify CLI if needed:

```bash
npm install -g netlify-cli
```

Build the app:

```bash
npm run build
```

Deploy a preview:

```bash
netlify deploy
```

Deploy to production:

```bash
netlify deploy --prod
```

When prompted for the publish directory, use:

```text
dist
```

## Notes

- `node_modules/` and `dist/` are intentionally ignored by Git.
- Netlify installs dependencies from `package-lock.json`, runs `npm run build`, and publishes `dist/`.
- Large image assets are bundled into the production build. If deploy size or load time becomes a concern, optimize images in `pictures/`.
