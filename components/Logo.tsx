/* eslint-disable @next/next/no-img-element */
import { withBase } from "@/lib/basePath";

/**
 * Dave Cleaning Services logo — the client's actual supplied artwork
 * (/public/logo.png).
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center ${className}`}>
      <img
        src={withBase("/logo.png")}
        alt="Dave Cleaning Services"
        width={1738}
        height={905}
        className="h-12 w-auto rounded-md sm:h-14"
      />
    </span>
  );
}
