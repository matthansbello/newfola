"use client";

import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { Project } from "@/types";
import { Footer } from "@/components";

type ShowcaseItem = {
  src: string;
  alt: string;
  tag: string;
  href: string;
  metaOverlay?: { type: string; date: string; context: string };
};

const showcaseGrid: ShowcaseItem[] = [
  {
    src: "/project1.jpg",
    alt: "Leading women in music gathering",
    tag: "Music",
    href: "/projects/7",
    metaOverlay: {
      type: "TYPE: VIDEO EDITING",
      date: "DATE: MARCH / 2026",
      context: "CONTEXT: FREELANCE",
    },
  },
  {
    src: "/project2.png",
    alt: "BNXN x Red Bull",
    tag: "Video Ad",
    href: "/projects/3",
    metaOverlay: {
      type: "TYPE: VIDEO EDITING",
      date: "DATE: MARCH / 2026",
      context: "CONTEXT: FREELANCE",
    },
  },
  {
    src: "/project3.png",
    alt: "Outdoor event by the pool",
    tag: "Music",
    href: "/projects/4",
    metaOverlay: {
      type: "TYPE: VIDEO EDITING",
      date: "DATE: MARCH / 2026",
      context: "CONTEXT: FREELANCE",
    },
  },
  {
    src: "/project2.jpg",
    alt: "Fatherland at Cannes",
    tag: "Video Ad",
    href: "/projects/5",
    metaOverlay: {
      type: "TYPE: VIDEO EDITING",
      date: "DATE: MARCH / 2026",
      context: "CONTEXT: FREELANCE",
    },
  },
];

