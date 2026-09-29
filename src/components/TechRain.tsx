const techDesigns = [
  { glyph: "</>", x: 4, delay: -2, duration: 18, size: 0.72, drift: -18 },
  { glyph: "{ }", x: 12, delay: -11, duration: 24, size: 0.64, drift: 24 },
  { glyph: "01", x: 21, delay: -7, duration: 20, size: 0.78, drift: -12 },
  { glyph: "[ ]", x: 29, delay: -18, duration: 27, size: 0.58, drift: 16 },
  { glyph: "<>//", x: 37, delay: -4, duration: 22, size: 0.62, drift: -22 },
  { glyph: "#", x: 45, delay: -15, duration: 19, size: 0.84, drift: 14 },
  { glyph: "=>", x: 53, delay: -9, duration: 26, size: 0.68, drift: -16 },
  { glyph: "0101", x: 61, delay: -21, duration: 23, size: 0.56, drift: 20 },
  { glyph: "_", x: 69, delay: -1, duration: 21, size: 0.9, drift: -14 },
  { glyph: "{/}", x: 77, delay: -13, duration: 25, size: 0.66, drift: 18 },
  { glyph: "++", x: 85, delay: -6, duration: 19, size: 0.72, drift: -20 },
  { glyph: "::", x: 94, delay: -17, duration: 28, size: 0.6, drift: 12 },
];

export default function TechRain() {
  return (
    <div className="tech-rain" aria-hidden="true">
      {techDesigns.map((design, index) => (
        <span
          key={`${design.glyph}-${index}`}
          className="tech-rain-item"
          style={
            {
              "--tech-x": `${design.x}%`,
              "--tech-delay": `${design.delay}s`,
              "--tech-duration": `${design.duration}s`,
              "--tech-size": design.size,
              "--tech-drift": `${design.drift}px`,
            } as React.CSSProperties
          }
        >
          {design.glyph}
        </span>
      ))}
    </div>
  );
}
