MAROC MOSAIC (DGMD sarl) is a company specializing in the decoration of outdoor and indoor spaces. For 40 years, it has been installing its stone or marble mosaic floors, walls, and domes, as well as traditional fountains, on prestigious construction sites across Europe, Morocco, and the Middle East. The company uses the finest natural materials to create exceptional decorations and Andalusian and Roman atmospheres, inspired by the history of the Alhambra and Pompeii.


## Tech Stack

This blog is hosted on [Vercel](https://vercel.com/), built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/) using **Tailwind Nextjs Starter Blog**.

[![Next][Next.js]][Next-url] [![MDX][MDX]][MDX-url] [![Vercel][Vercel]][Vercel-url] [![React][React]][React-url][![Tailwind CSS][Tailwind CSS]][Tailwind CSS-url]

## Local development

Use Node.js 24 (see `.nvmrc`) and the bundled Yarn 4.0.2. Copy `.env.example` to `.env.local` and configure the image CDN and any external services you need. Article images excluded from Git are loaded from CloudFront when `NEXT_PUBLIC_CLOUD_FRONT_URL` is set.

```sh
node .yarn/releases/yarn-4.0.2.cjs install --immutable
node .yarn/releases/yarn-4.0.2.cjs dev
```

The default development port is 3000. French is served at `/`, English at `/en`.

## Docker Compose

Start Docker Desktop with Linux containers and enable your Ubuntu distribution under Settings > Resources > WSL Integration when using WSL2.

```sh
docker compose up -d --build
docker compose logs -f site
```

Open http://localhost:3002 or http://localhost:3002/en. To change the port, set `SITE_PORT` in `.env`. Source files are mounted for automatic reloads; dependencies and generated caches use Linux volumes. Restart the service after editing `.env.local`. The interactive references map requires `NEXT_PUBLIC_MAPTILER_API_KEY`; without it, the references table is available but the map cannot load.

```sh
docker compose stop
docker compose down
```

These commands preserve dependency and cache volumes.

## Validation

On a fresh clone, build once to generate Contentlayer data before running TypeScript checks. With Docker, stop the development server while validating the production build:

```sh
docker compose stop site
docker compose run --rm --no-deps site sh -c "node .yarn/releases/yarn-4.0.2.cjs build && node .yarn/releases/yarn-4.0.2.cjs typecheck && node .yarn/releases/yarn-4.0.2.cjs lint"
docker compose up -d site
```

Webpack is enabled for Contentlayer and SVG imports. The build also generates the search index and RSS feeds. `serve` runs a production build; `start` remains a development alias.
