"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Index from "../app/page";

const images = [
  "/assets/images/new/WeWantFola-Loader.webp",
  "/assets/images/new/WeWantFola-Loader2.webp",
  "/assets/images/new/WeWantFola-Gallery4.webp",
  "/assets/images/new/blackimage.webp",
  "/assets/images/new/blackimage.webp",
];

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [percent, setPercent] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [reverseText, setReverseText] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  const textVariants = [
    { first: "FOLA", second: "" },
    { first: "FOLA", second: "PR" },
    { first: "FOLA", second: "STUDIO" },
  ];

  //  Handle text transitions
  useEffect(() => {
    if (reverseText) return; // Stop transitions when reversing
    
    const textInterval = setInterval(() => {
      setTextIndex((prev) => {
        const next = (prev + 1) % textVariants.length;
        return next;
      });
    }, 1500); // Change text every 1.5 seconds

    return () => clearInterval(textInterval);
  }, [reverseText]);

  //  Handle percentage loading (visual only)
  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setReverseText(true); //  trigger reverse when 100%
        }
        return next;
      });
    }, 30);

    const imageDelay = setTimeout(() => setShowImages(true), 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(imageDelay);
    };
  }, []);

  //  Handle image sequence — after last image, trigger slide-up
  useEffect(() => {
    if (!showImages) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < images.length) {
        setImageIndex(index);
      } else {
        clearInterval(interval);
        //  Delay a bit before triggering the slide-up animation
        setTimeout(() => {
          setIsSliding(true);
          onComplete?.();
        }, 100);
      }
    }, 900);

    return () => clearInterval(interval);
  }, [showImages, onComplete]);

  const splitText = (text: string) => {
    return text.split("").map((letter, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={
          reverseText
            ? { opacity: 0, y: 20 } //  reverse animation when 100%
            : { opacity: 1, y: 0 }
        }
        transition={{
          delay: reverseText ? (text.length - i) * 0.1 : i * 0.1, // reverse delay order
          duration: 0.6,
        }}
        className="inline-block"
      >
        {letter}
      </motion.span>
    ));
  };

  return (
    <motion.div
      className="flex flex-col justify-end w-full h-screen bg-black z-[9999]"
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
            <span className="text-white text-[40px] ">{splitText(textVariants[textIndex].first)}</span>
            {textVariants[textIndex].second && (
              <span className="text-[#fff] font-canela text-[40px]">
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
      {showImages && (
        <div className="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 w-[310px] h-[400px] overflow-hidden">
          <div className="relative w-full h-full">
            {images.map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt="Product Image Slider"
                initial={{ y: "-100%", opacity: 1, scale: 1 }}
                animate={{
                  y: i <= imageIndex ? 0 : "-100%",
                  opacity: i <= imageIndex ? 1 : 1,
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0,
                }}
                exit={{
                  scale: i <= imageIndex ? 0.8 : 1.5,
                }}
                style={{
                  zIndex: (i + 1) * 10,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                className="relative w-full h-full bg-black overflow-hidden"
              />
            ))}
          </div>
        </div>
      )}

      {/* Slide-Up Animation (Triggered after images finish) */}
      {isSliding && (
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 z-[9999999] overflow-hidden"
          initial={{ y: "100%" }} // start below the screen
          animate={{ y: "0%" }} // slides up to cover
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Background Image with Zoom-in effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("/assets/images/home/FOLA-home-6.webp")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
          ></motion.div>

          {/* Cinematic Dark Edges (Vignette) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.7) 100%)",
            }}
          ></div>
          <Index />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Preloader;
