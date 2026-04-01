"use client";

import { useEffect, useState, startTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const MISSION =
  "We're a communications and experiential agency dedicated to bridging Africa and the world. We work across luxury, fashion, art, music, and lifestyle — challenging the status quo and crafting narratives that transcend borders.";

const MENU_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our work", href: "/our-work" },
  { label: "Service", href: "/services" },
  { label: "Our Clients", href: "/clients" },
  { label: "Contact Us", href: "/contact" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/wewantfola/",
    svg: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_6_149)">
          <path
            d="M8.86795 2.65752C8.52881 2.65752 8.25384 2.93249 8.25384 3.27162C8.25384 3.61075 8.52881 3.88573 8.86795 3.88573C9.20708 3.88573 9.48204 3.61075 9.48204 3.27162C9.48204 2.93249 9.20708 2.65752 8.86795 2.65752ZM6.14267 3.44577C4.72199 3.44577 3.56711 4.60065 3.56711 6.02133C3.56711 7.44201 4.72199 8.59689 6.14267 8.59689C7.56336 8.59689 8.71823 7.44201 8.71823 6.02133C8.71823 4.60065 7.56336 3.44577 6.14267 3.44577ZM6.14267 7.6681C5.23221 7.6681 4.49285 6.92874 4.49285 6.01828C4.49285 5.10782 5.23221 4.36845 6.14267 4.36845C7.05313 4.36845 7.7925 5.10782 7.7925 6.01828C7.7925 6.92874 7.05313 7.6681 6.14267 7.6681ZM11.3396 3.87962C11.3396 2.14424 9.93422 0.738831 8.19885 0.738831H4.05289C2.31752 0.738831 0.912109 2.14424 0.912109 3.87962V8.02557C0.912109 9.76094 2.31752 11.1664 4.05289 11.1664H8.19885C9.93422 11.1664 11.3396 9.76094 11.3396 8.02557V3.87962ZM10.3558 8.02557C10.3558 9.21711 9.39038 10.1826 8.19885 10.1826H4.05289C2.86135 10.1826 1.89589 9.21711 1.89589 8.02557V3.87962C1.89589 2.68807 2.86135 1.72262 4.05289 1.72262H8.19885C9.39038 1.72262 10.3558 2.68807 10.3558 3.87962V8.02557Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
        </g>
        <defs>
          <clipPath id="clip0_6_149">
            <rect width="12" height="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/fola-pr",
    svg: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.0068 6.65121V10.3016C11.0068 10.3913 10.935 10.4667 10.8417 10.4667H8.9573C8.86758 10.4667 8.7922 10.3949 8.7922 10.3016V6.90604C8.7922 6.01231 8.47274 5.40212 7.67233 5.40212C7.06214 5.40212 6.69962 5.81131 6.5381 6.20972C6.48067 6.35329 6.46632 6.5507 6.46632 6.74811V10.3016C6.46632 10.3913 6.39454 10.4667 6.30121 10.4667H4.41682C4.32708 10.4667 4.25171 10.3949 4.25171 10.3016C4.2553 9.39704 4.27324 5.01088 4.2553 3.97715C4.2553 3.88743 4.32708 3.81205 4.41682 3.81205H6.29762C6.38735 3.81205 6.46273 3.88383 6.46273 3.97715V4.75604C6.46273 4.75604 6.45196 4.7704 6.44837 4.77758H6.46273V4.75604C6.75706 4.30378 7.2811 3.65771 8.4548 3.65771C9.90848 3.65771 10.9996 4.60888 10.9996 6.65121H11.0068ZM0.98542 10.4667H2.86981C2.95955 10.4667 3.03492 10.3949 3.03492 10.3016V3.97715C3.03492 3.88743 2.96314 3.81205 2.86981 3.81205H0.98542C0.895688 3.81205 0.820312 3.88383 0.820312 3.97715V10.3016C0.820312 10.3913 0.892099 10.4667 0.98542 10.4667Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
        <path
          d="M1.85928 2.96868C2.51344 2.96868 3.04376 2.43838 3.04376 1.78421C3.04376 1.13004 2.51344 0.599731 1.85928 0.599731C1.20511 0.599731 0.674805 1.13004 0.674805 1.78421C0.674805 2.43838 1.20511 2.96868 1.85928 2.96868Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
      </svg>
    ),
  },
] as const;

