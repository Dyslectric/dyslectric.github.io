import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/orbital-ace-landing-image.png";
import {
  ScalingNavbar,
  ScalingNavbarContext,
} from "./components/ScalingNavbar";
import owlEyeSvg from "./owleye.svg";
import { LandingPageBg } from "./LandingPageBg";
import { createPortal } from "react-dom";
import ArticleCarousel from "./components/ArticleCarousel";
import rocketSvg from "./assets/rocket.svg";

const NavbarFadingBackground = () => {
  const navbar = useContext(ScalingNavbarContext);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: `rgba(10, 10, 10, ${navbar.animation})`,
        borderBottomWidth: "1.5px",
        borderBottomColor: `rgba(96, 96, 96, ${navbar.animation})`,
      }}
    ></div>
  );
};

const NavbarLogo = () => {
  const navbar = useContext(ScalingNavbarContext);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        alignItems: "center",
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <img
        src={owlEyeSvg}
        className=""
        style={{
          height: `${30 - navbar.animation * 25}vh`,
          marginLeft: `${28 - navbar.animation * 27}vw`,
        }}
      />
      <h1
        style={{
          fontSize: `${2 - navbar.animation}vw`,
          maxWidth: "fit-content",
          background:
            "linear-gradient(to right, #903030, #903090, #303090, #309090, #309030, #909030, #903030)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          margin: `1vw`,
          padding: "1vw",
        }}
      >
        {" "}
        [dave@dyslectric ~]{" "}
      </h1>
    </div>
  );
};

export interface NavbarProps {
  height: number;
  animation: number;
}

export const Navbar: FC<NavbarProps> = ({ height, animation }) => {
  return (
    <ScalingNavbar size={height} animation={animation}>
      <NavbarFadingBackground />
      <NavbarLogo />
    </ScalingNavbar>
  );
};

export interface SpaceBackgroundProps {
  animation: number;
}

function App() {
  const [scroll, setScroll] = useState(window.scrollY);
  const [spacemode, setSpacemode] = useState(false);

  const navbarHeight = 0.07;

  useEffect(() => {
    document.addEventListener("scroll", () => setScroll(window.scrollY));
  });

  const scrollInScreenHeights = useMemo(
    () => scroll / window.innerHeight,
    [scroll, window.innerHeight],
  );

  const clampedScroll = useMemo(
    () => Math.min(scrollInScreenHeights, 1 - navbarHeight),
    [scrollInScreenHeights, navbarHeight],
  );

  const navbarAnimation = useMemo(
    () => clampedScroll / (1 - navbarHeight),
    [clampedScroll, navbarHeight],
  );

  const carousels = useMemo(
    () =>
      Array.from(document.querySelectorAll("ul.article-carousel")).map(
        (element, index) => {
          return (
            <ArticleCarousel element={element as HTMLElement} key={index} />
          );
        },
      ),
    [],
  );

  return (
    <>
      {createPortal(
        <img
          src={rocketSvg}
          style={{
            width: "100%",
            height: "100%",
          }}
          onClick={() => {
            if (spacemode) {
              setSpacemode(false);
            } else {
              setSpacemode(true);
            }
          }}
        />,
        document.getElementById("spacemode-button")!,
      )}
      {createPortal(
        spacemode ? <LandingPageBg animation={navbarAnimation} /> : undefined,
        document.getElementById("space-background")!,
      )}

      {createPortal(
        <Navbar height={navbarHeight} animation={navbarAnimation} />,
        document.getElementById("navbar")!,
      )}

      {carousels}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
