import React, { FC, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import owlEyeSvg from "./owleye.svg";
import "./styles.css";
import { LandingPageBg } from "./LandingPageBg";

export const LandingPage: FC<{}> = () => {
  // by screens
  const [scroll, setScroll] = useState(window.scrollY);

  const landingNavAnimation = scroll < 1 ? scroll : 1;
  const leftPadding = 14 - 13 * landingNavAnimation;
  const imgSize = 20 - 18 * landingNavAnimation;
  const boxHeight = 100 - 92 * landingNavAnimation;
  const textSize = 3 - 2 * landingNavAnimation;
  const textLeftMargin = 5 - 4.3 * landingNavAnimation;

  const onScroll = useCallback(() => {
    setScroll(window.scrollY / window.innerHeight);
  }, [window.innerHeight]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
  });

  return (
    <>
      <div style={{ position: "fixed", zIndex: -1 }}>
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
          height: `${100 + 8 * landingNavAnimation}vh`,
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
