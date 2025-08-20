export const metadata = {
  title: 'Dental Practice Automation Software | DSM Solutions',
  description: 'See 30% more patients without adding staff. 70% reduction in documentation time with DSM Solutions practice automation.',
};

export default function OperationalEfficiencyPage() {
  return (
    <main>
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-[#1a365d]">
              Dental Practice Automation Software
            </h1>
            <p className="mt-6 text-lg text-[#2d3748]/80">
              See 30% more patients without adding staff. Automate documentation, scheduling, and workflows with intelligent AI.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#demo" className="inline-flex items-center justify-center rounded-full bg-[#1a365d] text-white px-6 py-3 text-sm font-medium shadow-sm hover:bg-[#152a49] transition-colors">
                See Automation Demo
              </a>
              <a href="/pricing" className="inline-flex items-center justify-center rounded-full border border-[#1a365d]/20 text-[#1a365d] px-6 py-3 text-sm font-medium hover:bg-white/60 transition-colors">
                View Investment Options
              </a>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/40 p-6 text-center">
              <div className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d]">70%</div>
              <div className="text-sm text-[#2d3748]/70 mt-1">Documentation Time Reduction</div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/40 p-6 text-center">
              <div className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d]">$150K</div>
              <div className="text-sm text-[#2d3748]/70 mt-1">Annual Staff Cost Savings</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d] text-center mb-12">Automation Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Automated Documentation",
              "Smart Scheduling",
              "Workflow Optimization",
              "Task Automation",
              "Staff Coordination AI",
              "Resource Planning",
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
