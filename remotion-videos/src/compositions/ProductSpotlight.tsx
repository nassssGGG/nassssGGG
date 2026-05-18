import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { z } from "zod";

export const productSpotlightSchema = z.object({
  productName: z.string(),
  price: z.string(),
  brand: z.string(),
  category: z.string(),
});

type Props = z.infer<typeof productSpotlightSchema>;

export const ProductSpotlight: React.FC<Props> = ({ productName, price, brand, category }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: exitOpacity, background: "#f4f5f6" }}>
      {/* Header bar */}
      <HeaderBar frame={frame} fps={fps} />

      {/* Center product card */}
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Sequence from={20}>
          <ProductCard
            productName={productName}
            price={price}
            brand={brand}
            category={category}
            frame={frame - 20}
            fps={fps}
          />
        </Sequence>
      </AbsoluteFill>

      {/* Bottom strip */}
      <Sequence from={60}>
        <BottomStrip frame={frame - 60} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

const HeaderBar: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const s = spring({ frame, fps, config: { damping: 20, stiffness: 120 } });
  const y = interpolate(s, [0, 1], [-100, 0]);
  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0,
      height: 140,
      background: "linear-gradient(135deg, #1b3e5f, #0d2235)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: `translateY(${y}px)`,
    }}>
      <span style={{ color: "#ff6b00", fontSize: 44, fontWeight: 900, fontFamily: "sans-serif", letterSpacing: -1 }}>
        AutoPièces DZ
      </span>
    </div>
  );
};

const ProductCard: React.FC<{
  productName: string; price: string; brand: string; category: string; frame: number; fps: number;
}> = ({ productName, price, brand, category, frame, fps }) => {
  const s = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const rotate = interpolate(s, [0, 1], [-8, 0]);

  return (
    <div style={{
      background: "#ffffff",
      borderRadius: 24,
      padding: "60px 70px",
      width: 860,
      boxShadow: "0 20px 80px rgba(0,0,0,0.15)",
      transform: `scale(${s}) rotate(${rotate}deg)`,
      opacity: s,
      textAlign: "center",
    }}>
      {/* Category */}
      <div style={{
        display: "inline-block",
        background: "#fff3e8",
        border: "2px solid #ffd4a8",
        borderRadius: 30,
        padding: "8px 28px",
        marginBottom: 30,
      }}>
        <span style={{ color: "#ff6b00", fontSize: 28, fontWeight: 700, fontFamily: "sans-serif" }}>
          {category}
        </span>
      </div>

      {/* Product icon placeholder */}
      <div style={{
        width: 180, height: 180,
        background: "linear-gradient(135deg, #1b3e5f, #0d2235)",
        borderRadius: "50%",
        margin: "0 auto 36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 80,
      }}>
        🔧
      </div>

      {/* Brand */}
      <p style={{ color: "#93aec4", fontSize: 32, fontWeight: 600, fontFamily: "sans-serif", margin: "0 0 12px" }}>
        {brand}
      </p>

      {/* Product name */}
      <h2 style={{
        color: "#1b3e5f",
        fontSize: 48,
        fontWeight: 800,
        fontFamily: "sans-serif",
        lineHeight: 1.25,
        margin: "0 0 36px",
      }}>
        {productName}
      </h2>

      {/* Price */}
      <div style={{
        background: "#1b3e5f",
        borderRadius: 16,
        padding: "22px 50px",
        display: "inline-block",
      }}>
        <span style={{ color: "#ffffff", fontSize: 58, fontWeight: 900, fontFamily: "sans-serif" }}>
          {price}
        </span>
      </div>
    </div>
  );
};

const BottomStrip: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const s = spring({ frame, fps, config: { damping: 20, stiffness: 120 } });
  const y = interpolate(s, [0, 1], [100, 0]);
  return (
    <div style={{
      position: "absolute",
      bottom: 0, left: 0, right: 0,
      height: 110,
      background: "#ff6b00",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: `translateY(${y}px)`,
    }}>
      <span style={{ color: "#ffffff", fontSize: 34, fontWeight: 700, fontFamily: "sans-serif", letterSpacing: 0.5 }}>
        Livraison Cash à la Livraison — 48 wilayas d'Algérie
      </span>
    </div>
  );
};
