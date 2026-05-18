import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── Scale & layout ──────────────────────────────────────────────────────────
const SCALE      = 900 / 828;   // px per metre  (Burj → 900 px tall on screen)
const GROUND_Y   = 950;         // ground line from top of 1080px canvas
const SCENE_W    = 2700;        // total scrolling world width

// ─── Timing (60 s @ 30 fps = 1800 frames) ───────────────────────────────────
const DURATION   = 1800;
const FIRST      = 55;          // frame the first building starts growing
const STAGGER    = 170;         // frames between each building appearance
const GROW_F     = 55;          // spring settle frames for construction

// ─── Buildings data ──────────────────────────────────────────────────────────
// x = scene centre of building (px)
// segments: [{hf, wf, shape}] stacked bottom → top
//   hf   = fraction of total height for this segment
//   wf   = width fraction — number (rect/tri) or [botFrac, topFrac] (trapezoid)
//   shape: "rect" | "tri" | "trap"
const BUILDINGS = [
  {
    name: "Flatiron Building", year: 1902, heightM: 87,
    x: 240, widthPx: 56,
    body: "#7a6248", accent: "#a08968",
    segments: [
      { hf: 0.88, wf: [1.0, 0.62], shape: "trap" },
      { hf: 0.07, wf: 1.0,         shape: "rect" },
      { hf: 0.05, wf: 0.55,        shape: "rect" },
    ],
  },
  {
    name: "Singer Building", year: 1908, heightM: 187,
    x: 430, widthPx: 52,
    body: "#6b7a8d", accent: "#8899ad",
    segments: [
      { hf: 0.62, wf: 1.0,  shape: "rect" },
      { hf: 0.16, wf: 0.72, shape: "rect" },
      { hf: 0.12, wf: 0.50, shape: "rect" },
      { hf: 0.10, wf: 1.0,  shape: "tri"  },
    ],
  },
  {
    name: "Metropolitan Life Tower", year: 1909, heightM: 213,
    x: 630, widthPx: 64,
    body: "#8a9aaa", accent: "#a0b2c0",
    segments: [
      { hf: 0.46, wf: 1.0,  shape: "rect" },
      { hf: 0.12, wf: 0.78, shape: "rect" },
      { hf: 0.28, wf: 0.58, shape: "rect" },
      { hf: 0.10, wf: 1.0,  shape: "tri"  },
      { hf: 0.04, wf: 0.12, shape: "rect" },
    ],
  },
  {
    name: "Woolworth Building", year: 1913, heightM: 241,
    x: 840, widthPx: 60,
    body: "#6a7b6e", accent: "#86997a",
    segments: [
      { hf: 0.42, wf: 1.0,  shape: "rect" },
      { hf: 0.26, wf: 0.70, shape: "rect" },
      { hf: 0.18, wf: 0.46, shape: "rect" },
      { hf: 0.10, wf: 1.0,  shape: "tri"  },
      { hf: 0.04, wf: 0.10, shape: "rect" },
    ],
  },
  {
    name: "40 Wall Street", year: 1930, heightM: 283,
    x: 1060, widthPx: 76,
    body: "#4a5568", accent: "#5a6a80",
    segments: [
      { hf: 0.72, wf: 1.0, shape: "rect" },
      { hf: 0.28, wf: 1.0, shape: "tri"  },
    ],
  },
  {
    name: "Chrysler Building", year: 1930, heightM: 319,
    x: 1290, widthPx: 68,
    body: "#9aafc0", accent: "#c8dae8",   // silvery steel
    segments: [
      { hf: 0.66, wf: 1.0,  shape: "rect" },
      { hf: 0.10, wf: 0.80, shape: "rect" },
      { hf: 0.07, wf: 0.64, shape: "rect" },
      { hf: 0.07, wf: 0.46, shape: "rect" },
      { hf: 0.10, wf: 1.0,  shape: "tri"  },
    ],
  },
  {
    name: "Empire State Building", year: 1931, heightM: 443,
    x: 1550, widthPx: 94,
    body: "#4a5568", accent: "#647080",
    segments: [
      { hf: 0.10, wf: 1.00, shape: "rect" },
      { hf: 0.26, wf: 0.82, shape: "rect" },
      { hf: 0.34, wf: 0.62, shape: "rect" },
      { hf: 0.17, wf: 0.40, shape: "rect" },
      { hf: 0.07, wf: 0.22, shape: "rect" },
      { hf: 0.06, wf: 0.07, shape: "rect" },
    ],
  },
  {
    name: "World Trade Center", year: 1972, heightM: 526,
    x: 1820, widthPx: 82,
    body: "#2d3748", accent: "#3a4a62",
    segments: [
      { hf: 0.94, wf: 1.0,  shape: "rect" },
      { hf: 0.03, wf: 0.78, shape: "rect" },
      { hf: 0.03, wf: 0.05, shape: "rect" },
    ],
  },
  {
    name: "Sears Tower", year: 1973, heightM: 527,
    x: 2090, widthPx: 88,
    body: "#1a202c", accent: "#2d3748",
    segments: [
      { hf: 0.63, wf: 1.00, shape: "rect" },
      { hf: 0.19, wf: 0.74, shape: "rect" },
      { hf: 0.11, wf: 0.52, shape: "rect" },
      { hf: 0.07, wf: 0.27, shape: "rect" },
    ],
  },
  {
    name: "Burj Khalifa", year: 2010, heightM: 828,
    x: 2370, widthPx: 68,
    body: "#2a4f7e", accent: "#4a80aa",
    segments: [
      { hf: 0.09, wf: 1.00, shape: "rect" },
      { hf: 0.19, wf: 0.84, shape: "rect" },
      { hf: 0.24, wf: 0.66, shape: "rect" },
      { hf: 0.18, wf: 0.48, shape: "rect" },
      { hf: 0.14, wf: 0.32, shape: "rect" },
      { hf: 0.07, wf: 0.17, shape: "rect" },
      { hf: 0.06, wf: 0.07, shape: "rect" },
      { hf: 0.03, wf: 1.0,  shape: "tri"  },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const screenH = (m) => Math.round(m * SCALE);

function appearFrame(i) { return FIRST + i * STAGGER; }

// ─── Building SVG silhouette ─────────────────────────────────────────────────
function BuildingSVG({ building, wPx, hPx }) {
  let yFromBot = 0;

  const shapes = building.segments.map((seg, i) => {
    const segH = seg.hf * hPx;
    const svgY = hPx - yFromBot - segH;
    yFromBot += segH;
    const fill = i % 2 === 0 ? building.body : building.accent;

    if (seg.shape === "tri") {
      const triW = (typeof seg.wf === "number" ? seg.wf : seg.wf[0]) * wPx;
      const x0   = (wPx - triW) / 2;
      return (
        <polygon
          key={i}
          points={`${wPx / 2},${svgY}  ${x0 + triW},${svgY + segH}  ${x0},${svgY + segH}`}
          fill={fill}
        />
      );
    }

    if (seg.shape === "trap") {
      const [bwf, twf] = seg.wf;
      const bw = bwf * wPx; const tw = twf * wPx;
      const bx = (wPx - bw) / 2; const tx = (wPx - tw) / 2;
      return (
        <polygon
          key={i}
          points={`${tx},${svgY}  ${tx + tw},${svgY}  ${bx + bw},${svgY + segH}  ${bx},${svgY + segH}`}
          fill={fill}
        />
      );
    }

    // rect
    const w = (typeof seg.wf === "number" ? seg.wf : seg.wf[0]) * wPx;
    const x = (wPx - w) / 2;
    return <rect key={i} x={x} y={svgY} width={w} height={segH} fill={fill} />;
  });

  // Subtle window grid overlay (small lit squares)
  const windowPatId = `wp-${building.name.replace(/\s/g, "")}`;

  return (
    <svg width={wPx} height={hPx} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <pattern id={windowPatId} x="0" y="0" width="7" height="10" patternUnits="userSpaceOnUse">
          <rect x="1" y="1" width="4" height="6" fill="rgba(255,210,120,0.18)" />
        </pattern>
      </defs>
      <g>{shapes}</g>
      {/* Window overlay on the main body */}
      <rect
        x={0} y={0} width={wPx} height={hPx}
        fill={`url(#${windowPatId})`}
        style={{ mixBlendMode: "screen" }}
      />
      {/* Subtle vertical highlight */}
      <rect
        x={wPx * 0.12} y={0} width={wPx * 0.08} height={hPx}
        fill="rgba(255,255,255,0.04)"
      />
    </svg>
  );
}

// ─── Sky ──────────────────────────────────────────────────────────────────────
function Sky({ frame }) {
  // Gradually deepens from warm dusk → deeper night-dusk over 60 s
  const t = interpolate(frame, [0, DURATION], [0, 1], { extrapolateRight: "clamp" });
  const topAlpha = interpolate(t, [0, 1], [0.0, 0.35]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        bottom: 1080 - GROUND_Y,
        background: `linear-gradient(to bottom,
          #0d0221 0%,
          #1e0840 12%,
          #5c1e8a 26%,
          #c44b9b 42%,
          #e8546a 55%,
          #f07e3a 67%,
          #f9c74f 80%,
          #fde68a 92%,
          #fff9d4 100%
        )`,
      }}
    >
      {/* Darkening overlay as time passes */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(10,2,25,${topAlpha})`,
        }}
      />
      {/* Glowing horizon band */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0, height: 60,
          background:
            "linear-gradient(to top, rgba(249,190,60,0.28), transparent)",
        }}
      />
    </div>
  );
}

// ─── Ground ───────────────────────────────────────────────────────────────────
function Ground() {
  return (
    <div
      style={{
        position: "absolute",
        top: GROUND_Y, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(to bottom, #12171e, #060809)",
      }}
    />
  );
}

// ─── Horizon glow + haze ─────────────────────────────────────────────────────
function HorizonHaze() {
  return (
    <>
      {/* Warm glow strip at horizon */}
      <div
        style={{
          position: "absolute",
          top: GROUND_Y - 18,
          left: 0, right: 0, height: 36,
          background:
            "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(249,185,70,0.22), transparent)",
          pointerEvents: "none",
        }}
      />
      {/* Haze above ground */}
      <div
        style={{
          position: "absolute",
          top: GROUND_Y - 60,
          left: 0, right: 0, height: 60,
          background:
            "linear-gradient(to bottom, transparent, rgba(180,100,60,0.08))",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

// ─── Vignette ────────────────────────────────────────────────────────────────
function Vignette() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse 110% 100% at 50% 60%, transparent 42%, rgba(4,2,12,0.72) 100%)",
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  );
}

// ─── Building label (top-left) ────────────────────────────────────────────────
function BuildingLabel({ building, opacity }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 64, left: 72,
        opacity,
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          width: 36, height: 4,
          background: "#e85d26",
          borderRadius: 2, marginBottom: 14,
        }}
      />
      <div
        style={{
          color: "#ffffff",
          fontSize: 54,
          fontWeight: 900,
          fontFamily: "'Arial Black', Arial, sans-serif",
          lineHeight: 1.05,
          textShadow: "0 2px 24px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6)",
          letterSpacing: -1,
        }}
      >
        {building.name}
      </div>
      <div
        style={{
          color: "#e85d26",
          fontSize: 32,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
          marginTop: 8,
          textShadow: "0 2px 12px rgba(0,0,0,0.8)",
          letterSpacing: 1,
        }}
      >
        {building.heightM} m
      </div>
    </div>
  );
}

// ─── Year display (bottom-right) ─────────────────────────────────────────────
function YearDisplay({ year, opacity }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 64, right: 72,
        textAlign: "right",
        opacity,
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      <div
        style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: 22,
          fontFamily: "Arial, sans-serif",
          fontWeight: 300,
          letterSpacing: 6,
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        YEAR
      </div>
      <div
        style={{
          color: "#ffffff",
          fontSize: 96,
          fontWeight: 900,
          fontFamily: "'Arial Black', Arial, sans-serif",
          lineHeight: 1,
          textShadow: "0 2px 30px rgba(0,0,0,0.9)",
          letterSpacing: -2,
        }}
      >
        {year}
      </div>
    </div>
  );
}

// ─── Warm glow at base of each building ──────────────────────────────────────
function BuildingGlow({ wPx }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: -10,
        left: "50%",
        transform: "translateX(-50%)",
        width: wPx * 3.5,
        height: 90,
        background:
          "radial-gradient(ellipse 50% 100% at 50% 100%, rgba(240,160,60,0.22), transparent)",
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Main composition ────────────────────────────────────────────────────────
export const Buildings = () => {
  const frame   = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera: smooth left-to-right pan over the full duration
  // Ends with Burj Khalifa centred (its x=2370, target screen centre=960)
  const camEnd = -(2370 - 960);  // ≈ -1410
  const cameraX = interpolate(frame, [0, DURATION], [0, camEnd], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Which building is currently featured (most recently appeared)
  let currentIdx = -1;
  for (let i = 0; i < BUILDINGS.length; i++) {
    if (frame >= appearFrame(i)) currentIdx = i;
  }

  // Label / year opacity: fade in when building appears, persist until next
  const labelOpacity = (() => {
    if (currentIdx < 0) return 0;
    const af   = appearFrame(currentIdx);
    const next = currentIdx < BUILDINGS.length - 1
      ? appearFrame(currentIdx + 1)
      : DURATION + 60;
    return interpolate(
      frame,
      [af, af + 18, next - 20, next],
      [0,  1,       1,         0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  })();

  return (
    <AbsoluteFill style={{ background: "#0d0221" }}>
      <Sky frame={frame} />
      <Ground />
      <HorizonHaze />

      {/* ── Scrolling scene ── */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: SCENE_W,
          height: 1080,
          transform: `translateX(${cameraX}px)`,
          willChange: "transform",
        }}
      >
        {BUILDINGS.map((b, i) => {
          const hPx = screenH(b.heightM);
          const wPx = b.widthPx;
          const af  = appearFrame(i);

          // Construction spring: 0→1 as building grows from ground up
          const sp = spring({
            frame: Math.max(0, frame - af),
            fps,
            config: { damping: 28, stiffness: 100 },
          });
          const buildProgress = frame < af ? 0 : Math.min(1, sp);

          // Clip reveals building from bottom upward
          const clipTop = (1 - buildProgress) * 100;

          return (
            <div
              key={b.name}
              style={{
                position: "absolute",
                left:   b.x - wPx / 2,
                top:    GROUND_Y - hPx,
                width:  wPx,
                height: hPx,
                clipPath: `inset(${clipTop}% 0 0 0)`,
              }}
            >
              <BuildingSVG building={b} wPx={wPx} hPx={hPx} />
              <BuildingGlow wPx={wPx} />
            </div>
          );
        })}

        {/* Ground line */}
        <div
          style={{
            position: "absolute",
            top: GROUND_Y,
            left: 0, width: SCENE_W, height: 2,
            background:
              "linear-gradient(90deg, transparent, rgba(249,190,60,0.35) 20%, rgba(249,190,60,0.35) 80%, transparent)",
          }}
        />
      </div>

      <Vignette />

      {/* ── Overlays (fixed to screen) ── */}
      {currentIdx >= 0 && (
        <>
          <BuildingLabel
            building={BUILDINGS[currentIdx]}
            opacity={labelOpacity}
          />
          <YearDisplay
            year={BUILDINGS[currentIdx].year}
            opacity={labelOpacity}
          />
        </>
      )}

      {/* Cinematic letterbox bars */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 40,
        background: "rgba(0,0,0,0.55)", zIndex: 40 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40,
        background: "rgba(0,0,0,0.55)", zIndex: 40 }} />
    </AbsoluteFill>
  );
};
