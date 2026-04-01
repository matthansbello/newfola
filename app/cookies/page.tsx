import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie & Privacy Policy — FOLA PR",
  description: "Learn how FOLA PR collects, uses, and protects your personal data and how we use cookies on our website.",
};

export default function CookiesPage() {
  const lastUpdated = "1 April 2025";

  return (
    <main className="bg-[#F9F6F1] min-h-screen">
      {/* Hero */}
      <div className="bg-[#545848] text-[#F4F1EA] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="font-inter text-[11px] uppercase tracking-[0.12em] text-[#F4F1EA]/60 mb-4">
            Legal
          </p>
          <h1 className="apris text-5xl md:text-7xl text-[#F4F1EA] leading-tight mb-6">
            Cookie &amp; Privacy Policy
          </h1>
          <p className="font-inter text-[#F4F1EA]/70 text-sm">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="prose prose-neutral max-w-none font-inter text-[#2E2E2E] leading-relaxed">

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">1. Introduction</h2>
            <p className="mb-4 text-[15px] leading-[1.75] text-black/70">
              FOLA PR ("we", "our", "us") is committed to protecting the privacy of all individuals who interact with our website at <strong>wewantfola.com</strong> and <strong>folapr.com</strong> (collectively, the "Site"). This Cookie & Privacy Policy explains what information we collect, how we use it, how long we retain it, and your rights in relation to it.
            </p>
            <p className="text-[15px] leading-[1.75] text-black/70">
              By using our Site, you agree to the practices described in this policy. If you do not agree, please discontinue use of the Site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">2. Information We Collect</h2>
            <p className="mb-4 text-[15px] leading-[1.75] text-black/70">We may collect the following categories of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-[15px] leading-[1.75] text-black/70">
              <li><strong>Contact information</strong> — name, email address, and any other details you voluntarily submit via our contact form.</li>
              <li><strong>Usage data</strong> — pages visited, time spent on pages, browser type, operating system, and referring URLs, collected automatically via analytics tools.</li>
              <li><strong>Cookie data</strong> — small text files placed on your device (see Section 4).</li>
              <li><strong>Communications</strong> — content of messages you send to us via email or the contact form.</li>
            </ul>
            <p className="mt-4 text-[15px] leading-[1.75] text-black/70">
              We do not collect sensitive personal data (such as health, financial, or biometric data) and we do not knowingly collect data from children under the age of 13.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">3. How We Use Your Information</h2>
            <p className="mb-4 text-[15px] leading-[1.75] text-black/70">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[15px] leading-[1.75] text-black/70">
              <li>Respond to enquiries and provide information about our services.</li>
              <li>Improve and optimise the performance and content of the Site.</li>
              <li>Understand how visitors interact with our Site through aggregate analytics.</li>
              <li>Comply with our legal obligations.</li>
              <li>Send you relevant updates or communications where you have opted in.</li>
            </ul>
            <p className="mt-4 text-[15px] leading-[1.75] text-black/70">
              We will never sell, rent, or trade your personal data to third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">4. Cookies</h2>
            <p className="mb-4 text-[15px] leading-[1.75] text-black/70">
              Our Site uses cookies to enhance your browsing experience. A cookie is a small data file stored in your browser. Cookies do not contain personally identifiable information and cannot be used to run programs or deliver viruses to your computer.
            </p>

            <h3 className="font-inter font-semibold text-black text-base mb-3 mt-6">Types of cookies we use:</h3>
            <div className="space-y-4">
              {[
                {
                  name: "Essential Cookies",
                  desc: "Required for the basic operation of the Site. Without these, parts of the Site may not function correctly. These cannot be disabled.",
                },
                {
                  name: "Analytics Cookies",
                  desc: "Help us understand how visitors use the Site (e.g., which pages are most visited). Data is aggregated and anonymous. We may use tools such as Google Analytics.",
                },
                {
                  name: "Preference Cookies",
                  desc: "Remember your preferences and settings (e.g., cookie consent) between visits.",
                },
              ].map((c) => (
                <div key={c.name} className="border border-black/10 rounded-xl p-5 bg-white/60">
                  <p className="font-semibold text-black text-sm mb-1">{c.name}</p>
                  <p className="text-[14px] text-black/60 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-[15px] leading-[1.75] text-black/70">
              You can control cookies through your browser settings. Please note that disabling certain cookies may impact the functionality of the Site. For more information, visit{" "}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="underline text-black">
                allaboutcookies.org
              </a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">5. Third-Party Services</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              We may use trusted third-party service providers to support the Site, including analytics, hosting, and image delivery services. These providers process data on our behalf and are contractually obliged to handle your data securely and in accordance with applicable data protection law. They are not permitted to use your data for their own purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">6. Data Retention</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              We retain personal data only for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law. Contact enquiry data is typically retained for up to 24 months unless you request deletion sooner.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">7. Your Rights</h2>
            <p className="mb-4 text-[15px] leading-[1.75] text-black/70">
              Depending on your jurisdiction, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[15px] leading-[1.75] text-black/70">
              <li>The right to <strong>access</strong> the data we hold about you.</li>
              <li>The right to <strong>correct</strong> inaccurate data.</li>
              <li>The right to <strong>deletion</strong> ("right to be forgotten").</li>
              <li>The right to <strong>restrict</strong> or object to processing.</li>
              <li>The right to <strong>data portability</strong>.</li>
              <li>The right to <strong>withdraw consent</strong> at any time (where consent is the legal basis).</li>
            </ul>
            <p className="mt-4 text-[15px] leading-[1.75] text-black/70">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:hello@folapr.com" className="underline text-black">hello@folapr.com</a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">8. Security</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              We implement appropriate technical and organisational measures to protect your data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">9. Changes to This Policy</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              We may update this policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">10. Contact Us</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              If you have any questions, concerns, or requests relating to this policy, please contact:
            </p>
            <div className="mt-4 border border-black/10 rounded-xl p-6 bg-white/60 text-[15px] text-black/70 leading-relaxed">
              <p className="font-semibold text-black mb-1">FOLA PR</p>
              <p>Email: <a href="mailto:hello@folapr.com" className="underline text-black">hello@folapr.com</a></p>
              <p>Website: <a href="https://www.folapr.com" className="underline text-black">www.folapr.com</a></p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-black/10">
          <Link
            href="/"
            className="font-inter text-sm uppercase tracking-[0.08em] text-black/50 hover:text-black transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
