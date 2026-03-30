"use client";

import React, { useRef, RefObject } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import FadingText from "./FadingText";

interface Service {
  id: number;
  ref?: RefObject<HTMLDivElement | null>;
  content: (overlayOpacity?: MotionValue<number>) => React.ReactNode;
}

interface StackedSectionProps {
  id: number;
  sectionRef?: RefObject<HTMLDivElement | null>;
  renderContent: (overlayOpacity?: any) => React.ReactNode;
  index: number;
  totalCards: number;
  overlayOpacity?: MotionValue<number>;
}

const FolaServices: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);

  // Track scroll progress for the second section
  const { scrollYProgress: section2Progress } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"],
  });

  // Overlay opacity = 0 → 1 → 0 as section 2 scrolls through
  const overlayOpacity = useTransform(section2Progress, [0, 0.5, 1], [0, 1, 0]);

  const services: Service[] = [
    {
      id: 1,
      content: (overlayOpacity?: MotionValue<number>) => (
        <div className="flex flex-col lg:flex-row justify-between h-auto text-black items-start gap-5 lg:gap-10 py-[50px] relative">
          <div className="lg:w-[55%] flex flex-col items-start gap-[100px]">
            <div className="flex flex-col lg:flex-row justify-start items-start gap-[30px] lg:gap-[65px]">
              <FadingText>
                <h2 className="apris text-[40px] font-normal italic leading-[34px] text-black whitespace-nowrap lg:text-[62px] lg:leading-[62px]">
                  FOLA PR
                </h2>
              </FadingText>
              <div className="flex-1">
                {/* <h3 className="uppercase text-black text-[18px] font-inter font-bold mb-2">
                  Experiential & Events
                </h3> */}
                <h3 className="uppercase text-black text-[18px] font-inter font-bold">
                  Communications & Brand Strategy
                </h3>
                <p className="lg:text-[18px] text-black leading-[1.6] font-inter mb-3">
                  We offer end-to-end communications strategies that place our
                  clients on the world stage. Our work spans:
                </p>
                <div className="space-y-1">
                  {[
                    "Global PR & Media Relations",
                    "Influencer & Partnership Strategies",
                    "Brand Positioning & Narrative Development",
                    "Event PR & Launch Campaigns",
                    // "Entertainment PR",
                  ].map((text, i) => (
                    <div key={i}>
                      <div className="flex justify-start items-center gap-2 pb-1">
                        <FadingText delay={0.1 * i}>
                          <img
                            src="/assets/images/new/arrow.svg"
                            alt="arrow"
                            className="w-3 h-3 flex-shrink-0"
                          />
                        </FadingText>
                        <FadingText delay={0.1 * i}>
                          <p className="lg:text-[18px] font-bold uppercase leading-[1.3]">
                            {text}
                          </p>
                        </FadingText>
                      </div>
                      <div className="bg-[#ECECEC] h-[1px] w-full" />
                    </div>
                  ))}
                </div>
              </div>
              {/* <div>
                <h3 className="uppercase text-black text-[18px] font-inter font-bold">
                  Communications & Brand Strategy
                </h3>
                <p className="lg:text-[18px] text-black leading-[30px] font-inter pt-2">
                  Studio FOLA curates immersive, high-impact experiences that
                  unite creative leaders, brands, and audiences in unforgettable
                  moments. We design and produce cultural gatherings, brand
                  activations, and private events that celebrate African
                  artistry and innovation.
                </p>
              </div> */}
            </div>
            <div className="w-full flex justify-end items-center">
              <img
                src="/assets/images/new/WeWantFola-Website1.webp"
                className="lg:w-[380px]"
                alt="FOLA PR visual"
              />
            </div>
          </div>
          <div className="lg:w-[45%]">
            <img
              src="/assets/images/services/FOLA-services-2.webp"
              className="w-full"
              alt="FOLA PR services"
            />
          </div>

          {/* ✅ Black overlay triggered by section 2 scroll */}
          {overlayOpacity && (
            <motion.div
              style={{ opacity: overlayOpacity, backgroundColor: "#b8b8b8" }}
              className="absolute inset-0 w-full pointer-events-none"
            />
          )}
        </div>
      ),
    },
    {
      id: 2,
      ref: section2Ref,
      content: () => (
        <div className="flex flex-col lg:flex-row justify-between text-black items-start gap-8 lg:gap-12 lg:py-[50px]">
          <div className="lg:w-[55%] flex flex-col items-start gap-6 lg:gap-8">
            <div className="flex flex-col lg:flex-row justify-start items-start gap-4 lg:gap-6">
              <FadingText>
                <h2 className="apris text-[40px] font-normal italic leading-[1.1] tracking-[-0.02em] text-black whitespace-nowrap lg:text-[62px] lg:leading-[86px]">
                  Studio FOLA
                </h2>
              </FadingText>
              {/* <div className="flex-1">
                <h3 className="uppercase text-black text-[18px] font-inter font-bold mb-2">
                  Experiential & Events
                </h3>
                <p className="lg:text-[18px] text-black leading-[1.6] font-inter mb-3">
                  We offer end-to-end communications strategies that place our
                  clients on the world stage. Our work spans:
                </p>
                <div className="space-y-1">
                  {[
                    "Global PR & Media Relations",
                    "Influencer & Partnership Strategies",
                    "Brand Positioning & Narrative Development",
                    "Event PR & Launch Campaigns",
                    "Entertainment PR",
                  ].map((text, i) => (
                    <div key={i}>
                      <div className="flex justify-start items-center gap-2 pb-1">
                        <FadingText delay={0.1 * i}>
                          <img
                            src="/assets/images/new/arrow.svg"
                            alt="arrow"
                            className="w-3 h-3 flex-shrink-0"
                          />
                        </FadingText>
                        <FadingText delay={0.1 * i}>
                          <p className="lg:text-[18px] font-bold uppercase leading-[1.3]">
                            {text}
                          </p>
                        </FadingText>
                      </div>
                      <div className="bg-[#ECECEC] h-[1px] w-full" />
                    </div>
                  ))}
                </div>
              </div> */}
              <div>
                {/* <h3 className="uppercase text-black text-[18px] font-inter font-bold">
                  Communications & Brand Strategy
                </h3> */}
                <h3 className="uppercase text-black text-[18px] font-inter font-bold mb-2">
                  Experiential & Events
                </h3>
                <p className="lg:text-[18px] text-black leading-[30px] font-inter pt-2">
                  Studio FOLA curates immersive, high-impact experiences that
                  unite creative leaders, brands, and audiences in unforgettable
                  moments. We design and produce cultural gatherings, brand
                  activations, and private events that celebrate African
                  artistry and innovation.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-[45%] mt-8 lg:mt-0">
            <img
              src="/assets/images/services/FOLA-New-Services.webp"
              className="w-full"
              alt="Studio FOLA visual"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen my-5">
      {services.map((section, index) => (
        <StackedSection
          key={section.id}
          id={section.id}
          sectionRef={section.ref}
          renderContent={section.content}
          index={index}
          totalCards={services.length}
          overlayOpacity={overlayOpacity}
        />
      ))}
    </div>
  );
};

const StackedSection: React.FC<StackedSectionProps> = ({
  id,
  sectionRef,
  renderContent,
  index,
  overlayOpacity,
}) => {
  const localRef = useRef<HTMLDivElement | null>(null);
  const ref = sectionRef || localRef;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Slight scale for smooth stacking
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  return (
    <div
      ref={ref}
      className="h-auto flex items-center justify-center bg-white"
      style={{
        position: "sticky",
        top: 0,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity: 1, // ✅ Always fully visible (no fade-in white)
          position: "relative",
        }}
        className="w-full"
      >
        {renderContent(id === 1 ? overlayOpacity : undefined)}
      </motion.div>
    </div>
  );
};

export default FolaServices;
