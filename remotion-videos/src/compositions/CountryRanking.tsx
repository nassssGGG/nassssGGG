import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── 2026 population data (UN World Population Prospects 2025) ──────────────
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

const MAX_POP = COUNTRIES[0].pop; // India

// ─── Design tokens ───────────────────────────────────────────────────────────
const C_BG     = "#0a0a0a";
const C_BAR    = "#e85d26";
const C_WHITE  = "#ffffff";
const C_DIM    = "#555555";
const C_TRACK  = "#1c1c1c";
const C_GRID   = "#272727";
const C_GOLD   = "#ffd700";

// ─── Layout (1920 × 1080) ────────────────────────────────────────────────────
//
//  ┌─────────────────────────────────────────── 1920 ──────────────────────────┐
//  │  HEADER (108 px)                                                           │
//  │  ┌──── row 0 ────────────────────────────────────────────────────────────┐ │
//  │  │ #1  🇮🇳  India          ████████████████████████████████  1.463 B    │ │
//  │  └───────────────────────────────────────────────────────────────────────┘ │
//  │  … × 10 rows …                                                             │
//  │  FOOTER (50 px)                                                            │
//  └────────────────────────────────────────────────────────────────────────────┘
//
const H_PAD   = 54;     // left + right screen padding
const RANK_W  = 50;     // "#1" label
const FLAG_W  = 54;     // flag emoji
const GAP     = 14;     // flag → name gap
const NAME_W  = 210;    // country name
const POP_W   = 196;    // population counter (right of bar)
const LABEL_W = RANK_W + FLAG_W + GAP + NAME_W; // 328 px

// BAR_W = 1920 − (2 × 54) − 328 − 196 = 1288 px
const BAR_W   = 1920 - H_PAD * 2 - LABEL_W - POP_W;
const BAR_H   = 52;
const HDR_H   = 108;
const FTR_H   = 50;

// ─── Timing ───────────────────────────────────────────────────────────────────
//  0  – 90   Title card             (3 s)
//  90 – 106  Crossfade              (0.5 s)
//  106–187   Countries slide in     (0.3 s stagger × 10)
//  106–720   Bars grow              (all finish together at 24 s)
//  720–900   Finale: hold + shimmer (6 s)
const TITLE_END = 90;
const FIRST_BAR = 106;
const STAGGER   = 9;    // frames (= 0.3 s at 30 fps)
const BUILD_END = 720;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtPop(current: number, final: number): string {
  // Lock the unit (B or M) to the final value so it never flips mid-count
  if (final >= 1e9) return (current / 1e9).toFixed(3) + " B";
  return Math.round(current / 1e6) + " M";
}

