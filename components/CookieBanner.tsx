"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "fola_cookie_consent";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

function getStoredConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const { accepted, timestamp } = JSON.parse(raw);
    const expired = Date.now() - timestamp > ONE_YEAR_MS;
    return accepted && !expired;
  } catch {
    return false;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so banner doesn't flash on initial hydration
    const timer = setTimeout(() => {
      if (!getStoredConsent()) setVisible(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ accepted: true, timestamp: Date.now() })
    );
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          className={[
            // Positioning — bottom-right on desktop, bottom-full-width on mobile
            "fixed z-[9999] bottom-4 left-4 right-4",
            "sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-[360px]",
            // Card style
            "bg-[#545848] text-[#F4F1EA]",
            "rounded-2xl shadow-2xl shadow-black/30",
            "p-6 sm:p-7",
          ].join(" ")}
        >
          {/* Brand mark */}
          <p className="font-inter text-[10px] uppercase tracking-[0.14em] text-[#F4F1EA]/50 mb-3">
            FOLA PR
          </p>

          {/* Heading */}
          <h2
            id="cookie-banner-title"
            className="apris text-2xl sm:text-3xl text-[#F4F1EA] leading-tight mb-3"
          >
            We use cookies.
          </h2>

          {/* Body */}
          <p className="font-inter text-[13px] leading-[1.65] text-[#F4F1EA]/75 mb-5">
            Our site uses essential and analytics cookies to improve your experience.
            By continuing, you agree to our{" "}
            <Link
              href="/cookies"
              className="text-[#F4F1EA] underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Cookie &amp; Privacy Policy
            </Link>
            .
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={accept}
              className={[
                "flex-1 py-2.5 rounded-lg",
                "bg-[#F4F1EA] text-[#2E3228]",
                "font-inter text-[11px] uppercase tracking-[0.1em] font-medium",
                "hover:bg-white transition-colors",
              ].join(" ")}
            >
              Accept
            </button>
            <Link
              href="/cookies"
              className={[
                "flex-1 py-2.5 rounded-lg text-center",
                "border border-[#F4F1EA]/30 text-[#F4F1EA]",
                "font-inter text-[11px] uppercase tracking-[0.1em]",
                "hover:bg-[#F4F1EA]/10 transition-colors",
              ].join(" ")}
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
