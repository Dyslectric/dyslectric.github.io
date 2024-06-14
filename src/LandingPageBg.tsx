import { Stage, useApp } from "@pixi/react";
import { FC, useEffect } from "react";
import { SpaceView } from "./components/SpaceView/SpaceView";
import { Viewport as SpaceViewport } from "./components/Viewport.tsx";

export const Viewport: FC = () => {
  const app = useApp();

  useEffect(() => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  }, [window.innerWidth, window.innerHeight]);

  return <></>;
};

export interface LandingPageBgProps {
  animation: number;
}

export const LandingPageBg: FC<LandingPageBgProps> = ({ animation }) => {
  return (
    <div
      style={{
        filter: `blur(${animation * 4}px)`,
        position: "fixed",
        top: 0,
        zIndex: -1,
      }}
    >
      <Stage options={{ backgroundColor: 0x000000 }}>
        <Viewport />
        <SpaceViewport>
          <SpaceView />
        </SpaceViewport>
      </Stage>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: `rgba(10, 10, 10, ${animation * 0.75})`,
          position: "fixed",
          top: 0,
        }}
      ></div>
    </div>
  );
};
