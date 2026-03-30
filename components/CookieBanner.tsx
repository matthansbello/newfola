"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the cookie consent is already stored and still valid
    const consentRecord = localStorage.getItem("fola_cookie_consent");
    
    if (consentRecord) {
      const { timestamp } = JSON.parse(consentRecord);
      const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
      
      // If the record is older than 1 year, we show the banner again
      if (Date.now() - timestamp > oneYearInMs) {
        setShowBanner(true);
      }
    } else {
      // No record exists
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    const record = {
      timestamp: Date.now(),
      status: "accepted",
    };
    localStorage.setItem("fola_cookie_consent", JSON.stringify(record));
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth luxurious easing
          className="fixed bottom-0 left-0 z-[9999] w-full p-4 sm:p-6 md:p-8 pointer-events-none"
        >
          <div className="mx-auto flex w-full max-w-[1800px] justify-end items-end">
            <div className="pointer-events-auto flex w-full md:w-[380px] lg:w-[420px] flex-col gap-5 rounded-none bg-[#545848] px-6 py-6 shadow-2xl ring-1 ring-[#F4F1EA]/20">
              <p className="m-0 font-inter text-[13px] leading-[1.6] text-[#F4F1EA]/90 sm:text-[14px]">
                FOLA PR uses cookies to ensure you get the best experience on our website. 
                By continuing to explore, you agree to our{" "}
                <Link href="/cookies" className="underline hover:text-[#F4F1EA] transition-colors">
                  Cookies Policy
                </Link>.
              </p>
              <div className="flex shrink-0">
                <button
                  onClick={handleAccept}
                  className="w-full sm:w-auto rounded-none border border-[#F4F1EA] bg-[#F4F1EA] px-8 py-2.5 font-inter text-[11px] uppercase tracking-[0.08em] font-medium text-[#2E3228] transition-colors hover:bg-transparent hover:text-[#F4F1EA]"
                >
                  Agree
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
