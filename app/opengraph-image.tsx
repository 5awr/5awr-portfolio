import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const alt = "5awr — Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const iconData = await readFile(path.join(process.cwd(), "public", "og-icon.png"));
  const iconSrc = `data:image/png;base64,${iconData.toString("base64")}`;

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
          gap: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 160,
            height: 160,
            borderRadius: "50%",
            border: "3px solid #52a878",
            overflow: "hidden",
          }}
        >
          <img src={iconSrc} width={160} height={160} style={{ objectFit: "cover" }} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 56, fontWeight: 700, color: "#eceef2", letterSpacing: "-0.02em" }}>
            5awr
          </span>
          <span style={{ fontSize: 22, color: "#9199a6", letterSpacing: "0.02em" }}>
            SAWADA Ryunosuke — Design Engineer
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
