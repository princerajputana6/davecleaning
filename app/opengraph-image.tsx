import { ImageResponse } from "next/og";

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
          gap: "64px",
          padding: "80px",
          background: "linear-gradient(135deg, #0c2138 0%, #0e2740 55%, #0a1a2c 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand badge */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "300px",
            height: "300px",
            flexShrink: 0,
            borderRadius: "60px",
            background: "#14a1e6",
            border: "10px solid #ffffff",
          }}
        >
          <div style={{ fontSize: "96px", fontWeight: 900, letterSpacing: "2px", lineHeight: 1 }}>
            DAVE
          </div>
          <div style={{ width: "180px", height: "6px", background: "#ffffff", margin: "16px 0" }} />
          <div style={{ fontSize: "40px", fontWeight: 900, letterSpacing: "3px", lineHeight: 1 }}>
            CLEANING
          </div>
        </div>

        {/* Copy */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "34px", fontWeight: 700, color: "#5cc0f5", letterSpacing: "2px" }}>
            DAVE CLEANING SERVICES
          </div>
          <div style={{ fontSize: "62px", fontWeight: 800, lineHeight: 1.05, marginTop: "16px" }}>
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
              From £40 · Book online
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
