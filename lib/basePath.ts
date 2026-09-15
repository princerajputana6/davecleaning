/**
 * Base path the Dave Cleaning app is served under.
 *
 * The app is served at the domain root, so this is empty and `withBase` is a
 * no-op. It is kept (rather than removed) so the call sites that build absolute
 * URLs — client `fetch()`, raw <img>/<source> src, and server-side URLs built
 * from the request origin (Stripe success/cancel URLs, `new URL(path, req.url)`
 * redirects) — keep working unchanged. To serve under a sub-path again, set a
 * value here AND add a matching `basePath` in next.config.mjs.
 */
export const BASE_PATH = "";

/** Prefix an app-absolute path with the base path (no-op while BASE_PATH is empty). */
export const withBase = (path: string): string => `${BASE_PATH}${path}`;
