import Image from "next/image";
import { withBase } from "@/lib/basePath";

/**
 * Dave Cleaning Services logo — the client's actual supplied artwork
 * (/public/logo.png).
 *
 * Rendered through next/image so it is downscaled at the right pixel density
 * (retina-aware) and served sharp instead of the browser bilinear-downscaling
 * the full-size PNG (which looked soft in the header/footer).
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center ${className}`}>
      <Image
        src={withBase("/logo.png")}
        alt="Dave Cleaning Services"
        width={1738}
        height={905}
        quality={100}
        priority
        sizes="160px"
        style={{ width: "auto" }}
        className="h-12 w-auto sm:h-14"
      />
    </span>
  );
}
