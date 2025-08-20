export const metadata = {
  title: 'Dental Practice Growth Results with DSM Solutions',
  description: 'See how dental practices achieve 40-60% revenue growth with DSM Solutions AI platform. Case studies and verified results.',
};

export default function ResultsPage() {
  return (
    <main>
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-[#1a365d]">
              Dental Practice Growth Results with DSM Solutions
            </h1>
            <p className="mt-6 text-lg text-[#2d3748]/80">
              Real practices. Real results. Verified revenue growth averaging 40-60% within the first year.
            </p>
          </div>

          {/* Success Team Image */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
            <img
              src="https://media.istockphoto.com/id/998313080/photo/smiling-medical-team-standing-together-outside-a-hospital.jpg?s=612x612&w=0&k=20&c=fXzbjAoStQ_8jTM4TQxbHBEjhETI3vq5_7d_JL19eCA="
              alt="Successful Dental Team"
              className="w-full h-[400px] object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { practice: "Elite Dental Group", location: "New York, NY", increase: "$520K", percentage: "42%", time: "6 months" },
              { practice: "Mountain View Family Dentistry", location: "Denver, CO", increase: "$380K", percentage: "38%", time: "9 months" },
              { practice: "Coastal Orthodontics", location: "Miami, FL", increase: "$750K", percentage: "55%", time: "12 months" },
            ].map((study, i) => (
              <div key={i} className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-white to-[#f0ede8] border border-[#1a365d]/10 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-transparent border border-[#d4af37]/40 mx-auto" />
                    <div className="text-xs text-[#2d3748]/60 mt-2">Video Case Study</div>
                  </div>
                </div>
                <h3 className="text-[#1a365d] font-medium">{study.practice}</h3>
                <p className="text-sm text-[#2d3748]/70">{study.location}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2d3748]/70">Revenue Increase:</span>
                    <span className="font-medium text-[#1a365d]">{study.increase}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2d3748]/70">Percentage Growth:</span>
                    <span className="font-medium text-[#1a365d]">{study.percentage}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2d3748]/70">Time to Results:</span>
                    <span className="font-medium text-[#1a365d]">{study.time}</span>
                  </div>
                </div>
                <button className="mt-4 w-full rounded-full border border-[#1a365d]/20 text-[#1a365d] px-4 py-2 text-sm font-medium hover:bg-white/60 transition-colors">
                  Read Full Case Study
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="#more" className="inline-flex items-center justify-center rounded-full bg-[#1a365d] text-white px-6 py-3 text-sm font-medium shadow-sm hover:bg-[#152a49] transition-colors">
              View All 50+ Case Studies
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16 bg-white/50">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d] text-center mb-12">Industry Benchmarks</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { metric: "Average ROI", value: "400%", benchmark: "Industry: 150%" },
              { metric: "Time to ROI", value: "3 months", benchmark: "Industry: 12 months" },
              { metric: "Revenue Growth", value: "40-60%", benchmark: "Industry: 8-12%" },
              { metric: "Patient Volume", value: "+35%", benchmark: "Industry: +5%" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6 text-center">
                <div className="text-sm text-[#2d3748]/70">{item.metric}</div>
                <div className="font-[family-name:var(--font-playfair)] text-2xl text-[#1a365d] mt-2">{item.value}</div>
                <div className="text-xs text-[#2d3748]/60 mt-2">{item.benchmark}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
