import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0c0a09",
          color: "#f4efe6",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, textTransform: "uppercase", color: "#c4a46a" }}>
          2026
        </div>
        <div style={{ fontSize: 92, fontStyle: "italic", marginTop: 16 }}>
          Ballon Don&apos;t
        </div>
        <div style={{ fontSize: 32, marginTop: 24, color: "#c9c0b2" }}>
          The least prestigious award in football
        </div>
      </div>
    ),
    size,
  );
}
