export const metadata = {
  title: 'Dental Practice Management Resources | DSM Solutions',
  description: 'Free resources, guides, and tools to help dental practices grow revenue and improve operations.',
};

export default function ResourcesPage() {
  return (
    <main>
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-[#1a365d]">
              Dental Practice Management Resources
            </h1>
            <p className="mt-6 text-lg text-[#2d3748]/80">
              Expert insights, practical guides, and free tools to accelerate your practice growth.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d] mb-12">Featured Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "2025 Dental AI Adoption Report", type: "Report", desc: "Industry trends and benchmarks" },
              { title: "Revenue Growth Calculator", type: "Tool", desc: "Calculate your practice potential" },
              { title: "Patient Acquisition Playbook", type: "Guide", desc: "Convert more leads into patients" },
              { title: "Operational Excellence Framework", type: "Guide", desc: "Streamline your practice operations" },
              { title: "ROI Assessment Tool", type: "Tool", desc: "Measure your investment returns" },
              { title: "Case Acceptance Strategies", type: "Article", desc: "Increase treatment acceptance rates" },
            ].map((resource, i) => (
              <div key={i} className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6">
                <div className="text-xs text-[#d4af37] font-medium">{resource.type}</div>
                <h3 className="mt-2 font-[family-name:var(--font-playfair)] text-lg text-[#1a365d]">{resource.title}</h3>
                <p className="mt-2 text-sm text-[#2d3748]/70">{resource.desc}</p>
                <a href="#" className="mt-4 inline-block text-sm text-[#1a365d] hover:text-[#152a49]">
                  Access Resource →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16 bg-white/50">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/40 p-8 text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-[#1a365d]">Weekly Growth Insights</h2>
            <p className="mt-2 text-sm text-[#2d3748]/70">Join 5,000+ practice owners receiving actionable growth strategies.</p>
            <div className="mt-6 flex gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Your email" className="flex-1 rounded-xl border border-[#1a365d]/20 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-[#d4af37]/30" />
              <button className="rounded-full bg-[#1a365d] text-white px-6 py-2 text-sm font-medium hover:bg-[#152a49] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
