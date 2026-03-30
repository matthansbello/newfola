import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfUse() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#EFE4DB] px-5 pb-20 pt-[150px] sm:px-8 lg:px-20 lg:pt-[200px]">
        <div className="mx-auto max-w-4xl text-black">
          <h1 className="apris text-5xl font-normal leading-tight md:text-6xl mb-12">
            Terms of Use
          </h1>

          <div className="space-y-8 font-inter text-[15px] leading-[1.8] sm:text-[16px]">
            <section>
              <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing, browsing, or using the FOLA PR website ("Website"), you acknowledge that you have 
                read, understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, 
                you should not use or access this Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">2. Intellectual Property</h2>
              <p>
                All content on this Website, including but not limited to text, graphics, logos, images, audio clips, 
                digital downloads, and data compilations is the property of FOLA PR or its content suppliers and is 
                protected by international copyright laws.
              </p>
              <p className="mt-4">
                You may not systematically extract and/or re-utilise parts of the contents of the website without FOLA PR's 
                express written consent. In particular, you may not utilise any data mining, robots, or similar data gathering 
                and extraction tools to extract for re-utilisation of any substantial parts of this website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">3. User Conduct</h2>
              <p>
                You agree to use our Website only for lawful purposes. You are prohibited from posting on or transmitting 
                through our Website any unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, 
                sexually explicit, profane, hateful, racially, ethnically, or otherwise objectionable material of any kind.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">4. Limitation of Liability</h2>
              <p>
                In no event shall FOLA PR, its directors, officers, employees, affiliates, agents or contractors be liable 
                for any compensatory, direct, indirect, incidental, consequential or punitive damages, loss of data, income 
                or profit, loss of or damage to property, and claims of third parties arising out of or in connection with 
                the use of this Website or the information contained within it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">5. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with standard legal operating 
                procedures and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">6. Changes to Terms</h2>
              <p>
                We reserve the right to review and withdraw or amend the services without notice. We will not be liable 
                if for any reason this Website is unavailable at any time or for any period. From time to time, we may 
                restrict access to some parts of this Website, or this entire Website, to users who have registered with us.
              </p>
            </section>

            <p className="text-sm text-[#00000099] mt-12 pt-8 border-t border-[#D0D0D0]">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
