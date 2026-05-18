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
import { LogoBug } from "../components/LogoBug";
import { PriceTag } from "../components/PriceTag";

export const promoVideoSchema = z.object({
  productName: z.string(),
  price: z.string(),
  oldPrice: z.string().optional(),
  category: z.string(),
  tagline: z.string(),
  accentColor: z.string().default("#ff6b00"),
});

type Props = z.infer<typeof promoVideoSchema>;

export const PromoVideo: React.FC<Props> = ({
  productName,
  price,
  oldPrice,
  category,
  tagline,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slide-in spring for the main card
  const cardScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const cardOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Background pulse
  const bgPulse = interpolate(
    frame,
    [0, durationInFrames / 2, durationInFrames],
    [0, 8, 0]
  );

  // Exit fade
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  // Animated gradient angle
  const gradAngle = interpolate(frame, [0, durationInFrames], [145, 195]);

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      {/* Animated background */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(${gradAngle}deg, #0a1a2b 0%, #1b3e5f ${40 + bgPulse}%, #0d2235 100%)`,
        }}
      />

      {/* Decorative circles */}
      <DecoCircles frame={frame} accentColor={accentColor} />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          padding: "80px 60px",
        }}
      >
        {/* Logo */}
        <Sequence from={0} durationInFrames={durationInFrames}>
          <LogoBug accentColor={accentColor} frame={frame} fps={fps} />
        </Sequence>

        {/* Category pill */}
        <Sequence from={18}>
          <CategoryPill category={category} accentColor={accentColor} frame={frame - 18} fps={fps} />
        </Sequence>

        {/* Product name */}
        <Sequence from={30}>
          <ProductTitle title={productName} frame={frame - 30} fps={fps} />
        </Sequence>

        {/* Price */}
        <Sequence from={48}>
          <PriceTag price={price} oldPrice={oldPrice} accentColor={accentColor} frame={frame - 48} fps={fps} />
        </Sequence>

        {/* Divider */}
        <Sequence from={72}>
          <AnimatedDivider accentColor={accentColor} frame={frame - 72} fps={fps} />
        </Sequence>

        {/* Tagline */}
        <Sequence from={90}>
          <Tagline text={tagline} frame={frame - 90} fps={fps} />
        </Sequence>

        {/* CTA button */}
        <Sequence from={120}>
          <CTAButton frame={frame - 120} fps={fps} accentColor={accentColor} />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ─── Sub-components ─── */

const DecoCircles: React.FC<{ frame: number; accentColor: string }> = ({ frame, accentColor }) => {
  const slow = frame * 0.3;
  return (
    <>
      <div style={{
        position: "absolute",
        width: 600, height: 600,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`,
        top: -150 + Math.sin(slow * 0.012) * 30,
        right: -150 + Math.cos(slow * 0.009) * 20,
      }} />
      <div style={{
        position: "absolute",
        width: 400, height: 400,
        borderRadius: "50%",
        background: `radial-gradient(circle, #ffffff08 0%, transparent 70%)`,
        bottom: -80 + Math.cos(slow * 0.011) * 25,
        left: -80 + Math.sin(slow * 0.013) * 15,
      }} />
    </>
  );
};

const CategoryPill: React.FC<{ category: string; accentColor: string; frame: number; fps: number }> = ({
  category, accentColor, frame, fps
}) => {
  const s = spring({ frame, fps, config: { damping: 18, stiffness: 150 } });
  return (
    <div style={{
      background: `${accentColor}22`,
      border: `2px solid ${accentColor}55`,
      borderRadius: 40,
      padding: "10px 32px",
      marginBottom: 28,
      transform: `scale(${s})`,
      opacity: s,
    }}>
      <span style={{ color: accentColor, fontSize: 28, fontWeight: 700, fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase" }}>
        {category}
      </span>
    </div>
  );
};

const ProductTitle: React.FC<{ title: string; frame: number; fps: number }> = ({ title, frame, fps }) => {
  const s = spring({ frame, fps, config: { damping: 16, stiffness: 100 } });
  const y = interpolate(s, [0, 1], [60, 0]);
  return (
    <div style={{
      textAlign: "center",
      marginBottom: 40,
      transform: `translateY(${y}px)`,
      opacity: s,
    }}>
      <h1 style={{
        color: "#ffffff",
        fontSize: 62,
        fontWeight: 900,
        fontFamily: "sans-serif",
        lineHeight: 1.2,
        margin: 0,
        textShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}>
        {title}
      </h1>
    </div>
  );
};

const AnimatedDivider: React.FC<{ accentColor: string; frame: number; fps: number }> = ({ accentColor, frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  return (
    <div style={{ width: "80%", marginBottom: 36, overflow: "hidden" }}>
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        width: `${progress * 100}%`,
        margin: "0 auto",
      }} />
    </div>
  );
};

const Tagline: React.FC<{ text: string; frame: number; fps: number }> = ({ text, frame, fps }) => {
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: "clamp" });
  return (
    <p style={{
      color: "#93aec4",
      fontSize: 32,
      fontFamily: "sans-serif",
      fontWeight: 500,
      textAlign: "center",
      marginBottom: 48,
      opacity,
      transform: `translateY(${y}px)`,
    }}>
      {text}
    </p>
  );
};

const CTAButton: React.FC<{ frame: number; fps: number; accentColor: string }> = ({ frame, fps, accentColor }) => {
  const s = spring({ frame, fps, config: { damping: 14, stiffness: 130 } });
  const pulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.97, 1.03]);
  return (
    <div style={{
      background: accentColor,
      borderRadius: 60,
      padding: "28px 80px",
      transform: `scale(${s * pulse})`,
      opacity: s,
      boxShadow: `0 8px 40px ${accentColor}55`,
    }}>
      <span style={{
        color: "#ffffff",
        fontSize: 42,
        fontWeight: 800,
        fontFamily: "sans-serif",
        letterSpacing: 1,
      }}>
        Commander maintenant →
      </span>
    </div>
  );
};
