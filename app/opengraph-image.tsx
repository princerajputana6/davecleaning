import { ImageResponse } from "next/og";
import { OG_LOGO } from "@/lib/ogLogo";

// Social share card (link previews on iMessage, WhatsApp, Slack, X, etc.)
export const runtime = "edge";
export const alt = "Dave Cleaning Services — Professional Cleaning for Homes & Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "56px",
          padding: "72px",
          background: "linear-gradient(135deg, #0c2138 0%, #0e2740 55%, #0a1a2c 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Official Dave Cleaning Services logo */}
        <img
          src={OG_LOGO}
          width={470}
          height={245}
          style={{ flexShrink: 0, borderRadius: "20px" }}
        />

        {/* Copy */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "62px", fontWeight: 800, lineHeight: 1.05 }}>
            Professional cleaning for homes &amp; businesses
          </div>
          <div style={{ fontSize: "30px", color: "#cbd5e1", lineHeight: 1.4, marginTop: "24px" }}>
            Domestic, commercial, end of tenancy &amp; deep cleaning across London.
          </div>
          <div style={{ display: "flex", marginTop: "32px" }}>
            <div
              style={{
                display: "flex",
                fontSize: "28px",
                fontWeight: 700,
                color: "#ffffff",
                background: "rgba(20,161,230,0.25)",
                border: "2px solid rgba(20,161,230,0.6)",
                borderRadius: "999px",
                padding: "12px 28px",
              }}
            >
              Trusted local cleaners · Fully insured
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
