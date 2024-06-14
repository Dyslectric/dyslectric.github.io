import { FC, useCallback, useEffect, useMemo } from "react";
import navArrowLeftSvg from "./assets/stroked-nav-left.svg";
import navArrowRightSvg from "./assets/stroked-nav-right.svg";
import { createPortal } from "react-dom";

export interface ArticleCarouselProps {
  element: HTMLElement;
  id?: string;
}

export const ArticleCarousel: FC<ArticleCarouselProps> = ({ element, id }) => {
  const children = useMemo(() => (element ? [...element.children] : []), []);
  const portalContainer = useMemo(() => document.createElement("div"), []);
  const carouselId = useMemo(
    () => `${id ? id : `carousel-${crypto.randomUUID()}`}`,
    [id],
  );

  useEffect(() => {
    element.replaceWith(portalContainer);
  }, []);

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

  const portal = useMemo(
    () =>
      createPortal(
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
                mask: "linear-gradient(to right, rgba(0,0,0,0) 0, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 6%, rgba(0,0,0, 1) 94%, rgba(0,0,0, 0) 100%)",
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
        </>,
        portalContainer,
      ),
    [],
  );

  return portal;
};

export default ArticleCarousel;
