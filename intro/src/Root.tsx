import "./index.css";
import { Composition } from "remotion";
import { SoftwaveIntro } from "./SoftwaveIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SoftwaveIntro"
      component={SoftwaveIntro}
      durationInFrames={110}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
