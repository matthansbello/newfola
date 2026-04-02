"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MENU_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Projects", href: "/our-work" },
  { label: "Services", href: "/services" },
  { label: "Our Clients", href: "/clients" },
  { label: "Contact Us", href: "/contact" },
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
      return "Our Clients";
    case "/contact":
      return "Contact Us";
    default:
      return "Menu";
  }
};

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const barTextClass = isHome ? "text-white" : "text-black";
  const barBgClass = isHome ? "bg-transparent" : "bg-[#EFE4DB]";
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
    <header className={`fixed inset-x-0 top-0 z-[9999] ${barBgClass}`}>
      <div
        ref={rootRef}
        className="mx-auto flex w-full max-w-[1800px] items-center justify-between px-4 pt-4 sm:px-8 sm:pt-6 lg:px-10"
      >
        <summary
          // type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-0 py-2"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span
            className={`inline-flex select-none items-center gap-2 px-0 py-1 font-inter text-[11px] lg:text-[20px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm transition-opacity hover:opacity-90 ${barTextClass}`}
          >
            (MENU)
          </span>
        </summary>

        {isHome ? <Link href="/" className="no-underline"><img src="/footer.svg" alt="" className="h-auto w-[104px]" /></Link> : <Link href="/" className="no-underline"><img src="/folaLogoB.svg" alt="" className="h-auto w-[104px]" /></Link>}

        <Link
          href="/contact"
          className={`inline-flex min-h-[36px] items-center justify-center px-2 py-1 font-inter text-[11px] lg:text-[20px] font-semibold uppercase tracking-[0.18em] no-underline transition-opacity hover:opacity-90 sm:min-h-[44px] ${barTextClass}`}
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
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="m-0 px-0 font-inter text-[11px] lg:text-[20px] font-semibold uppercase tracking-[0.18em] text-black"
                >
                  Close
                </button>

                <img src="/folaLogoB.svg" alt="" className="h-auto w-[104px]" />

                <Link
                  href="/contact"
                  className="m-0 font-inter text-[11px] lg:text-[20px] font-semibold uppercase no-underline tracking-[0.18em] text-black"
                >
                  Contact Us
                </Link>
              </div>

              <nav className="mt-10 flex flex-1 flex-col justify-start gap-6">
                {MENU_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="no-underline text-[#201D1D]"
                  >
                    <span className="font-inter uppercase block text-[clamp(2.2rem,7vw,3.4rem)] font-normal hover:no-underline leading-[1.02] tracking-[-0.04em] text-[#201D1D]">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>

              <img src="/folaLogoB.svg" alt="" className="h-auto w-[800px]" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
