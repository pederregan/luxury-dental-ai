'use client';

import { useState } from 'react';

export default function PricingPage() {
  const [practiceSize, setPracticeSize] = useState('');
  const [monthlyRevenue, setMonthlyRevenue] = useState('');
  const [roiResult, setRoiResult] = useState<{ increase: number; tier: string } | null>(null);

  const calculateROI = () => {
    const revenue = parseInt(monthlyRevenue) || 50000;
    const annualIncrease = Math.round(revenue * 0.4 * 12);

    let tier = 'Starter Growth';
    if (annualIncrease > 1500000) tier = 'Enterprise Transformation';
    else if (annualIncrease > 500000) tier = 'Growth Acceleration';
    else if (annualIncrease > 200000) tier = 'Professional Excellence';

    setRoiResult({ increase: annualIncrease, tier });
  };

  return (
    <main>
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-[#1a365d]">
              Investment Levels Based on Your Practice Growth Goals
            </h1>
            <p className="mt-6 text-lg text-[#2d3748]/80">
              We don't sell software. We deliver practice transformation. Your investment is based on the revenue growth potential we unlock for your practice.
            </p>
          </div>

          {/* ROI Calculator Widget */}
          <div className="mt-12 rounded-2xl border border-[#1a365d]/10 bg-white/70 p-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-[#1a365d] text-center">Quick ROI Assessment</h2>
            <div className="mt-6 grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <input
                type="number"
                value={practiceSize}
                onChange={(e) => setPracticeSize(e.target.value)}
                placeholder="Practice size (chairs)"
                className="rounded-xl border border-[#1a365d]/20 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#d4af37]/30"
              />
              <input
                type="number"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(e.target.value)}
                placeholder="Monthly revenue ($)"
                className="rounded-xl border border-[#1a365d]/20 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#d4af37]/30"
              />
            </div>
            <div className="mt-4 text-center">
              <button onClick={calculateROI} className="rounded-full bg-[#1a365d] text-white px-6 py-2 text-sm font-medium hover:bg-[#152a49]">
                Calculate Investment Level
              </button>
            </div>
            {roiResult && (
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/40 text-center">
                <div className="text-sm text-[#2d3748]/70">Recommended Package:</div>
                <div className="font-medium text-lg text-[#1a365d]">{roiResult.tier}</div>
                <div className="text-sm text-[#2d3748]/70 mt-2">Projected Annual Increase: ${roiResult.increase.toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d] text-center mb-12">Investment Packages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Starter Growth",
                target: "For practices ready to automate patient acquisition",
                revenue: "Custom quote based on practice revenue potential",
                guarantee: "300% ROI guarantee within 6 months",
              },
              {
                name: "Professional Excellence",
                target: "For practices scaling clinical and operational efficiency",
                revenue: "$200K-500K additional annual revenue target",
                guarantee: "Includes acquisition + operations + clinical support",
              },
              {
                name: "Growth Acceleration",
                target: "For practices expanding locations or services",
                revenue: "$500K-1.2M additional annual revenue target",
                guarantee: "Three pillars + advanced analytics + priority support",
              },
              {
                name: "Enterprise Transformation",
                target: "For DSOs and large practice groups",
                revenue: "$1.5M+ revenue increase (proven with 50+ DSOs)",
                guarantee: "All features + dedicated success manager + quarterly reviews",
              },
            ].map((pkg, i) => (
              <div key={i} className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#1a365d]">{pkg.name}</h3>
                <p className="mt-2 text-sm text-[#2d3748]/70">{pkg.target}</p>
                <div className="mt-4 pt-4 border-t border-[#1a365d]/10">
                  <p className="text-sm text-[#2d3748]/70">{pkg.revenue}</p>
                  <p className="text-sm text-[#2d3748]/70 mt-2">{pkg.guarantee}</p>
                </div>
                <button className="mt-4 w-full rounded-full border border-[#1a365d]/20 text-[#1a365d] px-4 py-2 text-sm font-medium hover:bg-white/60 transition-colors">
                  Get Custom Quote
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/40 p-8">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#1a365d] text-center">Each Package Includes</h3>
            <div className="mt-6 grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-sm text-[#2d3748]/70">
              <div>✓ Custom ROI projection and success metrics</div>
              <div>✓ Performance guarantee</div>
              <div>✓ Dedicated success manager</div>
              <div>✓ Quarterly growth reviews</div>
              <div>✓ Unlimited training and support</div>
              <div>✓ All software updates and new features</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
