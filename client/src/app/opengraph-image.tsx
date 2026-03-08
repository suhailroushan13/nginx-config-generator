import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #0f0f0f 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 12,
              background: "#009639",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
              color: "white",
            }}
          >
            N
          </div>
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            Nginx Config Generator
          </span>
        </div>
        <p
          style={{
            fontSize: 24,
            color: "#a3a3a3",
            maxWidth: 640,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Generate reverse proxy configs with WebSocket support. Free, no signup.
        </p>
        <p
          style={{
            marginTop: 32,
            fontSize: 20,
            color: "#737373",
          }}
        >
          nginx.suhail.app
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
