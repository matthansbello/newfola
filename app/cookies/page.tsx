import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CookiesPrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#EFE4DB] px-5 pb-20 pt-[150px] sm:px-8 lg:px-20 lg:pt-[200px]">
        <div className="mx-auto max-w-4xl text-black">
          <h1 className="apris text-5xl font-normal leading-tight md:text-6xl mb-12">
            Cookies & Data<br /> Privacy Policy
          </h1>

          <div className="space-y-8 font-inter text-[15px] leading-[1.8] sm:text-[16px]">
            <section>
              <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
              <p>
                Welcome to FOLA PR. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our 
                website (regardless of where you visit it from) and tell you about your privacy rights and how the 
                law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">2. The Data We Collect</h2>
              <p>
                Personal data, or personal information, means any information about an individual from which that 
                person can be identified.
                We may collect, use, store and transfer different kinds of personal data about you which we have 
                grouped together as follows:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser 
                type and version, time zone setting and location, browser plug-in types and versions, operating system 
                and platform, and other technology on the devices you use to access this website.</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">3. How We Use Cookies</h2>
              <p>
                Our website uses cookies to distinguish you from other users of our website. This helps us to provide 
                you with a good experience when you browse our website and also allows us to improve our site.
              </p>
              <p className="mt-4">
                A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your 
                computer if you agree. Cookies contain information that is transferred to your computer's hard drive.
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li><strong>Strictly necessary cookies:</strong> These are cookies that are required for the operation 
                of our website.</li>
                <li><strong>Analytical or performance cookies:</strong> These allow us to recognise and count the number 
                of visitors and to see how visitors move around our website when they are using it.</li>
                <li><strong>Functionality cookies:</strong> These are used to recognise you when you return to our website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally 
                lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your 
                personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at: <br />
                <a href="mailto:hello@folapr.com" className="underline hover:opacity-70 mt-2 block">hello@folapr.com</a>
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
