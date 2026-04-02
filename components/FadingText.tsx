"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface FadingTextProps {
  text?: string;
  children?: ReactNode;
  className?: string;
  style?: "character" | "wave" | "glow" | "scale" | "slide";
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  fontFamily?: string;
  delay?: number; // 👈 Added delay prop
}

const FadingText: React.FC<FadingTextProps> = ({
  text,
  children,
  className = "",
  style = "scale",
  staggerDelay = 0.03,
  duration = 0.4,
  once = false,
  fontFamily,
  delay = 0, // 👈 Default to no delay
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px", once });
  const [displayedText, setDisplayedText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);

  const isStringChild = typeof children === "string";
  const fullText =
    text || (isStringChild ? (children as string) : undefined) || "";

  useEffect(() => {
    if (isInView && !hasAnimated && fullText) {
      const timer = setTimeout(() => {
        let i = 0;
        setDisplayedText("");
        const interval = setInterval(() => {
          setDisplayedText(fullText.slice(0, i + 1));
          i++;
          if (i >= fullText.length) {
            clearInterval(interval);
            setHasAnimated(true);
          }
        }, 50);
      }, delay * 1000); // 👈 Apply delay before typing starts

      return () => clearTimeout(timer);
    }
  }, [isInView, fullText, hasAnimated, delay]);

  const getVariant = () => {
    switch (style) {
      case "character":
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration, ease: "easeOut", delay },
        };
      case "wave":
        return {
          initial: { opacity: 0, filter: "blur(10px)" },
          animate: { opacity: 1, filter: "blur(0px)" },
          transition: { duration: 0.5, ease: "easeOut", delay },
        };
      case "glow":
        return {
          initial: { opacity: 0, textShadow: "0 0 0px rgba(59,130,246,0)" },
          animate: { opacity: 1, textShadow: "0 0 20px rgba(59,130,246,0.8)" },
          transition: { duration: 0.4, delay },
        };
      case "slide":
        return {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, ease: "easeOut", delay },
        };
      case "scale":
      default:
        return {
          initial: { opacity: 0, scale: 0.5, filter: "blur(8px)" },
          animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
          transition: {
            duration,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay,
          },
        };
    }
  };

  const variant = getVariant();

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={variant.initial}
      animate={isInView ? variant.animate : variant.initial}
      transition={variant.transition as any}
      style={{ display: "inline-block", ...(fontFamily ? { fontFamily } : {}) }}
    >
      {fullText
        ? displayedText.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={variant.initial}
              animate={variant.animate}
              transition={{
                duration: variant.transition?.duration || 0.4,
                ease: (variant.transition?.ease as any) || "easeOut",
                delay: i * staggerDelay, // 👈 delay applied per character relative to start
              }}
              className="inline-block"
              style={fontFamily ? { fontFamily } : undefined}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))
        : children}
    </motion.span>
  );
};

export default FadingText;
