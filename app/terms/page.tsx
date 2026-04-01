import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — FOLA PR",
  description: "Read the Terms of Use governing your access to and use of the FOLA PR website.",
};

export default function TermsPage() {
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
            Terms of Use
          </h1>
          <p className="font-inter text-[#F4F1EA]/70 text-sm">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="font-inter text-[#2E2E2E] leading-relaxed">

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">1. Acceptance of Terms</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              By accessing or using the FOLA PR website at <strong>wewantfola.com</strong> or <strong>folapr.com</strong> (the "Site"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use the Site. These Terms apply to all visitors, users, and others who access or use the Site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">2. Use of the Site</h2>
            <p className="mb-4 text-[15px] leading-[1.75] text-black/70">
              You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of others. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[15px] leading-[1.75] text-black/70">
              <li>Use the Site in any way that violates applicable local, national, or international laws or regulations.</li>
              <li>Transmit any unsolicited or unauthorised advertising or promotional material.</li>
              <li>Attempt to gain unauthorised access to any part of the Site or its related systems or networks.</li>
              <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site.</li>
              <li>Use automated tools to scrape, crawl, or index any content from the Site without prior written consent.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">3. Intellectual Property</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              All content on the Site — including but not limited to text, graphics, photographs, logos, brand assets, and video — is the property of FOLA PR or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any content without our prior written permission. Requests for licensing or usage can be directed to{" "}
              <a href="mailto:hello@folapr.com" className="underline text-black">hello@folapr.com</a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">4. Disclaimer of Warranties</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              The Site and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. FOLA PR makes no representations or warranties that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. You use the Site entirely at your own risk.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">5. Limitation of Liability</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              To the fullest extent permitted by law, FOLA PR shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, data, goodwill, or business opportunity — arising out of or in connection with your use of the Site, even if we have been advised of the possibility of such damages. Our total liability to you for any claim arising under these Terms shall not exceed the greater of £100 or the amount you have paid to us in the preceding 12 months.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">6. Third-Party Links</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              The Site may contain links to third-party websites. These links are provided for your convenience only. FOLA PR has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them. Please review the terms and privacy policies of any third-party websites you visit.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">7. Privacy</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              Your use of the Site is also governed by our{" "}
              <Link href="/cookies" className="underline text-black">
                Cookie &amp; Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">8. Changes to the Site &amp; Terms</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any changes constitutes your acceptance of the revised Terms. We also reserve the right to modify, suspend, or discontinue the Site (or any part of it) at any time without notice.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">9. Governing Law</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="apris text-3xl text-black mb-4">10. Contact</h2>
            <p className="text-[15px] leading-[1.75] text-black/70">
              If you have any questions about these Terms, please contact us:
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
