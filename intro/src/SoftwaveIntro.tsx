import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});

const Wordmark: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = interpolate(frame, [0, 0.9 * fps], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // fade the wordmark out at the end so we're left with just the water
  const out = interpolate(
    frame,
    [durationInFrames - 22, durationInFrames - 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const opacity = enter - out;
  const y = interpolate(enter, [0, 1], [24, 0]);
  const scale = interpolate(enter, [0, 1], [0.96, 1]);

  const lineWidth = interpolate(frame, [0.5 * fps, 1.7 * fps], [0, 280], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagOpacity =
    interpolate(frame, [1.2 * fps, 2 * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) - out;

  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center", fontFamily }}
    >
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 460,
          opacity,
          background:
            "radial-gradient(closest-side, rgba(6,16,24,0.5), rgba(6,16,24,0.22) 55%, transparent 75%)",
          filter: "blur(8px)",
        }}
      />
      <div
        style={{
          opacity,
          transform: `translateY(${y}px) scale(${scale})`,
          textAlign: "center",
          textShadow: "0 4px 18px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            fontSize: 118,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          Softwave<span style={{ color: "#6fe3df" }}>Tech</span>
        </div>
        <div
          style={{
            height: 2,
            width: lineWidth,
            background: "#6fe3df",
            margin: "28px auto 0",
            borderRadius: 2,
            boxShadow: "0 0 16px rgba(111,227,223,0.7)",
          }}
        />
        <div
          style={{
            marginTop: 22,
            fontSize: 22,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "#dff1f2",
            opacity: tagOpacity,
          }}
        >
          Software Studio
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const SoftwaveIntro: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1622" }}>
      <Sequence>
        <Video
          src={staticFile("water.mp4")}
          trimBefore={2 * fps}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>

      {/* light, optimistic vignette - just enough for the wordmark to read */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 95% at 50% 45%, transparent 38%, rgba(6,14,22,0.42) 100%)",
        }}
      />

      <Wordmark />
    </AbsoluteFill>
  );
};
