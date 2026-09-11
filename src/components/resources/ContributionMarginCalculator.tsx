"use client";

import { useState } from "react";
import { Calculator, RefreshCw, Info, AlertTriangle, CheckCircle2 } from "lucide-react";

export function ContributionMarginCalculator() {
  // Input states with realistic baseline values for an Indian consumer brand
  const [aov, setAov] = useState<number>(1200);
  const [cogs, setCogs] = useState<number>(300);
  const [packaging, setPackaging] = useState<number>(60);
  const [shipping, setShipping] = useState<number>(90);
  const [gatewayPercent, setGatewayPercent] = useState<number>(2.36);
  const [codShare, setCodShare] = useState<number>(40);
  const [rtoRate, setRtoRate] = useState<number>(18);
  const [reverseShipping, setReverseShipping] = useState<number>(80);
  const [cac, setCac] = useState<number>(450);

  // Calculations
  const grossMargin = aov - cogs - packaging; // CM1
  const grossMarginPct = aov > 0 ? (grossMargin / aov) * 100 : 0;

  const gatewayCost = (aov * gatewayPercent) / 100;
  
  // RTO friction calculation:
  // Forward shipping is lost on RTO orders, plus reverse shipping is incurred.
  // Effective cost spread across all orders = (COD Share % * RTO % * (Shipping + ReverseShipping))
  const rtoFrictionPerOrder =
    ((codShare / 100) * (rtoRate / 100)) * (shipping + reverseShipping);

  const totalFulfillmentCost = shipping + gatewayCost + rtoFrictionPerOrder;

  const cm2 = grossMargin - totalFulfillmentCost; // CM2 before marketing
  const cm2Pct = aov > 0 ? (cm2 / aov) * 100 : 0;

  const cm3 = cm2 - cac; // CM3 net contribution margin
  const cm3Pct = aov > 0 ? (cm3 / aov) * 100 : 0;

  const breakEvenCac = Math.max(0, cm2);

  const resetDefaults = () => {
    setAov(1200);
    setCogs(300);
    setPackaging(60);
    setShipping(90);
    setGatewayPercent(2.36);
    setCodShare(40);
    setRtoRate(18);
    setReverseShipping(80);
    setCac(450);
  };

  return (
    <div className="my-10 rounded-3xl border border-black/15 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col justify-between gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#e11d2a]">
            <Calculator className="h-4 w-4" /> Interactive Model
          </div>
          <h3 className="mt-1 font-display text-2xl text-black">
            D2C Unit Economics &amp; Contribution Margin Calculator
          </h3>
          <p className="mt-1 text-xs text-black/60">
            Simulate real contribution margins (CM1, CM2, CM3) incorporating COD RTO loss and payment gateway deductions.
          </p>
        </div>
        <button
          onClick={resetDefaults}
          className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-[#f4f4f4] px-4 py-1.5 text-xs font-medium text-black/70 hover:bg-black/5"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Reset Defaults
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Inputs */}
        <div className="space-y-5 lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-black">
                Average Order Value (AOV in ₹)
              </label>
              <input
                type="number"
                value={aov}
                onChange={(e) => setAov(Number(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-xl border border-black/15 bg-black/[0.02] px-3.5 py-2 text-sm text-black focus:border-[#e11d2a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-black">
                COGS (Direct Product Cost in ₹)
              </label>
              <input
                type="number"
                value={cogs}
                onChange={(e) => setCogs(Number(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-xl border border-black/15 bg-black/[0.02] px-3.5 py-2 text-sm text-black focus:border-[#e11d2a] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-black">
                Packaging &amp; Inserts (₹)
              </label>
              <input
                type="number"
                value={packaging}
                onChange={(e) => setPackaging(Number(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-xl border border-black/15 bg-black/[0.02] px-3.5 py-2 text-sm text-black focus:border-[#e11d2a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-black">
                Forward Shipping per Order (₹)
              </label>
              <input
                type="number"
                value={shipping}
                onChange={(e) => setShipping(Number(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-xl border border-black/15 bg-black/[0.02] px-3.5 py-2 text-sm text-black focus:border-[#e11d2a] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-medium text-black">
                Gateway Fee (% + GST)
              </label>
              <input
                type="number"
                step="0.1"
                value={gatewayPercent}
                onChange={(e) => setGatewayPercent(Number(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-xl border border-black/15 bg-black/[0.02] px-3.5 py-2 text-sm text-black focus:border-[#e11d2a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-black">
                COD Orders Share (%)
              </label>
              <input
                type="number"
                value={codShare}
                onChange={(e) => setCodShare(Number(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-xl border border-black/15 bg-black/[0.02] px-3.5 py-2 text-sm text-black focus:border-[#e11d2a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-black">
                COD Return (RTO) %
              </label>
              <input
                type="number"
                value={rtoRate}
                onChange={(e) => setRtoRate(Number(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-xl border border-black/15 bg-black/[0.02] px-3.5 py-2 text-sm text-black focus:border-[#e11d2a] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-black">
                Reverse Courier on RTO (₹)
              </label>
              <input
                type="number"
                value={reverseShipping}
                onChange={(e) => setReverseShipping(Number(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-xl border border-black/15 bg-black/[0.02] px-3.5 py-2 text-sm text-black focus:border-[#e11d2a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-black">
                Target Ad Spend / CAC (₹)
              </label>
              <input
                type="number"
                value={cac}
                onChange={(e) => setCac(Number(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-xl border border-black/15 bg-black/[0.02] px-3.5 py-2 text-sm text-black focus:border-[#e11d2a] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results Dashboard */}
        <div className="rounded-2xl border border-black/10 bg-[#0a0a0a] p-6 text-white lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#e11d2a]">
              Calculated Unit Economics
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-xs text-white/70">CM1 (Gross Profit)</div>
                  <div className="text-[10px] text-white/40">AOV - COGS - Packaging</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl text-white">₹{grossMargin.toFixed(0)}</div>
                  <div className="text-xs text-[#e11d2a]">{grossMarginPct.toFixed(1)}%</div>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-xs text-white/70">Fulfillment &amp; Gateway</div>
                  <div className="text-[10px] text-white/40">Includes ₹{rtoFrictionPerOrder.toFixed(0)} RTO drag</div>
                </div>
                <div className="text-right font-mono text-sm text-white/80">
                  -₹{totalFulfillmentCost.toFixed(0)}
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-xs font-medium text-white">CM2 (Pre-Ad Margin)</div>
                  <div className="text-[10px] text-white/40">Gross Profit - Delivery &amp; Fees</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl text-white">₹{cm2.toFixed(0)}</div>
                  <div className="text-xs text-white/60">{cm2Pct.toFixed(1)}%</div>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-xs font-medium text-white">Customer Acquisition (CAC)</div>
                  <div className="text-[10px] text-white/40">Meta/Google Ad Spend / Order</div>
                </div>
                <div className="text-right font-mono text-sm text-white/80">
                  -₹{cac.toFixed(0)}
                </div>
              </div>

              <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#e11d2a]">
                      CM3 (Net Unit Margin)
                    </div>
                    <div className="text-[10px] text-white/50">Cash Left per Delivered Order</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-display text-2xl ${cm3 >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {cm3 >= 0 ? `+₹${cm3.toFixed(0)}` : `-₹${Math.abs(cm3).toFixed(0)}`}
                    </div>
                    <div className="text-xs text-white/70">{cm3Pct.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/60">Break-Even CAC Ceiling:</span>
              <span className="font-mono font-semibold text-[#e11d2a]">
                ₹{breakEvenCac.toFixed(0)}
              </span>
            </div>
            <p className="mt-1 text-[10px] leading-relaxed text-white/40">
              If your blended CAC exceeds ₹{breakEvenCac.toFixed(0)}, every first order loses cash before repeat purchases.
            </p>
            <p className="mt-3 text-[9px] leading-relaxed text-white/30 border-t border-white/5 pt-2">
              Note: 2.36% represents an illustrative blended card/netbanking rate (2% + 18% GST). In India, UPI and RuPay debit transactions carry 0% MDR under government mandate; actual blended gateway cost depends on your store's customer payment mix.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