// ─── TitleCard ────────────────────────────────────────────────────────────────
const TitleCard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Fade in → hold → fade out
  const opacity = interpolate(
    frame,
    [0, 14, 72, 90],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const sp  = spring({ frame, fps, config: { damping: 14, stiffness: 68 } });
  const y   = interpolate(sp, [0, 1], [70, 0]);
  const sc  = interpolate(sp, [0, 1], [0.87, 1]);
  const lw  = interpolate(sp, [0, 1], [0, 90]);   // accent line width

  const sub = interpolate(frame, [22, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C_BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        pointerEvents: "none",
      }}
    >
      {/* Animated accent bar */}
      <div style={{ width: lw, height: 5, background: C_BAR, borderRadius: 3, marginBottom: 30 }} />

      {/* Main title */}
      <h1
        style={{
          color: C_WHITE,
          fontSize: 100,
          fontWeight: 900,
          fontFamily: "'Arial Black', 'Arial Bold', Arial, sans-serif",
          textAlign: "center",
          lineHeight: 1.1,
          margin: 0,
          letterSpacing: -2,
          transform: `translateY(${y}px) scale(${sc})`,
          textShadow: `0 0 140px rgba(232,93,38,0.28)`,
        }}
      >
        World's Most
        <br />
        <span style={{ color: C_BAR }}>Populated</span> Countries
      </h1>

      {/* Subtitle */}
      <p
        style={{
          color: C_DIM,
          fontSize: 30,
          fontFamily: "Arial, sans-serif",
          margin: "32px 0 0",
          letterSpacing: 6,
          textTransform: "uppercase",
          opacity: sub,
        }}
      >
        2026 Estimates · United Nations
      </p>

      {/* Dot indicators — one per country */}
      <div style={{ display: "flex", gap: 10, marginTop: 46, opacity: sub }}>
        {COUNTRIES.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === 0 ? 26 : 8,
              height: 8,
              borderRadius: 4,
              background: i === 0 ? C_BAR : "#2b2b2b",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Chart header (replaces Hello-World title once chart fades in) ────────────
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
        height: HDR_H,
        display: "flex",
        alignItems: "center",
        padding: `0 ${H_PAD}px`,
        background: "linear-gradient(180deg, #0d0d0d 65%, transparent 100%)",
        opacity,
        zIndex: 10,
      }}
    >
      <h2
        style={{
          color: C_WHITE,
          fontSize: 40,
          fontWeight: 900,
          fontFamily: "'Arial Black', Arial, sans-serif",
          margin: 0,
          letterSpacing: -0.5,
        }}
      >
        World's Most <span style={{ color: C_BAR }}>Populated</span> Countries
      </h2>
      <span
        style={{
          marginLeft: "auto",
          color: C_DIM,
          fontSize: 22,
          fontFamily: "Arial, sans-serif",
          letterSpacing: 4,
        }}
      >
        2026
      </span>
    </div>
  );
};

// ─── Vertical milestone grid lines ───────────────────────────────────────────
const MILESTONES: number[] = [250e6, 500e6, 750e6, 1e9, 1.25e9];

