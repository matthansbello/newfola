"use client";

import Layout from "@/components/Layout";
import Image from "next/image";
import { useState, useEffect } from "react";

const HOME_IMAGES = [
  "/slider2.png",
  "/AndreaIyamah/WeWantFola-Project-Andrea1.webp",
  "/kenny/kenny-by-folapr6.jpg",
  "/AndreaIyamah/WeWantFola-Project-Andrea5.webp",
  "/LVI/Leading-Vibes-with-FOLAPR6.jpg",
  "/yt/Youtube.webp",
  "/project2.png"
];

const Index = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HOME_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto grid min-h-screen max-w-[1800px] grid-cols-1 lg:grid-cols-2">
          <section className="relative flex min-h-[55vh] flex-col justify-between px-6 pb-10 pt-24 sm:px-10 sm:pb-12 sm:pt-28 lg:min-h-screen lg:px-14 lg:pb-14 lg:pt-28">
            <div className="max-w-[560px]">
              <h1 className="m-0 apris text-[clamp(2.1rem,5.2vw,3.8rem)] font-light leading-[120%] tracking-[-0.03em] text-black">
                <span className="text-black/35">Elevating</span>
                <br />
                African Creativity
                <br />
                <span className="text-black/55">to the </span> Global Stage.
              </h1>

              <p className="mt-6 max-w-[420px] font-inter text-[13px] leading-[1.55] text-black/70 sm:text-[20px]">
                We are a full-service communications and experiential agency
                with a global footprint in Lagos, London, and New York.
              </p>
            </div>

            <div className="pointer-events-none select-none">
              <img src="/folaG.svg" alt="" />
            </div>
          </section>

          <section className="relative min-h-[45vh] bg-black lg:min-h-screen">
            {HOME_IMAGES.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`FOLA PR Slide ${index + 1}`}
                fill
                priority={index === 0}
                className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 960px) 100vw, 50vw"
              />
            ))}
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Index;
