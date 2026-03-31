"use client";

import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Link from "next/link";
import { motion } from "framer-motion";

const labelClass =
  "m-0 font-inter text-[11px] font-normal uppercase leading-snug tracking-[0.16em] text-[#00000099] sm:text-[24px]";

/** Small grey caps — mission / who we are (matches comp) */
const missionLabelClass =
  "m-0 max-w-none font-inter text-[11px] font-normal uppercase leading-[1.45] tracking-[0.16em] text-[#737373] sm:max-w-[12rem] sm:whitespace-nowrap sm:text-[24px] lg:pt-[0.18em]";

const missionBodyClass =
  "apris text-[clamp(1.2rem,2.75vw,2.5rem)] font-normal leading-[1.42] tracking-[-0.022em] text-black";

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" as const },
    },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.06 },
    },
  };

  return (
    <Layout>
      <div className="min-h-screen w-full max-w-screen overflow-x-hidden bg-[#EFE4DB] pt-[140px] lg:pt-[220px]">
        {/* Hero */}
        <motion.section
          className="mx-auto max-w-[1800px] px-4 pb-12 text-black sm:px-8 sm:pb-16 lg:px-10 lg:pb-20"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <div className="flex flex-col gap-6 lg:gap-0">
            <motion.span
              variants={fadeInUp}
              className={`${labelClass} block pr-0 lg:pt-0.5 lg:pr-36`}
            >
              About us
            </motion.span>
            <motion.span variants={fadeInUp} className="min-w-0 flex-1">
              <span className="m-0 apris text-[clamp(1.35rem,5.5vw,2.6rem)] font-normal leading-[1.2] tracking-[-0.03em] text-black lg:text-[clamp(1.5rem,3.6vw,2.6rem)] lg:leading-[118%]">
                FOLA PR is a communications and experiential agency dedicated to
                bridging Africa and the world. We work across luxury, fashion,
                art, music, and lifestyle — challenging the status quo and
                crafting narratives that transcend borders.
              </span>
            </motion.span>
          </div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 w-full overflow-hidden rounded-sm sm:mt-12 lg:mt-14 lg:rounded-none"
          >
            <img
              src="/assets/images/new/WeWantFola-Gallery2.webp"
              alt="FOLA PR team in the studio"
              className="aspect-[16/10] h-auto w-full object-cover sm:aspect-auto"
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </motion.section>

        {/* Mission + who we are — ~28% label / ~72% copy, grey caps, large serif */}
        <motion.section
          className="mx-auto max-w-[1800px] border-t border-[#D0D0D0] px-4 py-12 text-black sm:px-8 sm:py-16 lg:px-10 lg:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <div className="flex flex-col gap-14 sm:gap-20 lg:gap-28 xl:gap-32">
            <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-[minmax(0,28%)_minmax(0,1fr)] lg:gap-x-10 xl:gap-x-14 2xl:gap-x-20">
              <motion.p variants={fadeInUp} className={missionLabelClass}>
                Our mission is simple
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className={`${missionBodyClass} max-w-full lg:max-w-[56rem]`}
              >
                Champion African creativity on the global stage. We design
                campaigns, partnerships, and events that push cultural
                boundaries, amplify innovators, and redefine how Africa&apos;s
                stories are told.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-[minmax(0,28%)_minmax(0,1fr)] lg:gap-x-10 xl:gap-x-14 2xl:gap-x-20">
              <motion.p variants={fadeInUp} className={missionLabelClass}>
                Who we are
              </motion.p>
              <motion.div variants={fadeInUp} className="min-w-0 max-w-full lg:max-w-[56rem]">
                <p className={missionBodyClass}>
                  We are strategic, bold, and unapologetically creative.
                </p>
                <p className={`${missionBodyClass} mt-5 sm:mt-6 lg:mt-10`}>
                  From intimate cultural gatherings to global PR rollouts. Our
                  work is rooted in excellence, authenticity, and impact.
                </p>
                <Link
                  href="/services"
                  className="mt-4 inline-flex min-h-[44px] items-center no-underline sm:mt-2 lg:min-h-0"
                >
                  <span className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-black px-4 py-2.5 font-inter text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 sm:min-h-0 sm:px-2 sm:py-1.5 sm:text-[14px] lg:px-2 lg:py-1.5">
                    Our service
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-3 lg:mt-14 lg:gap-4">
            <img
              src="/about1.png"
              alt=""
              className="aspect-[4/3] w-full object-cover sm:aspect-auto"
            />
            <img
              src="/about2.png"
              alt=""
              className="aspect-[4/3] w-full object-cover sm:aspect-auto"
            />
            <img
              src="/about3.png"
              alt=""
              className="aspect-[4/3] w-full object-cover sm:aspect-auto"
            />
          </div>
        </motion.section>

        {/* The team — label | portrait | bio (tops aligned) */}
        <motion.section
          className="mx-auto max-w-[1800px] border-t border-[#D0D0D0] px-4 py-12 text-black sm:px-8 sm:py-16 lg:px-10 lg:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-8 lg:gap-x-10 xl:gap-x-14">
            <motion.p
              variants={fadeInUp}
              className={`${labelClass} text-2xl lg:col-span-2 lg:whitespace-nowrap lg:pt-0.5`}
            >
              ( The CEO )
            </motion.p>
            <div className="flex w-full min-w-0 flex-col gap-8 lg:col-span-6 lg:flex-row lg:items-start lg:justify-between lg:gap-[85px]">
              <motion.div variants={fadeInUp} className="w-full lg:w-auto">
                <img
                  src="/team.png"
                  alt="Sade Teyibo"
                  className="mx-auto w-full max-w-[min(100%,320px)] sm:max-w-[min(100%,400px)] lg:mx-0 lg:max-w-none lg:w-full"
                />
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="min-w-0 apris lg:max-w-[520px] lg:pt-0.5"
              >
                <p className="m-0 text-[clamp(1.05rem,4vw,2.6rem)] font-normal leading-[145%] tracking-[-0.02em] text-black lg:text-[clamp(1rem,1.9vw,2.6rem)] lg:leading-[155%]">
                  <span className="font-medium">Sade Teyibo</span> is the
                  Founder and CEO of FOLA PR and its experiential arm, Studio
                  FOLA.
                </p>
                <p className="mt-8 text-[clamp(1rem,3.8vw,2.6rem)] font-normal leading-[155%] tracking-[-0.02em] text-black sm:mt-10 lg:mt-12 lg:text-[clamp(0.95rem,1.9vw,2.6rem)] lg:leading-[165%]">
                  With over 15 years of global experience in brand marketing,
                  strategic communications, and partnerships, Sade has led
                  initiatives for some of the world&apos;s most influential
                  luxury, fashion, and lifestyle brands.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </Layout>
  );
};

export default About;
