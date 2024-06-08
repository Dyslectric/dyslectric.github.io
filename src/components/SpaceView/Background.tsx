import {
  Container as ContainerComponent,
  TilingSprite as TilingSpriteComponent,
  useApp,
} from "@pixi/react";
import { BLEND_MODES, Container, Sprite, Texture } from "pixi.js";
import { FC, useContext, useEffect, useMemo } from "react";
import { CameraContext } from "../Camera";
import { ViewportContext } from "../Viewport";
import { SpaceViewContext } from "./SpaceView";

import STARFIELD from "./assets/bgs/1024/Starfields/Starfield_02-1024x1024.png";

import NEBULA_1 from "./assets/bgs/1024/Purple Nebula/Purple_Nebula_01-1024x1024.png";
import NEBULA_2 from "./assets/bgs/1024/Blue Nebula/Blue_Nebula_04-1024x1024.png";
import NEBULA_3 from "./assets/bgs/1024/Green Nebula/Green_Nebula_04-1024x1024.png";
import NEBULA_4 from "./assets/bgs/1024/Green Nebula/Green_Nebula_07-1024x1024.png";

import NEBULA_MASK_1 from "./assets/masks/nebulamask3.png";
import NEBULA_MASK_2 from "./assets/masks/nebulamask7.png";
import NEBULA_MASK_3 from "./assets/masks/nebulamask4.png";
import NEBULA_MASK_4 from "./assets/masks/nebulamask2.png";

export interface SpaceBackgroundLayerProps {
  texture: Texture;
  z: number;
  mask?: Texture;
  scale?: number;
  maskScale?: number;
}

export const SpaceBackgroundLayer: FC<SpaceBackgroundLayerProps> = ({
  texture,
  z,
  mask,
  scale,
  maskScale,
}) => {
  const camera = useContext(CameraContext);
  const viewport = useContext(ViewportContext);
  const maskSprite: Sprite | null = useMemo(
    () => (mask ? Sprite.from(mask) : null),
    [mask],
  );
  const app = useApp();

  const distance = camera.z - z;
  const layerScale = ((scale ? scale : 1) / distance) * camera.zoom;

  useEffect(() => {
    if (maskSprite) {
      maskSprite.anchor.set(0.5);

      const container = new Container();
      container.x = viewport.width / 2;
      container.y = viewport.height / 2;

      container.addChild(maskSprite);
      app.stage.addChild(container);
    }
  }, [viewport.width, viewport.height]);

  useEffect(() => {
    if (maskSprite) {
      maskSprite.scale.set(
        ((maskScale ? maskScale : 1) / distance) * camera.zoom,
      );
      maskSprite.x = (-camera.x / distance) * camera.zoom;
      maskSprite.y = (-camera.y / distance) * camera.zoom;
    }
  }, [maskSprite, camera.x, camera.y, distance, z, camera.zoom]);

  useEffect(() => {
    document.addEventListener("mousemove", (event) => {
      camera.setX(event.clientX * 5);
      camera.setY(event.clientY * 5);
    });
  }, []);

  return (
    <ContainerComponent x={viewport.width / 2} y={viewport.height / 2}>
      <TilingSpriteComponent
        mask={maskSprite}
        texture={texture}
        width={viewport.width}
        height={viewport.height}
        tileScale={{ x: layerScale, y: layerScale }}
        anchor={0.5}
        alpha={1.0}
        tilePosition={{
          x: viewport.width / 2 - (camera.x / distance) * camera.zoom,
          y: viewport.height / 2 - (camera.y / distance) * camera.zoom,
        }}
        blendMode={BLEND_MODES.ADD}
      />
    </ContainerComponent>
  );
};

export const Background = () => {
  const spaceView = useContext(SpaceViewContext);
  const viewport = useContext(ViewportContext);
  const camera = useContext(CameraContext);

  //const cameraBoundsWidth = spaceView.cameraBounds.right - spaceView.cameraBounds.right;
  //const cameraBoundsHeight = spaceView.cameraBounds.bottom - spaceView.cameraBounds.top;

  const cameraViewport = useMemo(() => {
    return {
      width: (viewport.width * camera.z) / camera.zoom,
      height: (viewport.height * camera.z) / camera.zoom,
    };
  }, [
    window.innerWidth,
    viewport.width,
    viewport.height,
    camera.z,
    camera.zoom,
  ]);

  useEffect(() => {
    spaceView.setCameraViewport(cameraViewport);
  }, [cameraViewport]);

  const starfield = useMemo(() => {
    return {
      texture: Texture.from(STARFIELD),
      z: -48,
      scale: 24,
    };
  }, []);

  const nebulas = [
    {
      texture: Texture.from(NEBULA_1),
      z: -32,
      mask: Texture.from(NEBULA_MASK_1),
      maskScale: 200,
    },
    {
      texture: Texture.from(NEBULA_2),
      z: -18,
      mask: Texture.from(NEBULA_MASK_2),
      maskScale: 144,
    },
    {
      texture: Texture.from(NEBULA_3),
      z: -12,
      mask: Texture.from(NEBULA_MASK_3),
      maskScale: 128 + 4,
    },
    {
      texture: Texture.from(NEBULA_4),
      z: -8,
      mask: Texture.from(NEBULA_MASK_4),
      maskScale: 128,
    },
  ];

  return (
    <>
      <SpaceBackgroundLayer
        texture={starfield.texture}
        z={starfield.z}
        scale={starfield.scale}
      />

      {nebulas.map((nebula, index) => (
        <SpaceBackgroundLayer
          key={index}
          texture={nebula.texture}
          z={nebula.z}
          mask={nebula.mask}
          maskScale={nebula.maskScale}
          scale={8.0}
        />
      ))}
    </>
  );
};
