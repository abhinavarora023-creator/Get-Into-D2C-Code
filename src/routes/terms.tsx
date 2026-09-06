"use client";

import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FileText, Mail, AlertCircle } from "lucide-react";
import { BASE_URL } from "@/lib/seo-schema";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      {
        title: "Terms of Service & Cancellation Policy | GetIntoD2C",
      },
      {
        name: "description",
        content:
          "Terms of Service, payment terms, and workshop cancellation/refund policy for GetIntoD2C (a unit of Parlexa).",
      },
      {
        property: "og:title",
        content: "Terms of Service & Cancellation Policy | GetIntoD2C",
      },
      {
        property: "og:description",
        content:
          "Terms of Service, payment terms, and workshop cancellation/refund policy for GetIntoD2C (a unit of Parlexa).",
      },
      {
        property: "og:url",
        content: `${BASE_URL}/terms`,
      },
      {
        property: "og:type",
        content: "website",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${BASE_URL}/terms`,
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-[#f5f5f5]">
      <Nav />

      <main className="mx-auto max-w-4xl px-6 pt-36 pb-24 md:px-10">
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-white/70">
            <FileText className="h-3.5 w-3.5 text-[#e5a93b]" />
            <span>Terms of Service & Cancellation Policy</span>
          </div>
          <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-white/50">
            Effective Date: September 2024 &bull; Last updated: September 2026
          </p>
        </div>

        <div className="space-y-10 text-base leading-relaxed text-white/70 font-light">
          <section className="space-y-3">
            <h2 className="text-xl font-medium text-white">1. Agreement to Terms</h2>
            <p>
              These Terms of Service govern your access to and use of the GetIntoD2C platform (<code className="text-white/90">getintod2c.in</code>), advisory services, workshop registrations, and community channels operated by <strong className="text-white">GetIntoD2C (a unit of Parlexa)</strong>. By accessing our website, applying for community membership, or purchasing workshop access, you agree to these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-white">2. Scope of Services</h2>
            <p>
              GetIntoD2C provides professional growth studio advisory (including brand audits, positioning, go-to-market strategies, conversion rate optimization, and retention systems), educational workshops, and an invite-only peer community for consumer brand founders in India.
            </p>
            <p>
              Advisory engagements are governed by specific written agreements between Parlexa/GetIntoD2C and the respective client. Website content, case studies, and editorial articles are provided for informational and educational purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-white">3. Workshop Fees & Payment Terms</h2>
            <p>
              Fees for live webinars, masterclasses, or workshop cohorts are clearly displayed prior to checkout and are collected via authorized payment gateways (including Razorpay). Prices are listed in Indian Rupees (INR) unless expressly stated otherwise.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-white">4. Cancellation & Refund Policy</h2>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
              <div className="flex items-center gap-2 text-white font-medium">
                <AlertCircle className="h-4 w-4 text-[#e5a93b]" />
                <span>Digital Workshops & Live Masterclasses</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                Because digital workshop registrations provide immediate allocation of limited live seats, preparation materials, and on-demand video access, registration fees are generally non-refundable once the event link or digital materials have been issued.
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                If a live session is rescheduled or canceled by GetIntoD2C, registered participants will be offered the choice of a seat in the rescheduled session or a full refund processed to the original payment method within 5–7 business days.
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                For questions regarding payment confirmation or workshop access issues, contact us at <a href="mailto:team@getintod2c.in" className="text-white underline">team@getintod2c.in</a> with your transaction ID.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-white">5. Intellectual Property</h2>
            <p>
              All proprietary frameworks, playbooks, course materials, website copy, visual assets, and trademarks on this site are the intellectual property of GetIntoD2C and Parlexa. Unauthorized reproduction, resale, or distribution of our workshop recordings or frameworks is prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-white">6. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-white">7. Contact Information</h2>
            <p>
              For legal inquiries, contract clarifications, or payment support:
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm">
              <p className="font-medium text-white">GetIntoD2C (A Unit of Parlexa)</p>
              <div className="mt-3 flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4 text-[#e5a93b]" />
                <a href="mailto:team@getintod2c.in" className="hover:text-white underline">
                  team@getintod2c.in
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
