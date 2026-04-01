"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our work", href: "/our-work" },
  { label: "Services", href: "/services" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
] as const;

const labelForPath = (pathname: string | null) => {
  switch (pathname) {
    case "/":
      return "Home";
    case "/about":
      return "About";
    case "/our-work":
      return "Our work";
    case "/services":
      return "Services";
    case "/clients":
      return "Clients";
    case "/contact":
      return "Contact";
    default:
      return "Menu";
  }
};

export default function Header() {
  const pathname = usePathname();
  const label = labelForPath(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[9999]">
      <div
        ref={rootRef}
        className="mx-auto flex w-full max-w-[1800px] items-center justify-between px-4 pt-4 sm:px-8 sm:pt-6 lg:px-10"
      >
        <summary
          // type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-[#11111114] px-2 py-2"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span className="inline-flex select-none items-center gap-2 rounded-lg border border-black/10 bg-white px-2 py-1 font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-sm backdrop-blur-sm transition-opacity hover:opacity-90">
            {label}
          </span>
          <span
            aria-hidden
            className="inline-block h-2 w-1 rounded-xl bg-[#1111113D]"
          />
        </summary>

        <Link
          href="/contact"
          className="inline-flex min-h-[36px] items-center justify-center rounded-lg bg-black px-2 py-1 font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-white no-underline shadow-sm transition-opacity hover:opacity-90 sm:min-h-[44px]"
        >
          Contact us
        </Link>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[10000]"
        >
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          <div className="relative h-full w-full bg-[#EFE4DB]">
            <div className="mx-auto flex h-full w-full max-w-[1800px] flex-col px-6 pb-10 pt-6 sm:px-10 sm:pt-8 lg:px-14">
              <div className="flex items-center justify-between">
                <p className="m-0 font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-black/70">
                  Menu
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-black/10 bg-white/80 px-4 font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-sm backdrop-blur-sm transition-opacity hover:opacity-90"
                >
                  Close
                </button>
              </div>

              <nav className="mt-10 flex flex-1 flex-col justify-start gap-6">
                {MENU_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="no-underline"
                  >
                    <span className="apris block text-[clamp(2.2rem,7vw,4.25rem)] font-light leading-[1.02] tracking-[-0.04em] text-black">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="pt-8">
                <p className="m-0 font-inter text-[10px] font-semibold uppercase tracking-[0.28em] text-black/55">
                  Lagos — London — New York
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