export default function HeaderLegacy() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === "/";
  const isServices = pathname === "/services";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    if (isServices) window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isServices]);

  const bgClass = isHome
    ? "bg-transparent"
    : "bg-[#EFE4DB] border-b border-black/10";

  const textColor = "text-black";

  const barColor = "bg-black";

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const editorialMuted = !isHome ? "text-black/55" : "text-[#EFE4DB]";
  const editorialBody = !isHome ? "text-black/85" : "text-white/85";
  const editorialLink = !isHome ? "text-black" : "text-white";
  const editorialNavMuted = !isHome ? "text-black" : "text-white";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`${bgClass} relative z-[999] w-full transition-colors duration-300 ${
        isHome
          ? "h-auto py-6 lg:py-3"
          : "h-auto py-[5%] lg:py-[1%] bg-[#EFE4DB]"
      }`}
    >
      <div className="mx-auto max-w-[1800px] px-4 sm:px-4 lg:px-4">
        <div className="flex items-start justify-between gap-4 lg:hidden">
          <Link className="no-underline" href="/" prefetch>
            {isHome ? (
              <img src="/folaLogo.svg" alt="FOLA" className="h-auto w-[104px]" />
            ) : (
              <img
                src="/folaLogoB.svg"
                alt="FOLA"
                className="h-auto w-[104px]"
              />
            )}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[999] mt-2 flex h-11 w-11 shrink-0 items-center justify-center border border-black/10 bg-white/65 text-black shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur-lg transition-transform active:scale-95 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span
              className={`absolute h-[2px] w-5 bg-black transition-transform duration-300 ${
                isOpen ? "rotate-45" : "-translate-y-[6px]"
              }`}
            />
            <span
              className={`absolute h-[2px] w-5 bg-black transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-[2px] w-5 bg-black transition-transform duration-300 ${
                isOpen ? "-rotate-45" : "translate-y-[6px]"
              }`}
            />
          </button>
        </div>

        {!isOpen && (
          <div className="mt-8 lg:hidden">
            <p
              className={`max-w-[95%] font-inter text-[16px] font-normal leading-[1.2] tracking-[-0.02em] ${editorialBody}`}
            >
              {MISSION}
            </p>
          </div>
        )}

        {!isOpen && (
          <div className="hidden gap-6 lg:flex justify-between items-start xl:gap-y-10">
            <p
              className={`max-w-[35%] -mt-1 font-inter text-lg leading-[22px] ${editorialBody}`}
            >
              {MISSION}
            </p>

            <div className="">
              <Link className="no-underline" href="/" prefetch>
                {isHome ? (
                  <img
                    src="/folaLogo.svg"
                    alt=""
                    className="block h-auto max-h-[60px]"
                  />
                ) : (
                  <img
                    src="/folaLogoB.svg"
                    alt=""
                    className="block h-auto max-h-[60px]"
                  />
                )}
              </Link>
            </div>

            <div className="grid self-start grid-cols-2 gap-6 -mt-6 max-w-[35%]">
              <div className="min-w-0">
                <p
                  className={`mb-3  text-xs font-semibold text-[10px] uppercase tracking-[0.2em] ${editorialMuted}`}
                >
                  (MENU)
                </p>
                <nav
                  className={`flex flex-col gap-2 font-inter text-xs font-normal uppercase tracking-[0.12em] leading-[13px] ${editorialNavMuted}`}
                  aria-label="Primary"
                >
                  {MENU_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch
                      className={`inline-flex w-fit items-center gap-1 no-underline transition-opacity hover:opacity-70 ${editorialLink}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <ul className={`mt-6 flex flex-col gap-2 font-inter text-xs ${editorialLink}`}>
                  {SOCIAL_LINKS.map((item) => (
                    <li
                      key={item.href}
                      className="list-none flex items-center gap-2 justify-between"
                    >
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 no-underline transition-opacity hover:opacity-70 ${editorialLink}`}
                      >
                        {item.svg}
                        {item.label}
                      </a>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="15"
                          height="15"
                          rx="7.5"
                          fill={isHome ? "white" : "black"}
                          fillOpacity={isHome ? 0.8 : 1}
                        />
                        <g clipPath="url(#clip0_6_152)">
                          <path
                            d="M8.54716 7.84106L6.1084 10.2798"
                            stroke={isHome ? "black" : "white"}
                            strokeLinecap="round"
                          />
                          <path
                            d="M6.10547 5.4021L8.54443 7.84107"
                            stroke={isHome ? "black" : "white"}
                            strokeLinecap="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_6_152">
                            <rect
                              width="5"
                              height="7"
                              fill="white"
                              transform="translate(5 4)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0">
                <p
                  className={`mb-3  text-xs font-semibold text-[10px] uppercase tracking-[0.2em] ${editorialMuted}`}
                >
                  (ENQUIRES)
                </p>
                <a
                  href="mailto:hello@folapr.com"
                  className={`flex items-center gap-4 break-all font-inter text-xs font-normal uppercase tracking-[0.08em] no-underline transition-opacity hover:opacity-70 ${editorialLink} justify-between`}
                >
                  hello@folapr.com
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="15"
                      height="15"
                      rx="7.5"
                      fill={isHome ? "white" : "black"}
                      fillOpacity={isHome ? 0.8 : 1}
                    />
                    <g clipPath="url(#clip0_6_152)">
                      <path
                        d="M8.54716 7.84106L6.1084 10.2798"
                        stroke={isHome ? "black" : "white"}
                        strokeLinecap="round"
                      />
                      <path
                        d="M6.10547 5.4021L8.54443 7.84107"
                        stroke={isHome ? "black" : "white"}
                        strokeLinecap="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_6_152">
                        <rect
                          width="5"
                          height="7"
                          fill="white"
                          transform="translate(5 4)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 left-0 z-[9999] h-screen w-full overflow-hidden bg-white"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="container relative mx-auto h-[90vh]"
            >
              <div className="relative h-full w-full">
                <div className="ml-10 flex flex-col gap-[20px] bg-[#EFE4DB] px-0 pt-8 md:ml-[150px] lg:gap-[20px] lg:pt-6 xl:pt-10 2xl:ml-[157px] 2xl:gap-[40px] 2xl:px-[222px]">
                  {MENU_LINKS.map((item, i) => (
                    <Link
                      href={item.href}
                      key={item.href}
                      prefetch
                      onClick={(e) => {
                        e.preventDefault();
                        startTransition(() => {
                          setIsOpen(false);
                        });
                        router.push(item.href);
                      }}
                      className="m-0 p-0 no-underline"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: (i + 1) * 0.15,
                          ease: "easeOut",
                        }}
                        className="apris block text-[40px] font-normal leading-[1.12] tracking-[-0.04em] text-black transition-all duration-300 hover:scale-105 hover:tracking-wider lg:text-[50px] lg:leading-[1.1] 2xl:text-[82px] 2xl:leading-[1.08]"
                      >
                        {item.label}
                      </motion.div>
                    </Link>
                  ))}
                </div>

                <div className="absolute bottom-[20%] left-0 w-full px-4 lg:bottom-[15%] lg:px-4">
                  <div className="flex items-center justify-center gap-[9.76px] font-inter text-[13px] uppercase lg:justify-start lg:text-[18px]">
                    <div className="text-[16px] font-bold text-black lg:text-[20px] lg:font-medium">
                      Lagos
                    </div>
                    <div className="h-1 w-1 rounded-full bg-black" />
                    <div className="text-[16px] font-bold text-black lg:text-[20px] lg:font-medium">
                      London
                    </div>
                    <div className="h-1 w-1 rounded-full bg-black" />
                    <div className="text-[16px] font-bold text-black lg:text-[20px] lg:font-medium">
                      New York
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isHome && (
        <div className="pointer-events-none absolute inset-x-0 -bottom-20 h-20 bg-gradient-to-b from-[#EFE4DB] via-[#EFE4DB70] to-transparent" />
      )}
    </motion.div>
  );
}

