import { ImageResponse } from "next/og";

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
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#FAFAFA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#2563EB", fontFamily: "monospace" }}>
          {"<JonathanSuico />"}
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, color: "#111111", marginTop: 20 }}>
          Jonathan Jude Suico
        </div>
        <div style={{ fontSize: 32, color: "#6B7280", marginTop: 10 }}>
          Computer Engineering Graduate & Software Developer
        </div>
      </div>
    ),
    { ...size }
  );
}