const GridLines: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [FIRST_BAR, FIRST_BAR + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <>
      {MILESTONES.map((m) => {
        const x     = H_PAD + LABEL_W + (m / MAX_POP) * BAR_W;
        const label = m >= 1e9
          ? (m / 1e9).toFixed(2) + "B"
          : Math.round(m / 1e6) + "M";
        return (
          <div
            key={m}
            style={{
              position: "absolute",
              top: HDR_H + 16,
              bottom: FTR_H,
              left: x,
              width: 1,
              background: C_GRID,
              opacity,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -20,
                left: "50%",
                transform: "translateX(-50%)",
                color: "#383838",
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

// ─── Single animated bar row ──────────────────────────────────────────────────
const BarRow: React.FC<{
  country: Country;
  rank: number;
  index: number;
  frame: number;
  fps: number;
}> = ({ country, rank, index, frame, fps }) => {
  const appearFrame = FIRST_BAR + index * STAGGER;

  // Row slide-up entrance
  const rowSp     = spring({ frame: Math.max(0, frame - appearFrame), fps, config: { damping: 20, stiffness: 110 } });
  const rowOpacity = frame < appearFrame ? 0 : Math.min(1, rowSp);
  const rowY       = frame < appearFrame ? 30 : interpolate(rowSp, [0, 1], [30, 0]);

  // Bar growth — eased, ALL bars reach 100% simultaneously at BUILD_END
  const barProg =
    frame < appearFrame
      ? 0
      : interpolate(frame, [appearFrame, BUILD_END], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.quad),
        });

  const barPx      = Math.max(0, (country.pop / MAX_POP) * BAR_W * barProg);
  const displayPop = Math.round(country.pop * barProg);
  const isFinale   = frame >= BUILD_END;
  const isTop3     = rank <= 3;
  const isFirst    = rank === 1;

  // Gold shimmer that sweeps once across India's bar at finale start
  const shimmerLeft = isFinale && isFirst
    ? interpolate(frame - BUILD_END, [0, 55], [-120, barPx + 120], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : -9999;

  // Subtle breathing glow on all bars during finale
  const glowA = isFinale ? 0.10 + 0.06 * Math.sin((frame - BUILD_END) * 0.10) : 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flex: 1,
        paddingLeft: H_PAD,
        paddingRight: H_PAD,
        opacity: rowOpacity,
        transform: `translateY(${rowY}px)`,
      }}
    >
      {/* Rank */}
      <div
        style={{
          width: RANK_W,
          flexShrink: 0,
          paddingRight: 10,
          color: isTop3 ? C_BAR : C_DIM,
          fontSize: isTop3 ? 32 : 26,
          fontWeight: 900,
          fontFamily: "'Arial Black', Arial, sans-serif",
          textAlign: "right",
          textShadow: isFinale && isFirst ? `0 0 18px ${C_GOLD}90` : undefined,
        }}
      >
        #{rank}
      </div>

      {/* Flag */}
      <div
        style={{
          width: FLAG_W,
          flexShrink: 0,
          fontSize: 38,
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {country.flag}
      </div>

      {/* Country name */}
      <div
        style={{
          width: NAME_W,
          marginLeft: GAP,
          flexShrink: 0,
          color: C_WHITE,
          fontSize: 26,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
          letterSpacing: -0.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {country.name}
      </div>

      {/* Bar track */}
      <div
        style={{
          flex: 1,
          height: BAR_H,
          background: C_TRACK,
          borderRadius: 5,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Filled bar */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: barPx,
            background:
              isFinale && isFirst
                ? `linear-gradient(90deg, ${C_BAR} 55%, #ff9044 100%)`
                : C_BAR,
            borderRadius: 5,
            boxShadow: `0 0 ${10 + glowA * 35}px rgba(232,93,38,${glowA.toFixed(3)})`,
          }}
        />

        {/* Growing-tip cursor (white flash at advancing edge) */}
        {frame > appearFrame && frame < BUILD_END && (
          <div
            style={{
              position: "absolute",
              top: 4,
              bottom: 4,
              left: Math.max(0, barPx - 7),
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
            left: shimmerLeft,
            width: 120,
            background:
              "linear-gradient(90deg, transparent, rgba(255,215,0,0.45), transparent)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Population counter */}
      <div
        style={{
          width: POP_W,
          paddingLeft: 14,
          flexShrink: 0,
          color: isTop3 ? C_WHITE : "#999999",
          fontSize: 25,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
          textAlign: "right",
          letterSpacing: -0.3,
          opacity: frame >= appearFrame ? 1 : 0,
        }}
      >
        {fmtPop(displayPop, country.pop)}
      </div>
    </div>
  );
};

// ─── Source footer ────────────────────────────────────────────────────────────
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
        height: FTR_H,
        display: "flex",
        alignItems: "center",
        padding: `0 ${H_PAD}px`,
        borderTop: "1px solid #1e1e1e",
        opacity,
      }}
    >
      <span style={{ color: "#444444", fontSize: 18, fontFamily: "Arial, sans-serif" }}>
        Source: United Nations, World Population Prospects 2025 · Estimates for 2026
      </span>
    </div>
  );
};

// ─── Main composition ─────────────────────────────────────────────────────────
export const CountryRanking: React.FC = () => {
  const frame       = useCurrentFrame();
  const { fps }     = useVideoConfig();

  // Chart fades in as title card fades out
  const chartOpacity = interpolate(frame, [TITLE_END, TITLE_END + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: C_BG, fontFamily: "Arial, sans-serif" }}>

      {/* ── Bar chart (slides in after title) ── */}
      <AbsoluteFill style={{ opacity: chartOpacity }}>

        {/* Subtle scanline texture */}
        <AbsoluteFill
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.007) 3px, rgba(255,255,255,0.007) 4px)",
            pointerEvents: "none",
          }}
        />

        {/* Vignette */}
        <AbsoluteFill
          style={{
            background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
            pointerEvents: "none",
          }}
        />

        <GridLines frame={frame} />

        {/* 10 bar rows filling the space between header and footer */}
        <div
          style={{
            position: "absolute",
            top: HDR_H,
            bottom: FTR_H,
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
      </AbsoluteFill>

      {/* ── Title card — rendered last so it sits on top ── */}
      <TitleCard frame={frame} fps={fps} />

    </AbsoluteFill>
  );
};
