"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const indexLinks = [
  { label: "Home", href: "/" },
  { label: "Our work", href: "/our-work" },
  { label: "About", href: "/about" },
] as const;

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/fola-pr" },
  { label: "Instagram", href: "https://www.instagram.com/wewantfola/" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#545848] text-[#F4F1EA]">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col px-4 py-10 sm:min-h-[55vh] sm:px-8 md:px-10 md:py-12 lg:min-h-[65vh] lg:px-10 lg:py-10 xl:px-12 xl:min-h-[70vh]">
        <div className="grid flex-1 gap-10 sm:gap-12 lg:grid-cols-[1.2fr_0.9fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-w-0 max-w-[660px]"
          >
            <p className="m-0 max-w-[560px] font-inter text-[15px] leading-[1.55] tracking-[-0.01em] text-[#F4F1EA]/90 sm:text-[16px] md:text-lg md:leading-[30px]">
              FOLA PR: Curators of cross-continental connection. We are an
              elevated communications and experiential agency bridging the gap
              between Africa's vibrant pulse and the global stage. Pioneers in
              luxury, fashion, art, music, and lifestyle, we dismantle the
              conventional, shaping narratives that resonate globally and defy
              boundaries.
            </p>

            <p className="mb-0 mt-8 font-inter text-[12px] uppercase tracking-[0.08em] text-[#F4F1EA]/70">
              Get in touch
            </p>
            <p className="mb-0 mt-6 font-inter text-[17px] leading-snug tracking-[-0.03em] text-[#F4F1EA] sm:mt-8 sm:text-[20px] sm:leading-[28px] md:text-[24px] md:leading-[30px]">
              We would love to hear from you.
              <br />
              Let&apos;s work - together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-8 lg:justify-self-end lg:gap-12"
          >
            <div className="min-w-0">
              <p className="mb-3 mt-0 font-inter text-[11px] uppercase tracking-[0.08em] text-[#F4F1EA]/70 sm:text-[12px]">
                Index
              </p>
              <nav className="flex flex-col gap-2" aria-label="Footer Index">
                {indexLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-fit max-w-full break-words py-0.5 font-inter text-[17px] leading-[1.35] text-[#F4F1EA] no-underline transition-opacity hover:opacity-70 sm:text-[18px]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="min-w-0">
              <p className="mb-3 mt-0 font-inter text-[11px] uppercase tracking-[0.08em] text-[#F4F1EA]/70 sm:text-[12px]">
                Socials
              </p>
              <div className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit max-w-full break-words py-0.5 font-inter text-[17px] leading-[1.35] text-[#F4F1EA] no-underline transition-opacity hover:opacity-70 sm:text-[18px]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <p className="mb-0 mt-6 font-inter text-[11px] uppercase tracking-[0.08em] text-[#F4F1EA]/70 sm:mt-7 sm:text-[12px]">
                Business Inquiries
              </p>
              <a
                href="mailto:hello@folapr.com"
                className="mt-2 inline-block max-w-full break-all font-inter text-[17px] leading-snug text-[#F4F1EA] no-underline transition-opacity hover:opacity-70 sm:mt-3 sm:break-normal sm:text-[19px] md:text-[20px] md:leading-[1.3]"
              >
                hello@folapr.com
              </a>
              <div className="mt-5">
                <Link
                  href="/contact"
                  className="inline-flex w-full min-h-[44px] items-center justify-center gap-3 rounded-lg border border-[#F4F1EA]/30 bg-[#F4F1EA] px-5 py-2.5 font-inter text-[12px] uppercase tracking-[0.08em] text-[#2E3228] no-underline transition-opacity hover:opacity-80 sm:w-fit whitespace-nowrap sm:justify-start sm:py-2"
                >
                  Contact Us
                  <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-[#F4F1EA]/10 pt-8 sm:mt-12 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:pt-6">
          <img
            src="/footer.svg"
            alt=""
            className="h-auto w-full max-w-[220px] object-contain object-left sm:max-w-[280px] md:max-w-[340px] lg:max-w-[min(100%,420px)]"
          />
          <div className="mb-0 flex flex-wrap items-center gap-x-6 gap-y-3 font-inter text-[11px] uppercase tracking-[0.08em] text-[#F4F1EA]/80 sm:mb-2 sm:gap-x-10 sm:text-[12px]">
            <Link
              href="/cookies"
              className="inline-flex min-h-[44px] items-center text-inherit no-underline hover:opacity-70 sm:min-h-0"
            >
              Cookies
            </Link>
            <Link
              href="/terms"
              className="inline-flex min-h-[44px] items-center text-inherit no-underline hover:opacity-70 sm:min-h-0"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
