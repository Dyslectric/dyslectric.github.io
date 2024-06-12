import React, { FC, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import owlEyeSvg from "./owleye.svg";
import "./styles.css";
import "./index.css";
import "./assets/orbital-ace-landing-image.png";
import navArrowLeftSvg from "./assets/stroked-nav-left.svg";
import navArrowRightSvg from "./assets/stroked-nav-right.svg";
import rocketSvg from "./assets/rocket.svg";
import { LandingPageBg } from "./LandingPageBg";

export const LandingPage: FC<{}> = () => {
  // by screens
  const [scroll, setScroll] = useState(window.scrollY);

  const landingNavAnimation = scroll < 0.93 ? scroll / 0.93 : 1;
  const leftPadding = 15 - 14 * landingNavAnimation;
  const imgSize = 20 - 17 * landingNavAnimation;
  const boxHeight = 100 - 93 * landingNavAnimation;
  const textSize = 3 - 1.75 * landingNavAnimation;
  const textLeftMargin = 5 - 4.3 * landingNavAnimation;

  const [spaceModeOn, setSpaceModeOn] = useState(false);

  const onScroll = useCallback(() => {
    setScroll(window.scrollY / window.innerHeight);
  }, [window.innerHeight]);

  const onRocketClick = useCallback(() => {
    if (spaceModeOn) {
      setSpaceModeOn(false);
    } else {
      setSpaceModeOn(true);
    }
  }, [spaceModeOn]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
  });

  return (
    <>
      <img
        src={rocketSvg}
        style={{
          position: "fixed",
          zIndex: 3,
          width: "1vw",
          top: "1vw",
          right: "1vw",
        }}
        onMouseDown={onRocketClick}
      />
      <div
        style={{
          position: "fixed",
          zIndex: -1,
          backgroundColor: "rgb(30, 30, 30)",
          height: `${100 - boxHeight}vh`,
          bottom: 0,
          width: window.innerWidth,
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: "fixed",
          zIndex: -2,
          filter: `blur(${8 * landingNavAnimation}px)`,
        }}
      >
        {spaceModeOn ? (
          <LandingPageBg height={window.innerHeight} />
        ) : undefined}
      </div>
      <div
        style={{
          position: "fixed",
          zIndex: 2,
          display: "flex",
          flexDirection: "row",
          alignSelf: "center",
          height: `${boxHeight}vh`,
          width: `100vw`,
          backgroundColor: spaceModeOn
            ? `rgba(0, 0, 0, ${landingNavAnimation})`
            : "#101010",
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
            margin: `${textLeftMargin}vw`,
            padding: "1vw",
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

export interface ArticleCarouselProps {
  id: string;
}

export const ArticleCarousel: FC<ArticleCarouselProps> = ({ id }) => {
  const element = document.getElementById(id);
  const children = element ? [...element.children] : [];
  const carouselId = `${id}-carousel`;

  useEffect(() => {
    if (element) element.style.setProperty("display", "none");
  });

  const scrollLeft = useCallback(() => {
    const element = document.querySelector(
      `#${carouselId} .article-carousel-inner`,
    );
    if (element) element.scrollTo(element.scrollLeft - 460, element.scrollTop);
  }, []);
  const scrollRight = useCallback(() => {
    const element = document.querySelector(
      `#${carouselId} .article-carousel-inner`,
    );
    if (element) element.scrollTo(element.scrollLeft + 460, element.scrollTop);
  }, []);

  return (
    <>
      <div id={carouselId} className="article-carousel" style={{}}>
        <div
          className="article-carousel-controls"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100vw",
            position: "absolute",
            zIndex: 1,
            paddingLeft: "2vw",
            paddingRight: "2vw",
          }}
        >
          <img
            src={navArrowLeftSvg}
            className="carousel-nav-arrow"
            onMouseDown={scrollLeft}
          />
          <img
            src={navArrowRightSvg}
            className="carousel-nav-arrow"
            onMouseDown={scrollRight}
          />
        </div>
        <div
          className="article-carousel-inner"
          style={{
            scrollBehavior: "smooth",
            display: "grid",
            position: "relative",
            gridGap: 60,
            paddingLeft: "6vw",
            paddingRight: "6vw",
            gridTemplateColumns: "repeat(auto-fill,400px)",
            gridAutoFlow: "column",
            gridAutoColumns: 400,
            overflowX: "hidden",
            mask: "linear-gradient(to right, rgba(0,0,0,0) 0, rgba(0,0,0,0) 2%, rgba(0,0,0,1) 6%, rgba(0,0,0, 1) 94%, rgba(0,0,0, 0) 98%)",
          }}
        >
          {children.map((child, index) => {
            const image = child.getElementsByTagName("img").item(0);
            const title = child.getElementsByTagName("h1").item(0);
            const description = child.getElementsByTagName("p").item(0);
            const imageSrc = image ? image.getAttribute("src") : undefined;

            return (
              <div
                key={index}
                className="article"
                style={{
                  display: "inline-block",
                }}
              >
                <img
                  className="article-image"
                  src={imageSrc ? imageSrc : undefined}
                  style={{
                    objectFit: "cover",
                    width: 400,
                    height: 230,
                    borderRadius: "0.3in 0.3in 0in 0in",
                  }}
                />
                <div className="article-textbox">
                  <h1 className="article-title text-wrap text-2xl">
                    {title ? title.innerText : ""}
                  </h1>
                  <p
                    className="article-description text-wrap"
                    style={{ paddingTop: 0 }}
                  >
                    {description ? description.innerText : ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
);

ReactDOM.createRoot(
  document.getElementById("orbital-ace-article-carousel")!,
).render(
  <React.StrictMode>
    <ArticleCarousel id={"orbital-ace-articles"} />
  </React.StrictMode>,
);

ReactDOM.createRoot(
  document.getElementById("ls-techs-article-carousel")!,
).render(
  <React.StrictMode>
    <ArticleCarousel id={"ls-techs-articles"} />
  </React.StrictMode>,
);

//const orbAceArticlesDiv = document.getElementById("orbital-ace-articles-area");
