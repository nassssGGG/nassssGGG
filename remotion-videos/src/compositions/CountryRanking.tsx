import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ── 2026 UN population estimates ────────────────────────────────────────
type Country = { name: string; flag: string; pop: number };

const COUNTRIES: Country[] = [
  { name: "India",         flag: "🇮🇳", pop: 1_463_523_000 },
  { name: "China",         flag: "🇨🇳", pop: 1_409_670_000 },
  { name: "United States", flag: "🇺🇸", pop:   341_814_000 },
  { name: "Indonesia",     flag: "🇮🇩", pop:   284_411_000 },
  { name: "Pakistan",      flag: "🇵🇰", pop:   251_269_000 },
  { name: "Nigeria",       flag: "🇳🇬", pop:   237_535_000 },
  { name: "Brazil",        flag: "🇧🇷", pop:   217_637_000 },
  { name: "Bangladesh",    flag: "🇧🇩", pop:   176_200_000 },
  { name: "Russia",        flag: "🇷🇺", pop:   144_194_000 },
  { name: "Ethiopia",      flag: "🇪🇹", pop:   132_059_000 },
];

const MAX_POP = COUNTRIES[0].pop;

// ── Palette ──────────────────────────────────────────────────────────────
const BG     = "#0a0a0a";
const ORANGE = "#e85d26";
const WHITE  = "#ffffff";
const GRAY   = "#555555";
const DARK   = "#191919";
const GOLD   = "#ffd700";

// ── Layout constants (1920 × 1080) ───────────────────────────────────────
const PAD      = 54;   // horizontal padding each side
const RANK_W   = 50;
const FLAG_W   = 54;
const NAME_GAP = 14;
const NAME_W   = 210;
const POP_W    = 198;
const LABEL_W  = RANK_W + FLAG_W + NAME_GAP + NAME_W; // 328 px
// BAR_W = 1920 - PAD*2 - LABEL_W - POP_W  = 1920 - 108 - 328 - 198 = 1286 px
const BAR_W    = 1920 - PAD * 2 - LABEL_W - POP_W;
const HEADER_H = 108;
const FOOTER_H = 52;
const BAR_H    = 52;

// ── Timing (30 fps, 900 frames = 30 s) ──────────────────────────────────
const TITLE_END  = 90;   // title card lives 0-90 (3 s)
const FIRST_BAR  = 106;  // first bar appears at 3.5 s
const STAGGER    = 9;    // 0.3 s between each country
const BUILD_END  = 720;  // all bars reach 100 % at 24 s
// Finale: 720-900 (6 s) — hold with gold shimmer & source reveal

// ── Helpers ──────────────────────────────────────────────────────────────
function fmtPop(n: number, finalPop: number): string {
  // Keep format stable throughout the count-up (avoid B↔M flip)
  if (finalPop >= 1e9) return (n / 1e9).toFixed(3) + " B";
  return Math.round(n / 1e6) + " M";
}

// ── TitleCard ────────────────────────────────────────────────────────────
const TitleCard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, 14, 72, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sp = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const y  = interpolate(sp, [0, 1], [72, 0]);
  const sc = interpolate(sp, [0, 1], [0.87, 1]);
  const lineW = interpolate(sp, [0, 1], [0, 88]);

  const subOpacity = interpolate(frame, [22, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      {/* Top accent */}
      <div style={{ width: lineW, height: 5, background: ORANGE, borderRadius: 3, marginBottom: 30 }} />

      <h1
        style={{
          color: WHITE,
          fontSize: 100,
          fontWeight: 900,
          fontFamily: "'Arial Black', Arial, sans-serif",
          textAlign: "center",
          lineHeight: 1.08,
          margin: 0,
          letterSpacing: -2,
          transform: `translateY(${y}px) scale(${sc})`,
          textShadow: `0 0 120px rgba(232,93,38,0.3)`,
        }}
      >
        World's Most
        <br />
        <span style={{ color: ORANGE }}>Populated</span> Countries
      </h1>

      <p
        style={{
          color: GRAY,
          fontSize: 30,
          fontFamily: "Arial, sans-serif",
          margin: "30px 0 0",
          opacity: subOpacity,
          letterSpacing: 5,
          textTransform: "uppercase",
        }}
      >
        2026 Estimates · United Nations
      </p>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 10, marginTop: 46, opacity: subOpacity }}>
        {COUNTRIES.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === 0 ? 26 : 8,
              height: 8,
              borderRadius: 4,
              background: i === 0 ? ORANGE : "#2a2a2a",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ── Chart header ─────────────────────────────────────────────────────────
const ChartHeader: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [TITLE_END, TITLE_END + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: HEADER_H,
        display: "flex",
        alignItems: "center",
        padding: `0 ${PAD}px`,
        opacity,
        background: `linear-gradient(180deg, #0d0d0d 65%, transparent 100%)`,
        zIndex: 10,
      }}
    >
      <h2
        style={{
          color: WHITE,
          fontSize: 40,
          fontWeight: 900,
          fontFamily: "'Arial Black', Arial, sans-serif",
          margin: 0,
          letterSpacing: -0.5,
        }}
      >
        World's Most{" "}
        <span style={{ color: ORANGE }}>Populated</span> Countries
      </h2>
      <span
        style={{
          marginLeft: "auto",
          color: GRAY,
          fontSize: 22,
          fontFamily: "Arial, sans-serif",
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        2026
      </span>
    </div>
  );
};

