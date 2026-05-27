import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "5awr — Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          backgroundColor: "#0c0d10",
          gap: 32,
        }}
      >
        {/* Icon with green border */}
        <div
          style={{
            display: "flex",
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "3px solid #52a878",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://5awr.dev/icon.png"
            width={180}
            height={180}
            style={{ objectFit: "cover" }}
            alt=""
          />
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#eceef2",
              letterSpacing: "-0.02em",
            }}
          >
            5awr
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#9199a6",
              letterSpacing: "0.04em",
            }}
          >
            SAWADA Ryunosuke — Design Engineer
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