function ProjectTag({ label }: { label: string }) {
  return (
    <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 font-inter text-[10px] uppercase tracking-[0.12em] text-black shadow-sm backdrop-blur-sm sm:left-4 sm:top-4 sm:text-[11px]">
      <span className="h-1 w-1 shrink-0 rounded-full bg-black" aria-hidden />
      {label}
    </div>
  );
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Tems x Leading Vibe Initiative",
    thumb: "/assets/images/new/Leading-vibes.svg",
    meta: "[01/08]",
    photos: {
      header: "/LVI/Leading-Vibes-with-FOLAPR1.jpg",
      footer: "/LVI/Leading-Vibes-with-FOLAPR6.jpg",
      left: "/LVI/WeWantFola-Project-LVI3.webp",
      right: "/LVI/WeWantFola-Project-LVI4.webp",
      banner: "/LVI/WeWantFola-Project-LVI5.webp",
    },
    text: "The Leading Vibe Initiative is a powerful new platform founded by GRAMMY®️ Award-winning artist Tems to uplift and amplify the next generation of women shaping Africa’s music industry.With plans to expand across the continent and beyond, the initiative offers training, mentorship, access, and opportunity for female artists, producers, and songwriters. Proud to serve as the agency of record leading Pan-African PR and supporting all activations for this movement.",
  },
  {
    id: 2,
    title: "Loewe Foundation Craft Prize",
    thumb: "/assets/images/new/Loewe-Foundation.svg",
    meta: "[02/08]",
    photos: {
      header: "/LeoweFoundation/LoeweCraftPrizeImageCallforSubmissions.jpg",
      footer: "/LeoweFoundation/WeWantFola-Project-Leowe2.webp",
      left: "/LeoweFoundation/WeWantFola-Project-Leowe3.webp",
      right: "/LeoweFoundation/WeWantFola-Project-Leowe4.webp",
      banner: "/LeoweFoundation/WeWantFola-Project-Leowe5.webp",
    },
    text: "Loewe Foundation Despite market fluctuations, Africa’s cultural renaissance  continues to reshape global luxury narratives. Nigeria’s dynamic creative ecosystem influences fashion, music, art, and design in ways that transcend economic cycles.‘Cultural currency and cultural capital are always more important,’ Sade notes, a philosophy that guides our work connecting distinguished African talent with global opportunities while helping international luxury houses authentically engage with African audiences.",
  },
  {
    id: 3,
    title: "BNXN and RedBull",
    thumb: "/assets/images/new/WeWantFola-Project2.svg",
    meta: "[03/08]",
    photos: {
      header: "/BNXNXRedbull/WeWantFola-Project-BNXN1.webp",
      footer: "/BNXNXRedbull/WeWantFola-Project-BNXN2.webp",
      left: "/BNXNXRedbull/WeWantFola-Project-BNXN3.webp",
      right: "/BNXNXRedbull/WeWantFola-Project-BNXN4.webp",
      banner: "/BNXNXRedbull/WeWantFola-Project-BNXN5.webp",
    },
    text: "BNXN, born Daniel Benson, is a Nigerian singer-songwriter who has rapidly ascended in the Afrobeats scene. Known for his soulful vocals and genre-blending style, BNXN gained widespread recognition with his breakout single 'Lenu' in 2019. His collaborations with industry heavyweights and consistent delivery of chart-topping hits have solidified his position as one of Nigeria's top musical talents. FOLA PR managed Global Press and Media Relations.",
  },
  {
    id: 4,
    title: "Andrea Iyamah x Belmond Cap Juluca",
    thumb: "/assets/images/new/Andrea-Iyamah.svg",
    meta: "[04/08]",
    photos: {
      header: "/AndreaIyamah/FOLA-PR-Project-Fashion7.jpg",
      footer: "/AndreaIyamah/WeWantFola-Project-Andrea2.webp",
      left: "/AndreaIyamah/FOLA-PR-Project-Fashion14.jpg",
      right: "/AndreaIyamah/FOLA-PR-Project-Fashion8.jpg",
      banner: "/AndreaIyamah/WeWantFola-Project-Andrea5.webp",
    },
    text: "#AndreaIyamahSS25 in Anguilla was a multi-day celebration of artistry, nature, and high-end fashion. Six months of planning culminated in this extraordinary 5 day retreat at Belmond Cap Juluca, where the 'Born of The Wind' collection was showcased alongside a limited-edition Andrea Iyamah x Cap Juluca capsule collection exclusively designed for the Belmond Hotel. This intimate gathering featured thoughtfully crafted moments – from the exquisite welcome dinner at Pimms to serene yoga sessions by the sea to vibrant celebrations at Cap Shack and more. Strategic partnership, influencer management, event coordination and onsite execution by FOLA PR.",
  },
  {
    id: 5,
    title: "Fatherland x My Father's Shadow",
    thumb: "/assets/images/new/fatherland.svg",
    meta: "[05/08]",
    photos: {
      header: "/fatherland/fatherland-with-FOLAPR6.jpg",
      footer: "/fatherland/fatherland-with-FOLAPR7.jpg",
      left: "/fatherland/fatherland-with-FOLAPR3.jpg",
      right: "/fatherland/fatherland-with-FOLAPR2.jpg",
      banner: "/fatherland/fatherland-with-FOLAPR1.jpg",
    },
    text: " A powerful moment for Nigerian cinema is taking shape at Cannes. My Father’s Shadow — directed by Akinola Davies Jr, co-written with Wale Davies, and co-produced by Funmbi Ogunbanwo for Fatherland alongside Element Pictures — is the first Nigerian film ever selected for Un Certain Regard at Festival De Cannes, a platform known for spotlighting bold new voices in global cinema. As the world turns its gaze to Cannes, FOLA PR is proud to be working alongside incredible teams to shape how this moment is seen, heard, and remembered. Scroll through to see how the story is being told around the world - the acclaim, the anticipation, the legacy in motion. Thank you to our brilliant friends in journalism. It’s always a pleasure working with you. And of course… there’s more to come. Stay tuned.",
  },
  {
    id: 6,
    title: "YouTube @ 20",
    thumb: "/assets/images/new/youtube.svg",
    meta: "[06/08]",
    photos: {
      header: "/yt/Youtube.webp",
      footer: "/yt/youtube-at-20-with-FOlaPR.jpg",
      left: "/yt/Guests.webp",
      right: "/",
      banner: "/yt/Ambience.webp",
    },
    text: "YouTube marked 20 years of reshaping how the world hears African music by bringing the moment home. Led by Addy Awofisayo, YouTube's Head of Music for Sub-Saharan Africa, the initiative gathered Afrobeats artists, creators, and industry leaders at Mako Lagos to honor the ecosystem driving African music forward on Dec 23. From guest list curation to on-ground coordination, front of house, and press coverage, we ensured the significance of the moment resonated not just in Lagos but across the continent.",
  },
  {
    id: 7,
    title: "Flytime x Women In Music",
    thumb: "/assets/images/new/women-in-music.png",
    meta: "[07/08]",
    photos: {
      header: "/womenMusic/women-in-music-by-folapr6.jpg",
      footer: "/womenMusic/women-in-music-by-folapr4.jpg",
      left: "/womenMusic/women-in-music-by-folapr2.jpg",
      right: "/womenMusic/women-in-music-by-folapr8.jpg",
      banner: "/womenMusic/women-in-music-by-folapr1.jpg",
    },
    text: "An intimate lunch celebration unfolded at Vici Itameshi Cuisine & Chophouse during the #Flytime20 anniversary festivities, bringing together the continent's leading women in music and entertainment. The gathering transformed into a powerful platform for authentic dialogue, as distinguished guests shared personal journeys and industry experiences, creating lasting bonds and opportunities for collaboration. The lunch served as a foundation for strengthening the network of women in Africa's music industry, marking a significant step forward in celebrating and amplifying female voices in music.",
  },
  {
    id: 8,
    title: "Khenny Pre-Launch Dinner",
    thumb: "/assets/images/new/khenny.png",
    meta: "[08/08]",
    photos: {
      header: "/kenny/kenny-by-folapr2.jpg",
      footer: "/kenny/kenny-by-folapr3.jpg",
      left: "/kenny/kenny-by-folapr4.jpg",
      right: "/kenny/kenny-by-folapr1.jpg",
      banner: "/kenny/kenny-by-folapr6.jpg",
    },
    text: "Khenny marked its debut with an intimate pre-launch dinner in Lagos, a gathering that brought together muses, friends, and tastemakers from across the global African diaspora. Coinciding with Lagos Fashion Week, the evening introduced KHENNY as a brand rooted in duality, heritage, and modern luxury. Amid thoughtful conversations and shared laughter, guests celebrated the beauty of craftsmanship and identity, a reflection of the brand’s vision to connect continents through design and storytelling.FOLA PR led guest list curation, launch PR, front of house, and on-site support for the debut of KHENNY, an event beautifully produced by Atinudah Concepts",
  },
];

