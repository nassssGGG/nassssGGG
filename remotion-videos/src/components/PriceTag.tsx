import React from "react";
import { spring, interpolate } from "remotion";

interface Props {
  price: string;
  oldPrice?: string;
  accentColor: string;
  frame: number;
  fps: number;
}

export const PriceTag: React.FC<Props> = ({ price, oldPrice, accentColor, frame, fps }) => {
  const s = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const scale = interpolate(s, [0, 1], [0.4, 1]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      marginBottom: 36,
      transform: `scale(${scale})`,
      opacity: s,
    }}>
      {oldPrice && (
        <span style={{
          color: "#93aec4",
          fontSize: 38,
          fontFamily: "sans-serif",
          textDecoration: "line-through",
          fontWeight: 500,
        }}>
          {oldPrice}
        </span>
      )}
      <div style={{
        background: accentColor,
        borderRadius: 20,
        padding: "20px 60px",
        boxShadow: `0 6px 32px ${accentColor}55`,
      }}>
        <span style={{
          color: "#ffffff",
          fontSize: 80,
          fontWeight: 900,
          fontFamily: "sans-serif",
          letterSpacing: -1,
        }}>
          {price}
        </span>
      </div>
    </div>
  );
};
