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

  const out = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
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
          opacity,
          transform: `translateY(${y}px) scale(${scale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 118,
            fontWeight: 700,
            color: "#e9f1f3",
            letterSpacing: "-0.02em",
          }}
        >
          Softwave<span style={{ color: "#5fd6d2" }}>Tech</span>
        </div>
        <div
          style={{
            height: 2,
            width: lineWidth,
            background: "#5fd6d2",
            margin: "28px auto 0",
            borderRadius: 2,
          }}
        />
        <div
          style={{
            marginTop: 22,
            fontSize: 22,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "#9fb2bb",
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
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // fade to the site background colour at the end for a seamless hand-off
  const toSite = interpolate(
    frame,
    [durationInFrames - 16, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#060a10" }}>
      <Sequence>
        <Video
          src={staticFile("water.mp4")}
          trimBefore={2 * fps}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,10,16,0.5), rgba(6,10,16,0.8)), radial-gradient(900px 600px at 50% 42%, rgba(95,214,210,0.12), transparent 60%)",
        }}
      />

      <Wordmark />

      <AbsoluteFill
        style={{ backgroundColor: "#060a10", opacity: toSite }}
      />
    </AbsoluteFill>
  );
};
