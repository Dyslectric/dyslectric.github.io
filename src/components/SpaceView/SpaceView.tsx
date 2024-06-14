import { createContext, useState } from "react";
import { Background } from "./Background";
import { Camera } from "../Camera";
//import { ViewportContext } from "../Viewport.jsx";

export const SpaceViewContext = createContext({
  cameraViewport: { width: 0, height: 0 },
  setCameraViewport: (_viewport: { width: number; height: number }) => {},
  cameraBounds: { left: 0, right: 0, top: 0, bottom: 0 },
  setCameraBounds: (_bounds: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  }) => {},
});

export const SpaceView = () => {
  //const viewport = useContext(ViewportContext);

  const [cameraViewport, setCameraViewport] = useState({
    width: 1024,
    height: 1024,
  });
  const [cameraBounds, setCameraBounds] = useState({
    left: -32768,
    right: 32768,
    top: -32768,
    bottom: 32768,
  });

  return (
    <SpaceViewContext.Provider
      value={{
        cameraViewport,
        setCameraViewport,
        cameraBounds,
        setCameraBounds,
      }}
    >
      <Camera>
        <Background />
      </Camera>
    </SpaceViewContext.Provider>
  );
};
