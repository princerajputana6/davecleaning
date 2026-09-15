# Dave Cleaning Services

Standalone Next.js 15 app for **Dave Cleaning Services** — extracted from the
`daveelectricals` monorepo so it can be developed and deployed on its own.

## Unlisted demo path

The whole app is served under the base path **`/demo/dave-cleaning-services`**
(`basePath` in `next.config.mjs`, mirrored in `lib/basePath.ts`). This is
intentional: the site is **unlisted** — the domain root (`/`) returns 404, so it
is reachable only if you already have the URL, and there is no link to it from
the electrical site.

- Local: `http://localhost:3001/demo/dave-cleaning-services`
- Production: `https://<your-domain>/demo/dave-cleaning-services`

## Develop

```bash
npm install
npm run dev          # http://localhost:3001/demo/dave-cleaning-services
```

Optional local MongoDB for the admin/booking features (no Docker needed):

```bash
npm run dev:db       # start a local DB in a separate terminal
npm run seed:admin   # seed an admin user (once)
```

## Build

```bash
npm run build
npm start            # serves on :3001
```

## Deploy (Vercel)

This is a standard single-app repo — deploy it as its own Vercel project with the
**default Root Directory** (the repository root). No monorepo Root Directory
setting is needed.

Set the environment variables the app uses (at least `MONGODB_URI` and your
Stripe keys) in the Vercel project settings before the booking/checkout flow will
work. VAT defaults to 20% and is added at checkout.
