import React from "react";
import { spring, interpolate } from "remotion";

interface Props {
  accentColor: string;
  frame: number;
  fps: number;
}

export const LogoBug: React.FC<Props> = ({ accentColor, frame, fps }) => {
  const s = spring({ frame, fps, config: { damping: 18, stiffness: 140 } });
  const rotate = interpolate(s, [0, 1], [-180, 0]);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 20,
      marginBottom: 44,
      transform: `scale(${s}) rotate(${rotate}deg)`,
      opacity: s,
    }}>
      <div style={{
        width: 80, height: 80,
        background: accentColor,
        borderRadius: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 6px 24px ${accentColor}66`,
        fontSize: 36,
        fontWeight: 900,
        color: "#fff",
        fontFamily: "sans-serif",
      }}>
        AP
      </div>
      <span style={{
        color: "#ffffff",
        fontSize: 46,
        fontWeight: 900,
        fontFamily: "sans-serif",
        letterSpacing: -1,
      }}>
        AutoPièces<span style={{ color: accentColor }}> DZ</span>
      </span>
    </div>
  );
};
