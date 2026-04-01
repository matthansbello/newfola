"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/assets/images/new/WeWantFola-Loader.webp",
  "/assets/images/new/WeWantFola-Loader2.webp",
  "/assets/images/new/WeWantFola-Our-Work4.webp",
  "/assets/images/new/blackimage.webp",
  "/assets/images/new/blackimage.webp",
];

interface HomeContentProps {
  onComplete?: () => void;
}

const HomeContent = ({ onComplete }: HomeContentProps) => {
  const [percent, setPercent] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [reverseText, setReverseText] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const textVariants = [
    { first: "FOLA", second: "" },
    { first: "FOLA", second: "PR" },
    { first: "STUDIO", second: "FOLA" },
  ];

  //  Handle text transitions - ensure equal timing for all variants
  useEffect(() => {
    if (reverseText) return; // Stop transitions when reversing

    const transitionDuration = 1800; // Each text displays for 1.8 seconds
    const timeouts: NodeJS.Timeout[] = [];

    // Transition to second variant (FOLA PR)
    const timeout1 = setTimeout(() => {
      if (!reverseText) {
        setTextIndex(1);
      }
    }, transitionDuration);
    timeouts.push(timeout1);

    // Transition to third variant (STUDIO FOLA)
    const timeout2 = setTimeout(() => {
      if (!reverseText) {
        setTextIndex(2);
      }
    }, transitionDuration * 2);
    timeouts.push(timeout2);

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [reverseText]);

  // ✅ Simulated loading percentage
  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          // Delay reverseText to ensure all text variants have time to display
          setTimeout(() => {
            setReverseText(true);
          }, 500);
        }
        return next;
      });
    }, 45); // Increased from 30ms to 45ms to give more time for text transitions

    const imageDelay = setTimeout(() => setShowImages(true), 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(imageDelay);
    };
  }, []);

  // ✅ Sequential image animation
  useEffect(() => {
    if (!showImages) return;

    let currentIndex = 0;
    const total = images.length;

    const animateNext = () => {
      if (currentIndex < total - 1) {
        setImageIndex((prev) => prev + 1);
        currentIndex++;
        setTimeout(animateNext, 900);
      } else {
        // ✅ Trigger slide-up once last image is visible
        setTimeout(() => {
          console.log("🟢 Triggering slide-up...");
          setIsSliding(true);
        }, 300);
      }
    };

    // Start animation chain
    setTimeout(animateNext, 900);

    return () => {
      currentIndex = total; // stops animation if unmounted
    };
  }, [showImages, onComplete]);

  // ✅ Detect when sliding state changes
  useEffect(() => {
    setTimeout(() => {
      if (isSliding) {
        onComplete?.();
      }
    }, 1100);
  }, [isSliding]);

  // ✅ Utility for staggered text animation
  const splitText = (text: string) =>
    text.split("").map((letter, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={reverseText ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        transition={{
          delay: reverseText ? (text.length - i) * 0.1 : i * 0.1,
          duration: 0.6,
        }}
        className="inline-block"
      >
        {letter}
      </motion.span>
    ));

  return (
    <motion.div
      className="flex flex-col justify-end w-full h-screen bg-black z-[9999] fixed inset-0"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 1.5 }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center font-druk p-3 lg:px-[60px] leading-[150px] pb-[80px]">
        {/* Animated Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${textIndex}`}
            initial={{ y: 20, opacity: 0 }}
            animate={
              reverseText ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 }
            } //  reverse motion
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[60px] lg:text-[70px] flex gap-2 items-baseline"
          >
            <span className="text-white text-[40px] ">
              {splitText(textVariants[textIndex].first)}
            </span>
            {textVariants[textIndex].second && (
              <span className="text-[#fff]  text-[40px]">
                {splitText(textVariants[textIndex].second)}
              </span>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Percentage Countdown */}
        <motion.div
          key="percent"
          initial={{ y: 20, opacity: 0 }}
          animate={reverseText ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-[40px] lg:text-[70px]"
        >
          {percent}%
        </motion.div>
      </div>

      {/* Center Image Slider */}
      {/* {showImages && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[310px] h-[400px] overflow-hidden">
          <div className="relative w-full h-full">
            {images.map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt="Loading"
                initial={{ y: "-100%", opacity: 1, scale: 1 }}
                animate={{
                  y: i <= imageIndex ? 0 : "-100%",
                  opacity: i <= imageIndex ? 1 : 1,
                }}
                transition={{ duration: 1.2 }}
                style={{
                  zIndex: (i + 1) * 10,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                className="object-cover"
              />
            ))}
          </div>
        </div>
      )} */}

      {/* Slide-Up Animation */}
      <AnimatePresence>
        {isSliding && (
          <motion.div
            key="slide-up"
            className="absolute top-0 left-0 right-0 bottom-0 z-[9999999] overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Background Image with Zoom */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url("/assets/images/home/FOLA-home-6.webp")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              // initial={{ scale: 1.5 }}
              // animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeOut" }}
            />

            {/* Dark Edges Overlay */}
            {/* Black Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#000000] to-[#00000000]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HomeContent;
