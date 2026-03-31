import Link from "next/link";
import Layout from "@/components/Layout";
import { FadingText, Footer } from "@/components";

const Contact = () => {
  return (
    <>
      <Layout>
        <div className="min-h-screen bg-[#EFE4DB] pb-10 pt-[140px] text-black overflow-auto md:overflow-hidden lg:pt-[220px]">
          <div className="container mx-auto flex h-screen w-full flex-col items-start justify-center gap-[30px] lg:flex-row lg:items-center lg:justify-start lg:gap-[120px] lg:pt-8">
            <div className="hidden lg:block lg:w-[45%] h-screen">
              <img
                src="/assets/images/contact/FOLA-contact-1.webp"
                className="object-contain  h-full w-full"
                alt=""
              />
            </div>

            <div className="lg:w-[55%] mt-20 lg:-mt-[140px]">
              <h2 className="font-inter font-bold text-black text-[18px] uppercase m-0 leading-[25.31px]">
                <FadingText>Contact us</FadingText>
              </h2>
              <h1 className="apris lg:my-4 text-black font-normal text-[40px] lg:text-[64px] leading-[0px] lg:leading-[84px] tracking-[-0.02em] ">
                <span className="apris font-normal text-[42px] md:text-[62px] lg:text-[62px] 2xl:text-[62px] leading-[30px] lg:leading-[84px] tracking-[-0.02em] ">
                  <FadingText>Let's Work Together</FadingText>
                </span>{" "}
                <br />
                <span className="apris text-[40px] italic md:text-[70px] lg:text-[70px] 2xl:text-[70px] leading-[56px] -tracking-[0.02em]">
                  <FadingText delay={0.3}>
                    We'd Love to hear from you.
                  </FadingText>
                </span>
              </h1>

              <div className="flex justify-start flex-col lg:flex-row items-start gap-y-6 md:gap-x-[100px] pt-4 ">
                <div className="text-black font-inter">
                  <h2 className="text-black text-[20px] leading-[32.76px] font-bold uppercase my-2">
                    New Business
                  </h2>
                  <Link
                    href={"mailto:work@folapr.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="lg:text-[18.12px] no-underline leading-[25.88px] uppercase text-black"
                  >
                    work@folapr.com
                  </Link>
                </div>
                <div className="text-black font-inter">
                  <h2 className="text-black text-[20px] leading-[32.76px] font-bold uppercase my-2">
                    General Inquiries
                  </h2>
                  <Link
                    href={"mailto:hello@folapr.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="lg:text-[18.12px] no-underline leading-[25.88px] uppercase text-black"
                  >
                    hello@folapr.com
                  </Link>
                </div>
                <div className="text-black font-inter">
                  <h2 className="text-black text-[20px] leading-[32.76px] font-bold uppercase my-2">
                    Follow Us
                  </h2>
                  <div className="flex flex-col">
                    <Link
                      href={"https://www.instagram.com/wewantfola/"}
                      target="_blank"
                      rel="noreferrer"
                      className="lg:text-[18.12px] no-underline leading-[25.88px] uppercase text-black"
                    >
                      IG – @wewantfola
                    </Link>
                    <Link
                      href={"https://www.linkedin.com/company/fola-pr"}
                      target="_blank"
                      rel="noreferrer"
                      className="lg:text-[18.12px] no-underline leading-[25.88px] uppercase text-black"
                    >
                      LinkedIn – FOLA PR
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Contact;
