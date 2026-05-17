import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const CENTER = 300;
const DROPS = 16;

// small deterministic jitter so the splash looks organic but renders the same
const rand = (i: number) => {
  const v = Math.sin(i * 127.1) * 43758.5453;
  return v - Math.floor(v);
};

const Drop: React.FC<{ i: number }> = ({ i }) => {
  const frame = useCurrentFrame();
  const angle = (i / DROPS) * Math.PI * 2 + rand(i) * 0.5;
  const reach = 150 + rand(i + 9) * 110;
  const size = 14 + rand(i + 3) * 22;
  const launch = 2 + rand(i + 5) * 3;

  const t = interpolate(frame, [launch, launch + 22], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const x = CENTER + Math.cos(angle) * reach * t;
  // up first, then gravity pulls it back down
  const lift = Math.sin(t * Math.PI) * (90 + rand(i) * 70);
  const fall = t * t * 150;
  const y = CENTER - Math.sin(angle) * reach * t * 0.35 - lift + fall;

  const opacity = interpolate(frame, [launch, launch + 4, launch + 20, launch + 26], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Img
      src={staticFile("water-drop.png")}
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size * 1.25,
        opacity,
      }}
    />
  );
};

const Ring: React.FC<{ delay: number; max: number }> = ({ delay, max }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 20], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(p, [0, 0.15, 1], [0, 0.8, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: CENTER,
        top: CENTER,
        width: max * p,
        height: max * p * 0.42,
        marginLeft: (-max * p) / 2,
        marginTop: (-max * p * 0.42) / 2,
        border: "3px solid rgba(150, 240, 235, 1)",
        borderRadius: "50%",
        opacity,
      }}
    />
  );
};

export const Splash: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // central water column that rises and falls back
  const colP = interpolate(frame, [0, 7, 20], [0, 1, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fade = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <Ring delay={1} max={420} />
      <Ring delay={5} max={300} />

      <div
        style={{
          position: "absolute",
          left: CENTER - 26,
          top: CENTER - 150 * colP,
          width: 52,
          height: 170 * colP,
          background:
            "linear-gradient(to top, rgba(150,240,235,0.9), rgba(150,240,235,0))",
          borderRadius: "40% 40% 50% 50%",
        }}
      />

      {Array.from({ length: DROPS }, (_, i) => (
        <Drop key={i} i={i} />
      ))}
    </AbsoluteFill>
  );
};
