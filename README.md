# WHAT IF

A small playground for impossible questions. The Nuxt site reads structured stories from Sanity and lets readers follow each idea across three time horizons: the first day, one year later, and generations later.

## Features

- Browse published thought experiments on the question board.
- Open a story for its summary, full text, and optional image.
- Explore the Ripple Engine tabs, powered by story-specific outcomes authored in Sanity.
- Fall back to reflective prompts when an outcome has not been authored.

## Stack

- Nuxt 4 and Vue 3 for the website (`web/`)
- Sanity Studio for content editing (repository root)
- Sanity project `c526wkjm`, dataset `production`

The Sanity project ID and dataset are public read configuration used by the site. Do not add API write tokens or other secrets to the repository.

## Run locally

Requirements: Node.js and npm.

Install and run the Sanity Studio from the repository root:

```sh
npm install
npm run dev
```

In another terminal, install and run the Nuxt website:

```sh
cd web
npm install
npm run dev
```

The Studio is available at `http://localhost:3333` and the website at `http://localhost:3000`.

## Content model

The `whatIf` document type contains a question, URL slug, short summary, rich-text story, optional image, and up to three optional ripple outcomes. Each outcome is associated with one horizon: `The first day`, `One year later`, or `Generations later`.

## Deployment

Deploy the Nuxt app from the `web/` directory with a Nuxt-compatible host. The Sanity dataset must allow public read access for the app to load published stories without an API token. The Studio can be deployed separately with Sanity CLI if desired.
