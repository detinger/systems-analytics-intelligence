# Systems Analytics Intelligence Lab

Static interactive courseware for business information systems, analytics, and decision modelling.

## What It Includes

- 10 lessons covering business systems, ERP, BI, data warehousing, ETL, OLAP, and decision modelling
- Visual explainers and applied business case studies
- Six interactive labs:
  - ETL data quality
  - OLAP profitability analysis
  - Business process handoffs
  - Decision tables
  - Decision trees and expected monetary value
  - KPI dashboards and alerts

The app runs entirely in the browser. It has no backend, database, authentication, or required environment variables. Navigation and lab state are session-only and are not persisted after a page reload.

## Tech Stack

- React 18 and TypeScript
- Vite 5
- Recharts
- Lucide React
- Netlify static hosting

## Run Locally

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000`.

Build and preview the production version:

```bash
npm run build
npm run preview
```

`npm run lint` is defined, but ESLint and its configuration are not currently included in the project.

## Structure

```text
src/
├── app/
│   ├── App.tsx       # Views, navigation, visuals, and lab simulations
│   └── index.css     # Application styling
├── content/
│   ├── cases.ts      # Business case studies
│   ├── glossary.ts   # English/Croatian glossary data
│   └── modules.ts    # Modules and lesson content
└── main.tsx          # React entry point

pictures/             # Course diagrams and visual assets
```

Most application behavior currently lives in `src/app/App.tsx`. Course content is maintained separately in `src/content/`.

## Deployment

Netlify settings are provided in `netlify.toml`:

```text
Build command: npm run build
Publish directory: dist
```

The fallback redirect serves `index.html` for all paths. The project can also be deployed to any static host that serves the generated `dist/` directory.
