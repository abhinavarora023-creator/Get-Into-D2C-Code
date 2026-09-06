"use client";

import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Shield, Mail, FileText } from "lucide-react";
import { BASE_URL } from "@/lib/seo-schema";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      {
        title: "Privacy Policy | GetIntoD2C",
      },
      {
        name: "description",
        content:
          "Privacy Policy for GetIntoD2C (a unit of Parlexa). Learn how we handle your personal data, inquiries, and digital workshop registrations.",
      },
      {
        property: "og:title",
        content: "Privacy Policy | GetIntoD2C",
      },
      {
        property: "og:description",
        content:
          "Privacy Policy for GetIntoD2C (a unit of Parlexa). Learn how we handle your personal data, inquiries, and digital workshop registrations.",
      },
      {
        property: "og:url",
        content: `${BASE_URL}/privacy-policy`,
      },
      {
        property: "og:type",
        content: "website",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${BASE_URL}/privacy-policy`,
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-[#f5f5f5]">
      <Nav />

      <main className="mx-auto max-w-4xl px-6 pt-36 pb-24 md:px-10">
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-white/70">
            <Shield className="h-3.5 w-3.5 text-[#e5a93b]" />
            <span>Legal Notice & Privacy Transparency</span>
          </div>
          <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-white/50">
            Effective Date: September 2024 &bull; Last updated: September 2026
          </p>
        </div>

        <div className="space-y-10 text-base leading-relaxed text-white/70 font-light">
          <section className="space-y-3">
            <h2 className="text-xl font-medium text-white">1. Entity & Scope</h2>
            <p>
              GetIntoD2C is an India-focused D2C growth studio and founder community operated as a business unit of <strong className="text-white">Parlexa</strong>. This Privacy Policy describes how we collect, process, and protect your information across our website (<code className="text-white/90">getintod2c.in</code>), event registrations, community application forms, and advisory interactions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-white">2. Information We Collect</h2>
            <p>
              We collect information directly provided by you when you interact with our platform, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li><strong className="text-white">Contact & Professional Details:</strong> Name, work email address, phone number/WhatsApp contact, LinkedIn profile, and brand name.</li>
              <li><strong className="text-white">Brand & Growth Data:</strong> Current monthly revenue range, product category, primary acquisition channels, and specific growth challenges submitted via our audit forms or founder community applications.</li>
              <li><strong className="text-white">Transaction Metadata:</strong> Payment reference IDs, workshop enrollment timestamps, and transaction statuses processed securely through our authorized payment gateway partners (such as Razorpay). We do not store or process raw debit/credit card numbers or banking passwords on our servers.</li>
              <li><strong className="text-white">Technical Analytics:</strong> Standard non-personally identifiable diagnostic telemetry (e.g. browser type, operating system, aggregated page interaction metrics) collected to ensure website reliability and user experience.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-white">3. How We Use Your Information</h2>
            <p>
              Information collected is used strictly for legitimate business purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>To evaluate founder community applications and schedule advisory discovery calls.</li>
              <li>To deliver live webinar access credentials, workshop session links, and educational cohort resources.</li>
              <li>To respond directly to inquiries submitted through our contact and brief intake forms.</li>
              <li>To communicate important programmatic updates or schedule modifications.</li>
            </ul>
            <p>
              We do not sell, rent, or trade your personal data to third-party data brokers or unaffiliated advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-white">4. Payment Processing & Security</h2>
            <p>
              Payments for webinars, cohorts, or workshops are processed via PCI-DSS compliant payment gateways (such as Razorpay). Payment gateway providers adhere to strict security protocols. We encourage you to review their respective privacy and security documentation when completing transactions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-white">5. Data Retention & Deletion</h2>
            <p>
              We retain personal information for the period necessary to fulfill the purposes outlined in this policy, maintain accurate business records, and satisfy applicable statutory obligations. You may request deletion or correction of your submitted information at any time by emailing us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-white">6. Contact & Grievances</h2>
            <p>
              If you have any questions, requests, or concerns regarding your privacy or this policy, please reach out to our team:
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm">
              <p className="font-medium text-white">GetIntoD2C (A Unit of Parlexa)</p>
              <p className="mt-1 text-white/60">Attn: Privacy & Data Inquiries</p>
              <div className="mt-4 flex items-center gap-2 text-white/80">
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
