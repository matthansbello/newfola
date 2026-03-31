"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import Layout from "@/components/Layout";
import { home1SliderProps } from "@/lib/sliderProps";
import { motion } from "framer-motion";
import FadingText from "@/components/FadingText";
import HomeContent from "@/components/HomeContent";

type HeroSlide = {
  id: number;
  /** Shown from `lg` breakpoint and up */
  image: string;
  /** Optional — shown below `lg`; falls back to `image` when omitted */
  imageMobile?: string;
  color: string;
};

const heroSlides: HeroSlide[] = [
  {
    id: 0,
    image: "newBg.png",
    imageMobile: "newBg-mobile.png",
    color: "dark",
  },
  {
    id: 1,
    image: "assets/images/home/FOLA-home-6.webp",
    color: "white",
  },
  {
    id: 4,
    image: "assets/images/home/FOLA-home-7.webp",
    color: "white",
  },
  {
    id: 2,
    image: "assets/images/home/FOLA-home-5.webp",
    color: "white",
  },
  {
    id: 3,
    image: "assets/images/home/FOLA-home-4.webp",
    color: "white",
  },
];

const LegacyHome = () => {
  const [showPreloader] = useState(false);

  return (
    <>
      {/* Preloader */}
      {/* {showPreloader && (
        <HomeContent onComplete={() => setShowPreloader(false)} />
      )} */}

      {/* Main Home Page Content */}
      {/* {!showPreloader && ( */}
      <>
        <Layout>
          <div className="relative h-screen min-h-screen overflow-hidden bg-black no-scrollbar">
            <Swiper
              {...home1SliderProps}
              className="hero-main-slider absolute inset-0 z-0 h-full w-full"
            >
              {heroSlides.map((slide) => (
                <SwiperSlide key={slide.id} className="relative">
                  {slide.imageMobile ? (
                    <>
                      <div
                        className="absolute inset-0 z-0 bg-cover bg-center zoom-slow lg:hidden"
                        style={{
                          backgroundImage: `url(${slide.imageMobile})`,
                        }}
                      />
                      <div
                        className="absolute inset-0 z-0 hidden bg-cover bg-center zoom-slow lg:block"
                        style={{
                          backgroundImage: `url(${slide.image})`,
                        }}
                      />
                    </>
                  ) : (
                    <div
                      className="absolute inset-0 z-0 bg-cover bg-center zoom-slow"
                      style={{
                        backgroundImage: `url(${slide.image})`,
                      }}
                    />
                  )}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent" />

                  <div className="slide-titles">
                    <div className="w-full flex justify-center items-center" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-end px-4 pb-4 sm:px-4 sm:pb-10 lg:px-12 lg:pb-14 xl:px-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
                className="pointer-events-none mx-auto w-full max-w-5xl text-center"
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white"
                  >
                    <span className="lg:flex hidden flex-col items-center gap-1 lg:gap-2">
                      <FadingText
                        text="Elevating African Creativity"
                        style="scale"
                        className="apris text-[1.65rem] font-medium leading-[1.12] tracking-[-0.04em] text-white sm:text-4xl md:text-5xl lg:text-[3rem] lg:leading-[1.08] xl:text-[50px]"
                      />
                      <FadingText
                        text="to the Global Stage."
                        style="scale"
                        className="apris text-[1.65rem] font-medium leading-[1.12] tracking-[-0.04em] text-white sm:text-4xl md:text-5xl lg:text-[3rem] lg:leading-[1.08] xl:text-[50px]"
                      />
                    </span>
                    <span className="lg:hidden flex">
                      <p className="apris text-left text-[2rem] font-medium leading-[1.12] tracking-[-0.04em] text-white sm:text-4xl">
                        Elevating African <br /> Creativity to the Global <br />{" "}
                        Stage.
                      </p>
                    </span>
                  </motion.h1>
                </AnimatePresence>

                <p className="mt-2 font-inter text-[10px] font-normal uppercase tracking-[0.28em] text-[#EFE4DBCC] sm:text-[12px] lg:mt-5">
                  Lagos — London — New York
                </p>
              </motion.div>
            </div>
          </div>
        </Layout>
      </>
      {/* // )} */}
    </>
  );
};

export default LegacyHome;

