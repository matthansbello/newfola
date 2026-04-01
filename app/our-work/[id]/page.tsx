"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects } from "../page";
import { useParams } from "next/navigation";

export default function ProjectDetails() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const project = projects.find((p) => p.id === id);

  const refMobile = useRef<HTMLDivElement>(null);
  const refDesktop = useRef<HTMLDivElement>(null);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const { scrollYProgress: progressMobile } = useScroll({
    target: hydrated ? refMobile : undefined,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: progressDesktop } = useScroll({
    target: hydrated ? refDesktop : undefined,
    offset: ["start end", "end start"],
  });

  // transforms
  const scale3Mobile = useTransform(progressMobile, [0.9, 1], [1, 0.6]);
  const height3Mobile = useTransform(
    progressMobile,
    [0, 1],
    ["250px", "180px"]
  );
  const width3Mobile = useTransform(progressMobile, [0, 1], ["100vw", "90vw"]);

  const scale1Desktop = useTransform(progressDesktop, [0.9, 1], [1, 0.6]);
  const height1Desktop = useTransform(
    progressDesktop,
    [0, 1],
    ["1580px", "750px"]
  );
  const width1Desktop = useTransform(
    progressDesktop,
    [0, 1],
    ["100vw", "90vw"]
  );

  if (!project) {
    return <div style={{ color: "#fff", background: "#000" }}>Not found</div>;
  }

  const defaultText =
    "From intimate cultural gatherings to global brand moments, our work spans the spectrum of African creativity and influence. Here's a look at a few of our standout collaborations, campaigns, and events that embody the FOLA PR touch.";

  return (
    <Layout>
      {project && (
        <div className="bg-black text-white pb-[70px] lg:pb-[140px]">
          <div className="container mx-auto">
            <div className="w-full pt-[140px] lg:pt-[220px]">
              <Link
                href="/our-work"
                className="lg:px-[100px] uppercase font-inter lg:text-lg"
              >
                Back to Our work
              </Link>
            </div>

            <div className="pt-10 lg:px-[100px] flex flex-col lg:flex-row justify-between items-start gap-[60px] lg:gap-[100px]">
              <div className="lg:pt-[130px] lg:w-[45%]">
                <h1 className="text-[65px] w-[60%] font-extralight leading-[60px] lg:text-[80px] tracking-wide lg:leading-[76px] font-canela lg:w-[80%]">
                  {project.title}
                </h1>
                <p className="lg:text-lg font-inter leading-[30px] whitespace-pre-line">
                  {project.text || defaultText}
                </p>
              </div>
              {project.photos?.header && (
                <div className="lg:w-[55%]">
                  <img src={project.photos.header} alt="" />
                </div>
              )}
            </div>

            {project.photos?.footer && (
              <div className="flex justify-center items-center lg:px-[140px] py-[60px] lg:py-[160px]">
                <img src={project.photos.footer} alt="" />
              </div>
            )}
          </div>

          {(project.photos?.left || project.photos?.right) && (
            <div className="container flex-col lg:flex-row mx-auto lg:pl-[100px] flex justify-between items-start gap-10 lg:gap-[110px]">
              {project.photos?.left && (
                <div className="lg:pt-[54px] w-[80%] lg:w-auto">
                  <img src={project.photos.left} alt="" />
                </div>
              )}
              {project.photos?.right && (
                <div className="flex justify-end items-end w-full">
                  <img
                    src={project.photos.right}
                    className="w-[80%] lg:w-auto"
                    alt=""
                  />
                </div>
              )}
            </div>
          )}

          {project.photos?.banner !== "" && (
            <div className="flex justify-center items-center">
              {/* Mobile */}
              <motion.div
                ref={refMobile}
                className="my-[40px] flex justify-center lg:hidden w-full"
                style={{ scale: scale3Mobile }}
              >
                <motion.img
                  src={project.photos.banner}
                  alt="Image 1"
                  className="w-[100vw] object-cover shadow-lg"
                  style={{ height: height3Mobile, width: width3Mobile }}
                />
              </motion.div>

              {/* Desktop */}
              <motion.div
                ref={refDesktop}
                className="my-[40px] lg:my-[120px] hidden lg:flex justify-center w-full"
                style={{ scale: scale1Desktop }}
              >
                <motion.img
                  src={project.photos.banner}
                  alt="Image 1"
                  width={460}
                  height={280}
                  className="w-[100vw] object-cover shadow-lg"
                  style={{ height: height1Desktop, width: width1Desktop }}
                />
              </motion.div>
            </div>
          )}
        </div>
      )}
      <Footer />
    </Layout>
  );
}
