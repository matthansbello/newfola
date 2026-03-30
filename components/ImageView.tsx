"use client";

import { Fragment, useEffect, useState } from "react";
import useClickOutside from "@/lib/useClickOutside";

interface ImgViewsProps {
  close: (value: boolean) => void;
  src: string;
}

const ImgViews = ({ close, src }: ImgViewsProps) => {
  let nodes = useClickOutside(() => {
    close(false);
  });
  return (
    <Fragment>
      <div className="mfp-bg mfp-ready" onClick={() => close(false)}></div>
      <div
        className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"
        tabIndex={-1}
        style={{ overflow: "hidden auto" }}
      >
        <div
          className={`mfp-container mfp-s-ready mfp-iframe-holder mfp-img-container`}
        >
          <div className="mfp-content" ref={nodes}>
            <div className="mfp-iframe-scaler">
              <img className="mfp-img" src={src} alt="" />
            </div>
          </div>
          <div className="mfp-preloader">Loading...</div>
        </div>
      </div>
    </Fragment>
  );
};

const ImageView = () => {
  const [img, setImg] = useState(false);
  const [imgValue, setImgValue] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const anchors = document.querySelectorAll("a");
      anchors.forEach((anchor) => {
        if (anchor.href.includes("assets/images/")) {
          if (anchor.getAttribute("download") === null) {
            anchor.addEventListener("click", (e) => {
              e.preventDefault();
              setImgValue(anchor.href);
              setImg(true);
            });
          }
        }
      });
    }, 1500);
  }, []);
  return (
    <Fragment>
      {img && imgValue && <ImgViews close={() => setImg(false)} src={imgValue} />}
    </Fragment>
  );
};

export default ImageView;

