/* eslint-disable @next/next/no-img-element */
import { accreditations } from "@/lib/content";

/**
 * Certifications & accreditations — the cleaning-industry bodies Dave Cleaning
 * Services is trained/certified with (BICSc, CPD, Alison). Each is a wordmark
 * logo, so it's shown contained (never cropped) on a clean white tile.
 *
 * Logos live in /public/accreditations/ (see lib/content.ts).
 */
export default function Accreditations() {
  return (
    <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-5 sm:gap-8">
      {accreditations.map((a) => (
        <div
          key={a.name}
          title={a.name}
          className="flex h-28 w-56 items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 py-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <img
            src={a.src}
            alt={a.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
