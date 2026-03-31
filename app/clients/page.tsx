"use client";

import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import { useState } from "react";
import { motion } from "framer-motion";
import { Client } from "@/types";

const categories = [
  "All Clients",
  "Fashion & Luxury",
  "Art & Culture",
  "Music & Entertainment",
];

const clients: Client[] = [
  {
    name: "ALÁRA",
    category: "Art & Culture",
    logo: "/assets/images/clients/715-logo.png",
  },
  {
    name: "amg",
    category: "Art & Culture",
    logo: "/assets/images/clients/art/fola-art-2.webp",
  },
  {
    name: "7fifteen",
    category: "Music & Entertainment",
    logo: "/assets/images/clients/music/fola-music-2.webp",
  },
  {
    name: "amiri",
    category: "Art & Culture",
    logo: "/assets/images/clients/BHLA-Logo.png",
  },
  {
    name: "vicante",
    category: "Art & Culture",
    logo: "/assets/images/clients/dye-lab.png",
  },
  {
    name: "basma",
    category: "Music & Entertainment",
    logo: "/assets/images/clients/Fatherland.png",
  },
  {
    name: "ff",
    category: "Fashion & Luxury",
    logo: "/assets/images/clients/fashion/fola-fashion-2.webp",
  },
  {
    name: "torlowe",
    category: "Art & Culture",
    logo: "/assets/images/clients/art/fola-art-7.webp",
  },
  {
    name: "fgi",
    category: "Art & Culture",
    logo: "/assets/images/clients/art/fola-art-9.webp",
  },
  {
    name: "htl",
    category: "Art & Culture",
    logo: "/assets/images/clients/art/fola-art-10.webp",
  },
  {
    name: "fatherland",
    category: "Music & Entertainment",
    logo: "/assets/images/clients/music/fola-music-3.webp",
  },
  {
    name: "hertunba",
    category: "Art & Culture",
    logo: "/assets/images/clients/art/fola-art-11.webp",
  },
  {
    name: "victony",
    category: "Art & Culture",
    logo: "/assets/images/clients/art/fola-art-12.webp",
  },
  {
    name: "loewe",
    category: "Art & Culture",
    logo: "/assets/images/clients/art/fola-art-13.webp",
  },
  {
    name: "flytime",
    category: "Art & Culture",
    logo: "/assets/images/clients/art/fola-art-8.webp",
  },
  {
    name: "sex&carvier",
    category: "Art & Culture",
    logo: "/assets/images/clients/art/fola-art-14.webp",
  },
  {
    name: "shine",
    category: "Fashion & Luxury",
    logo: "/assets/images/clients/fashion/fola-fashion-3.webp",
  },
  {
    name: "taupe",
    category: "Music & Entertainment",
    logo: "/assets/images/clients/music/fola-music-1.webp",
  },
  {
    name: "andrea",
    category: "Art & Culture",
    logo: "/assets/images/clients/art/fola-art-4.webp",
  },
  {
    name: "showdemcamp",
    category: "Music & Entertainment",
    logo: "/assets/images/clients/showdemcamp.png",
  },
  // {
  //   name: "amg",
  //   category: "Art & Culture",
  //   logo: "/assets/images/clients/AMG.png",
  // },
  {
    name: "axl",
    category: "Art & Culture",
    logo: "/assets/images/clients/AXL.png",
  },
  {
    name: "canex",
    category: "Art & Culture",
    logo: "/assets/images/clients/canex.png",
  },
  {
    name: "felak",
    category: "Music & Entertainment",
    logo: "/assets/images/clients/felak.png",
  },
  {
    name: "gitex",
    category: "Music & Entertainment",
    logo: "/assets/images/clients/gitexx.png",
  },
  {
    name: "htl",
    category: "Music & Entertainment",
    logo: "/assets/images/clients/htl.png",
  },
  {
    name: "Nahous",
    category: "Music & Entertainment",
    logo: "/assets/images/clients/Nahous.png",
  },
  {
    name: "nitda",
    category: "Art & Culture",
    logo: "/assets/images/clients/nitda.png",
  },
  {
    name: "nitfLogo",
    category: "Art & Culture",
    logo: "/assets/images/clients/nitfLogo.png",
  },
  {
    name: "youtube",
    category: "Art & Culture",
    logo: "/assets/images/clients/youtube.png",
  },
  {
    name: "victony",
    category: "Art & Culture",
    logo: "/assets/images/clients/fola-client-12.svg",
  },
];

const Clients = () => {
  const [activeCategory, setActiveCategory] = useState("All Clients");

  return (
    <>
      <Layout>
        <div className="container mx-auto bg-[#EFE4DB]">
          <div className="flex flex-col items-center justify-between gap-[150px] pt-[140px] lg:flex-row lg:pt-[220px]">
            <div className="lg:w-[20%] text-black overflow-hidden flex flex-col gap-[60px]">
              <div className="relative pt-3 overflow-hidden lg:overflow-hidden">
                <motion.h1
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut" as const,
                  }}
                  className="apris text-[50px] font-normal leading-[45px] text-black lg:text-[74px] lg:leading-[66px]"
                >
                  Selected Clients
                </motion.h1>
              </div>
              <nav className="flex flex-col items-start font-inter text-[24px] gap-[40px] leading-[0px] pb-5">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`group py-2 cursor-pointer relative inline-block text-left transition-all ${
                      activeCategory === cat
                        ? "font-bold text-black"
                        : "text-gray-400"
                    }`}
                  >
                    {cat}
                    <span className="absolute left-0 -bottom-3 h-[2px] w-full origin-left scale-x-0 opacity-0 bg-black transition-all duration-1000 group-hover:scale-x-100 group-hover:opacity-100" />
                  </div>
                ))}
              </nav>
            </div>
            <div className="grid grid-cols-2 place-items-center lg:grid-cols-5 gap-y-16 gap-x-8 lg:gap-x-0 lg:w-[80%]">
              {clients.map((client) => {
                const isActive =
                  activeCategory === "All Clients" ||
                  client.category === activeCategory;
                return (
                  <img
                    key={client.name}
                    src={client.logo}
                    alt={client.name}
                    className={`transition-opacity grayscale h-8 duration-300 ${
                      isActive ? "opacity-100" : "opacity-10"
                    }`}
                  />
                );
              })}
            </div>
          </div>
          <div className="my-[90px]">
            <div className="pt-3 text-center lg:text-left container mx-auto border-t-[2px] border-t-black flex justify-end">
              <p className="text-black leading-[30px] font-inter text-[20px] ">
                Our work extends to select global brands seeking <br />{" "}
                authentic connections with African audiences.
              </p>
            </div>
          </div>
        </div>
          <Footer />
      </Layout>
    </>
  );
};

export default Clients;
