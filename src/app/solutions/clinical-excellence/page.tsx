export const metadata = {
  title: 'AI Clinical Decision Support for Dental Practices | DSM Solutions',
  description: '35% improvement in diagnostic accuracy and 25% higher case acceptance with DSM Solutions AI clinical decision support.',
};

export default function ClinicalExcellencePage() {
  return (
    <main>
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-[#1a365d]">
              AI Clinical Decision Support for Dental Practices
            </h1>
            <p className="mt-6 text-lg text-[#2d3748]/80">
              Deliver superior patient outcomes with AI-powered diagnostic precision and treatment planning intelligence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#demo" className="inline-flex items-center justify-center rounded-full bg-[#1a365d] text-white px-6 py-3 text-sm font-medium shadow-sm hover:bg-[#152a49] transition-colors">
                See Clinical AI Demo
              </a>
              <a href="/pricing" className="inline-flex items-center justify-center rounded-full border border-[#1a365d]/20 text-[#1a365d] px-6 py-3 text-sm font-medium hover:bg-white/60 transition-colors">
                View Investment Options
              </a>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/40 p-6 text-center">
              <div className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d]">35%</div>
              <div className="text-sm text-[#2d3748]/70 mt-1">Diagnostic Accuracy Improvement</div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/40 p-6 text-center">
              <div className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d]">25%</div>
              <div className="text-sm text-[#2d3748]/70 mt-1">Higher Case Acceptance</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d] text-center mb-12">Clinical AI Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "AI Diagnostic Support",
              "Treatment Planning AI",
              "Clinical Decision Support",
              "Predictive Analytics",
              "Risk Assessment AI",
              "Outcome Tracking",
            ].map((feature, i) => (
              <div key={i} className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6 text-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-transparent border border-[#d4af37]/40 mx-auto" />
                <h3 className="mt-4 text-[#1a365d] font-medium">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
