import { ImageResponse } from "next/og";

export const alt = "ManifestLab — a small studio that makes a few good things, quietly.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "linear-gradient(135deg, #0a0a0f 0%, #12121a 100%)",
          color: "#f0f0f5",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            display: "flex",
          }}
        >
          Manifest
          <span style={{ color: "#00d4ff" }}>Lab</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            color: "#9090a0",
          }}
        >
          A small studio that makes a few good things, quietly.
        </div>
      </div>
    ),
    { ...size },
  );
}
