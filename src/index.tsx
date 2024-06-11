import React, { FC, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import owlEyeSvg from "./owleye.svg";
import "./styles.css";
import "./index.css";
import "./assets/orbital-ace-landing-image.png";
import { LandingPageBg } from "./LandingPageBg";

export const LandingPage: FC<{}> = () => {
  // by screens
  const [scroll, setScroll] = useState(window.scrollY);

  const landingNavAnimation = scroll < 0.93 ? scroll / 0.93 : 1;
  const leftPadding = 14 - 13 * landingNavAnimation;
  const imgSize = 20 - 17 * landingNavAnimation;
  const boxHeight = 100 - 93 * landingNavAnimation;
  const textSize = 3 - 1.75 * landingNavAnimation;
  const textLeftMargin = 5 - 4.3 * landingNavAnimation;

  const onScroll = useCallback(() => {
    setScroll(window.scrollY / window.innerHeight);
  }, [window.innerHeight]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
  });

  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: -1,
          backgroundColor: "rgb(30, 30, 30)",
          height: `${100 - boxHeight}vh`,
          bottom: 0,
          width: window.innerWidth,
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: "fixed",
          zIndex: -2,
          filter: `blur(${8 * landingNavAnimation}px)`,
        }}
      >
        <LandingPageBg height={window.innerHeight} />
      </div>
      <div
        style={{
          position: "fixed",
          display: "flex",
          flexDirection: "row",
          alignSelf: "center",
          height: `${boxHeight}vh`,
          width: `100vw`,
          backgroundColor: `rgba(0, 0, 0, ${landingNavAnimation})`,
        }}
      >
        <img
          src={owlEyeSvg}
          className=""
          style={{
            width: `${imgSize}vw`,
            height: `${imgSize}vw`,
            alignSelf: "center",
            marginLeft: `${leftPadding}vw`,
          }}
        />
        <h1
          style={{
            fontSize: `${textSize}vw`,
            alignSelf: "center",
            maxWidth: "fit-content",
            background:
              "linear-gradient(to right, #903030, #903090, #303090, #309090, #309030, #909030, #903030)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginLeft: `${textLeftMargin}vw`,
            //background,
          }}
        >
          {" "}
          [dave@dyslectric ~]{" "}
        </h1>
      </div>
      <div
        style={{
          width: "100vw",
          height: `100vh`,
          //backgroundColor: "#000000",
        }}
      ></div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
);