const Projects = () => {
  return (
    <>
      <Layout>
        <div className="min-h-screen bg-[#EFE4DB] px-5 pb-20 pt-[200px] text-black sm:px-8 lg:px-10 lg:pt-[320px]">
          <div className="mx-auto max-w-[1800px]">
            <div className="flex flex-col gap-10 font-normal lg:flex-row lg:items-start lg:justify-between lg:gap-16">
              <div className="shrink-0 lg:w-[28%]">
                <h1 className="m-0 font-inter text-[24px] font-normal leading-tight text-[#00000099]">
                  Projects
                </h1>
              </div>
              <div className="min-w-0 flex-1 lg:max-w-[72%]">
                <p className="m-0 apris text-[clamp(1.75rem,4vw,3.125rem)] leading-[120%] text-black">
                  From intimate cultural gatherings to global brand moments, our
                  work spans the spectrum of African creativity and influence.
                  Here&apos;s a look at a few of our standout collaborations,
                  campaigns, and events that embody the FOLA PR touch.
                </p>
              </div>
            </div>

            <div className="mt-14 border-t border-[#D0D0D0] pt-10 lg:mt-16 lg:pt-12">
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                {showcaseGrid.map((item) => (
                  <Link
                    key={item.src}
                    href={item.href}
                    className="group relative block aspect-[4/5] w-full overflow-hidden bg-neutral-100 no-underline sm:aspect-[3/4]"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <ProjectTag label={item.tag} />
                    {item.metaOverlay && (
                      <div className="absolute bottom-3 left-3 right-3 z-10 bg-white/95 p-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.06em] text-black shadow-sm backdrop-blur-sm sm:bottom-4 sm:left-4 sm:right-auto w-[95%] sm:p-4 sm:text-[10px]">
                        <p className="m-0">{item.metaOverlay.type}</p>
                        <p className="m-0 mt-1">{item.metaOverlay.date}</p>
                        <p className="m-0 mt-1">{item.metaOverlay.context}</p>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Projects;