// ── Milestone grid lines ──────────────────────────────────────────────────
const MILESTONES = [250e6, 500e6, 750e6, 1e9, 1.25e9];

const GridLines: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [FIRST_BAR, FIRST_BAR + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <>
      {MILESTONES.map((m) => {
        const x = PAD + LABEL_W + (m / MAX_POP) * BAR_W;
        const label = m >= 1e9 ? (m / 1e9).toFixed(2) + "B" : Math.round(m / 1e6) + "M";
        return (
          <div
            key={m}
            style={{
              position: "absolute",
              top: HEADER_H + 18,
              bottom: FOOTER_H,
              left: x,
              width: 1,
              background: "#262626",
              opacity,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -22,
                left: "50%",
                transform: "translateX(-50%)",
                color: "#3a3a3a",
                fontSize: 15,
                fontFamily: "Arial, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </div>
          </div>
        );
      })}
    </>
  );
};

// ── Single bar row ────────────────────────────────────────────────────────
const BarRow: React.FC<{
  country: Country;
  rank: number;
  index: number;
  frame: number;
  fps: number;
}> = ({ country, rank, index, frame, fps }) => {
  const appearFrame = FIRST_BAR + index * STAGGER;

  // Slide-up entrance
  const rowSp = spring({
    frame: Math.max(0, frame - appearFrame),
    fps,
    config: { damping: 20, stiffness: 110 },
  });
  const rowOpacity = frame < appearFrame ? 0 : Math.min(1, rowSp);
  const rowY       = frame < appearFrame ? 30 : interpolate(rowSp, [0, 1], [30, 0]);

  // Bar growth — eased, all bars finish simultaneously at BUILD_END
  const barProgress =
    frame < appearFrame
      ? 0
      : interpolate(frame, [appearFrame, BUILD_END], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.quad),
        });

  const bw         = Math.max(0, (country.pop / MAX_POP) * BAR_W * barProgress);
  const displayPop = Math.round(country.pop * barProgress);

  const isFinale   = frame >= BUILD_END;
  const isTop3     = rank <= 3;
  const isFirst    = rank === 1;

  // Gold shimmer sweep across India's bar at finale start
  const shimmerX = isFinale && isFirst
    ? interpolate(frame - BUILD_END, [0, 55], [-120, bw + 120], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : -9999;

  // Gentle glow pulse in finale
  const glowAlpha = isFinale
    ? 0.10 + 0.06 * Math.sin((frame - BUILD_END) * 0.10)
    : 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flex: 1,
        paddingLeft: PAD,
        paddingRight: PAD,
        opacity: rowOpacity,
        transform: `translateY(${rowY}px)`,
      }}
    >
      {/* Rank */}
      <div
        style={{
          width: RANK_W,
          color: isTop3 ? ORANGE : GRAY,
          fontSize: isTop3 ? 32 : 26,
          fontWeight: 900,
          fontFamily: "'Arial Black', Arial, sans-serif",
          textAlign: "right",
          paddingRight: 10,
          flexShrink: 0,
          textShadow: isFinale && isFirst ? `0 0 18px ${GOLD}90` : undefined,
        }}
      >
        #{rank}
      </div>

      {/* Flag */}
      <div style={{ width: FLAG_W, fontSize: 38, textAlign: "center", flexShrink: 0, lineHeight: 1 }}>
        {country.flag}
      </div>

      {/* Name */}
      <div
        style={{
          width: NAME_W,
          marginLeft: NAME_GAP,
          color: WHITE,
          fontSize: 26,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
          flexShrink: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          letterSpacing: -0.2,
        }}
      >
        {country.name}
      </div>

      {/* Bar track + fill */}
      <div
        style={{
          flex: 1,
          height: BAR_H,
          background: DARK,
          borderRadius: 5,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Fill */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: bw,
            background: isFinale && isFirst
              ? `linear-gradient(90deg, ${ORANGE} 55%, #ff9044 100%)`
              : ORANGE,
            borderRadius: 5,
            boxShadow: `0 0 ${10 + glowAlpha * 35}px rgba(232,93,38,${glowAlpha})`,
          }}
        />

        {/* Growing-tip highlight (white cursor at bar end) */}
        {frame > appearFrame && frame < BUILD_END && (
          <div
            style={{
              position: "absolute",
              top: 4,
              bottom: 4,
              left: Math.max(0, bw - 7),
              width: 7,
              background: "rgba(255,255,255,0.5)",
              borderRadius: 3,
            }}
          />
        )}

        {/* Gold shimmer sweep — India only at finale */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: shimmerX,
            width: 120,
            background: `linear-gradient(90deg, transparent, rgba(255,215,0,0.45), transparent)`,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Population counter */}
      <div
        style={{
          width: POP_W,
          color: isTop3 ? WHITE : "#999",
          fontSize: 25,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
          textAlign: "right",
          flexShrink: 0,
          paddingLeft: 14,
          letterSpacing: -0.3,
          opacity: frame >= appearFrame ? 1 : 0,
        }}
      >
        {fmtPop(displayPop, country.pop)}
      </div>
    </div>
  );
};

