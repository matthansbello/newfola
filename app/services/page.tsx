"use client";

import FadingText from "@/components/FadingText";
import FolaServices from "@/components/FolaServices";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import { useRef } from "react";

const items = [
  {
    id: "artx",
    title: "Art X Lagos",
    subtitle: "Global PR Rollout",
    img: "/assets/images/new/WeWantFola-Service4.png",
  },
  {
    id: "andrea",
    title: "Andrea Iyamah",
    subtitle: "Destination Influencer Retreat In Anguilla",
    img: "/assets/images/new/WeWantFola-Service5.png",
  },
  {
    id: "bnxn",
    title: "BNXN",
    subtitle: "Multi-Market Album Launch",
    img: "/assets/images/new/WeWantFola-Service6.png",
  },
  {
    id: "art",
    title: "Art X Lagos",
    subtitle: "Global PR Rollout",
    img: "/assets/images/new/WeWantFola-Service4.png",
  },
];

const Services = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    const step = card
      ? card.getBoundingClientRect().width + 24
      : el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };
  return (
    <>
      <Layout>
        <div className="bg-[#EFE4DB] pt-[100px] lg:pt-[120px]">
          <div className="wrapper relative w-full min-h-screen h-screen flex justify-start items-end z-20">
            <div className="bg-[#00000033] absolute w-full h-full z-10" />
            <div className="max-w-[1800px] w-full h-full px-5 md:px-10 mx-auto text-white z-20 pb-[100px] md:pb-[150px] relative">
              <div className="absolute bottom-[15%] md:bottom-[5%] max-w-full">
                <div className="apris text-[32px] md:text-[40px] lg:text-[64px] leading-[28px] md:leading-[35px] lg:leading-[56px]">
                  <FadingText className="" style="scale">
                    <h1 className="mr-4 font-light text-[32px] md:text-[40px] lg:text-[64px] leading-[28px] md:leading-[35px] lg:leading-[56px]">
                      Our Services
                    </h1>
                  </FadingText>
                </div>
                <FadingText duration={1} delay={1}>
                  <p className="font-inter w-full md:w-[90%] lg:w-[550px] text-[14px] md:text-[16px] lg:text-[18px] leading-[22px] md:leading-[26px] lg:leading-[30px] mt-[-10px] md:mt-[-20px]">
                    Our services are divided between two complementary
                    offerings:{" "}
                    <span className="font-bold">
                      Studio FOLA (experiential/events)
                    </span>{" "}
                    and{" "}
                    <span className="font-bold">
                      FOLA PR (public relations and brand communications)
                    </span>
                    . Together, these services provide a 360° approach to
                    elevating brands and projects, always with our signature
                    focus on African innovation and cultural relevance.
                  </p>
                </FadingText>
              </div>
            </div>
            <div
              className="absolute inset-0 bg-cover bg-fixed bg-center z-0"
              style={{
                backgroundImage: `url(/assets/images/services/FOLA-services-6.webp)`,
              }}
            />
          </div>
          <div className="container mx-auto flex flex-col w-full pt-28 lg:pt-[75px]">
            <div className="max-w-[1800px] px-10 mx-auto lg:flex justify-end items-center lg:gap-11 pb-[75px]">
              <FadingText>
                <div>
                  <p className="font-inter font-bold text-black text-lg uppercase">
                    Experiential & Events
                  </p>
                  {/* <h2 className="text-[#AFAFAF] font-light mt-[-30px] text-sm uppercase">
                    Studio FOLA -
                  </h2> */}
                </div>
              </FadingText>
              <FadingText delay={0.1}>
                <div>
                  <p className="font-inter font-bold text-black text-lg uppercase">
                    Communications & Brand Strategy
                  </p>
                  {/* <h2 className="text-[#AFAFAF] font-light mt-[-30px] text-sm uppercase">
                    FOLA PR -
                  </h2> */}
                </div>
              </FadingText>
            </div>

            <FolaServices />

            <div className="py-10 lg:py-[140px] lg:px-[200px] flex justify-center items-center">
              <img
                src="/assets/images/Leading-Vibes-with-FOLAPR4.jpg"
                className=""
                alt=""
              />
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Services;
