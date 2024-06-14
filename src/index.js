import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import owlEyeSvg from "./owleye.svg";
import { LandingPageBg } from "./LandingPageBg";
export const LandingPage = () => {
  // by screens
  const [scroll, setScroll] = useState(window.scrollY);
  const landingNavAnimation = scroll < 1 ? scroll : 1;
  const leftPadding = 14 - 13 * landingNavAnimation;
  const imgSize = 25 - 22 * landingNavAnimation;
  const boxHeight = 100 - 92 * landingNavAnimation;
  const textSize = 3 - 2 * landingNavAnimation;
  const textLeftMargin = 5 - 4.3 * landingNavAnimation;
  const onScroll = useCallback(() => {
    setScroll(window.scrollY / window.innerHeight);
  }, [window.innerHeight]);
  useEffect(() => {
    document.addEventListener("scroll", onScroll);
  });
  return _jsxs(_Fragment, {
    children: [
      _jsx("div", {
        style: { position: "fixed" },
        children: _jsx(LandingPageBg, {
          height: (boxHeight / 100) * window.innerHeight,
        }),
      }),
      _jsxs("div", {
        style: {
          position: "fixed",
          display: "flex",
          flexDirection: "row",
          alignSelf: "center",
          height: `${boxHeight}vh`,
          width: `100vw`,
        },
        children: [
          _jsx("img", {
            src: owlEyeSvg,
            className: "",
            style: {
              width: `${imgSize}vw`,
              height: `${imgSize}vw`,
              alignSelf: "center",
              marginLeft: `${leftPadding}vw`,
            },
          }),
          _jsxs("h1", {
            style: {
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
            },
            children: [" ", "[dave@dyslectric ~]", " "],
          }),
        ],
      }),
      _jsx("div", {
        style: {
          width: "100vw",
          height: `${100 + 8 * landingNavAnimation}vh`,
          //backgroundColor: "#000000",
        },
      }),
    ],
  });
};
ReactDOM.createRoot(document.getElementById("root")).render(
  _jsx(React.StrictMode, { children: _jsx(LandingPage, {}) }),
);
