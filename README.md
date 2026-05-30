# Systems Analytics Intelligence Lab

Systems Analytics Intelligence Lab is an interactive learning application for business information systems, business analytics, decision modelling, and applied analytics labs. It combines structured lessons, visual concepts, case studies, glossary-style explanations, and simulation-style labs in one Vite React app.

The project is designed as a self-contained static web application, so it can be deployed directly to Netlify.

## What The App Includes

- A splash homepage with the app title, logo, learning path entry point, applied labs entry point, and visual splash image.
- A Learning Path organized around lessons, with modules used as section labels.
- Lesson pages that combine core explanation, visual concepts, key concepts, business application, case study, glossary, and lesson navigation.
- A visual-first lesson overview with two-column lesson cards and larger diagram previews.
- Applied Labs for practicing information systems, analytics, data warehousing, OLAP, decision tables, decision trees, and dashboard logic.
- A dark, enterprise-style interface with reusable cards, top navigation, responsive layouts, and embedded static assets.

## Tech Stack

- React 18
- TypeScript
- Vite
- Recharts
- Lucide React
- Static image assets from the `pictures/` directory

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

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

By default, Vite serves the app at:

```text
http://localhost:3000
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Netlify Deployment

This project includes a `netlify.toml` file, so Netlify can detect the correct build settings automatically.

Recommended Netlify settings:

```text
Build command: npm run build
Publish directory: dist
```

The app is a client-side React application. The redirect rule in `netlify.toml` sends all routes back to `index.html`, which keeps the app deploy-safe if navigation is expanded later.

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

## Content Model

Course content lives in `src/content/`:

- `modules.ts` defines the learning path, lesson structure, explanations, business applications, visual references, and checks.
- `cases.ts` defines lesson case studies.
- `glossary.ts` defines glossary terms used throughout the learning experience.

The main app composition lives in `src/app/App.tsx`, while visual styling and responsive behavior live in `src/app/index.css`.

## Visual Assets

All app images are stored in `pictures/` and imported by `src/app/App.tsx` through Vite asset URLs. When replacing an image, keep the filename stable if possible. If the filename changes, update the corresponding entry in the `visualAssets` object in `src/app/App.tsx`.

## Available Scripts

```bash
npm run dev
```

Runs the local development server.

```bash
npm run build
```

Runs TypeScript checks and builds the static production app into `dist/`.

```bash
npm run preview
```

Serves the production build locally for review.

## Deployment Notes

- `node_modules/` and `dist/` are intentionally ignored by Git.
- Netlify installs dependencies from `package-lock.json`, runs `npm run build`, and publishes `dist/`.
- The app does not require a backend, database, or environment variables.
- Large image assets are bundled into the build. If deploy size or load time becomes a concern, optimize images in `pictures/`.
