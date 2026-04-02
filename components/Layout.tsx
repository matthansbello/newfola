"use client";

import { Fragment, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import ImageView from "./ImageView";
import { activeAnimation, initCursor } from "@/lib/utils";
import Header from "./Header";

const headerShellClass = (pathname: string | null) =>
  pathname === "/"
    ? "fixed bg-transparent top-0 left-0 w-full z-50"
    : "fixed bg-white top-0 left-0 w-full z-50";

const mainShellBgClass = (pathname: string | null) =>
  pathname === "/services" || pathname === "/contact" || pathname === "/clients"
    ? "bg-[#EFE4DB]"
    : "bg-white";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const headerWrapClass = headerShellClass(pathname);
  const mainBgClass = mainShellBgClass(pathname);
  useEffect(() => {
    initCursor();
    activeAnimation();
    window.addEventListener("scroll", activeAnimation);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const Splitting = require("splitting");
      if (Splitting) {
        window.Splitting = Splitting;
        Splitting();
      }
    }
  });

  useEffect(() => {
    const { jarallax, jarallaxVideo } = require("jarallax");
    jarallaxVideo();
    jarallax(document.querySelectorAll(".js-parallax"), {
      speed: 0.65,
      type: "scroll",
    });
  }, []);

  return (
    <Fragment>
      <ImageView />
      {/* Header */}
      <div className={headerWrapClass}>
        <Header />
      </div>
      <div className={`relative z-0 ${mainBgClass}`}>{children}</div>
    </Fragment>
  );
};

export default Layout;
