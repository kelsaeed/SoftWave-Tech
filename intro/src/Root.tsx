import "./index.css";
import { Composition } from "remotion";
import { SoftwaveIntro } from "./SoftwaveIntro";
import { Splash } from "./Splash";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SoftwaveIntro"
        component={SoftwaveIntro}
        durationInFrames={110}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Splash"
        component={Splash}
        durationInFrames={34}
        fps={30}
        width={600}
        height={600}
      />
    </>
  );
};
