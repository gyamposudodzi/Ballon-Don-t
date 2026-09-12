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
          background: "linear-gradient(90deg, #050C13 0%, #223A49 60%, #877458 100%)",
          color: "#FCD4A0",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 10, textTransform: "uppercase" }}>2026</div>
        <div style={{ fontSize: 84, marginTop: 16, letterSpacing: 6, textTransform: "uppercase" }}>
          Ballon Don&apos;t
        </div>
        <div style={{ fontSize: 28, marginTop: 24, color: "#F5F1DC" }}>
          The least prestigious award in football
        </div>
      </div>
    ),
    size,
  );
}
