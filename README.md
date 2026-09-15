# Dave Cleaning Services

Standalone Next.js 15 app for **Dave Cleaning Services** — extracted from the
`daveelectricals` monorepo so it can be developed and deployed on its own.

## URLs

The app is served at the domain root.

- Local: `http://localhost:3001`
- Production: `https://<your-domain>`

It is still effectively unlisted: it lives on its own domain with no link to it
from the electrical site. To serve it under a sub-path instead (e.g.
`/demo/dave-cleaning-services`), set `BASE_PATH` in `lib/basePath.ts` and add a
matching `basePath` in `next.config.mjs`.

## Develop

```bash
npm install
npm run dev          # http://localhost:3001
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
