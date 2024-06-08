import { Stage, useApp } from "@pixi/react";
import { FC, useEffect } from "react";
import { SpaceView } from "./components/SpaceView/SpaceView";
import { Viewport as SpaceViewport } from "./components/Viewport.tsx";

export interface LandingPageBgProps {
  height: number;
}

export const Viewport: FC<LandingPageBgProps> = ({ height }) => {
  const app = useApp();

  useEffect(() => {
    app.renderer.resize(window.innerWidth, height);
  }, [window.innerWidth, height]);

  return <></>;
};

export const LandingPageBg: FC<LandingPageBgProps> = ({ height }) => {
  return (
    <>
      <Stage options={{ backgroundColor: 0x000000 }}>
        <Viewport height={height} />
        <SpaceViewport>
          <SpaceView />
        </SpaceViewport>
      </Stage>
    </>
  );
};