// ── Source / footer ───────────────────────────────────────────────────────
const Footer: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [BUILD_END, BUILD_END + 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: FOOTER_H,
        display: "flex",
        alignItems: "center",
        padding: `0 ${PAD}px`,
        opacity,
        borderTop: "1px solid #1a1a1a",
      }}
    >
      <span style={{ color: "#444", fontSize: 18, fontFamily: "Arial, sans-serif" }}>
        Source: United Nations, World Population Prospects 2025 · Estimates for 2026
      </span>
      <span
        style={{
          marginLeft: "auto",
          color: ORANGE,
          fontSize: 18,
          fontWeight: 900,
          fontFamily: "'Arial Black', Arial, sans-serif",
          letterSpacing: 1,
        }}
      >
        autopiecesdz.com
      </span>
    </div>
  );
};

// ── Vignette overlay ─────────────────────────────────────────────────────
const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
      pointerEvents: "none",
    }}
  />
);

// ── Main composition ──────────────────────────────────────────────────────
export const CountryRanking: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chartOpacity = interpolate(frame, [TITLE_END, TITLE_END + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: "Arial, sans-serif" }}>
      {/* ── Chart (fades in after title) ── */}
      <AbsoluteFill style={{ opacity: chartOpacity }}>
        {/* Scanline texture */}
        <AbsoluteFill
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.007) 3px, rgba(255,255,255,0.007) 4px)",
            pointerEvents: "none",
          }}
        />

        <GridLines frame={frame} />

        {/* All 10 rows in a flex column */}
        <div
          style={{
            position: "absolute",
            top: HEADER_H,
            bottom: FOOTER_H,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {COUNTRIES.map((country, i) => (
            <BarRow
              key={country.name}
              country={country}
              rank={i + 1}
              index={i}
              frame={frame}
              fps={fps}
            />
          ))}
        </div>

        <ChartHeader frame={frame} />
        <Footer frame={frame} />
        <Vignette />
      </AbsoluteFill>

      {/* ── Title card on top (renders last = highest z-index) ── */}
      <TitleCard frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};
