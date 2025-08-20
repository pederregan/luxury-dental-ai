export const metadata = {
  title: 'Press & News | DSM Solutions Media Center',
  description: 'Latest news, press releases, and media coverage of DSM Solutions dental AI platform.',
};

export default function PressPage() {
  return (
    <main>
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-[#1a365d]">
              Press & News
            </h1>
            <p className="mt-6 text-lg text-[#2d3748]/80">
              Latest news and media coverage of DSM Solutions' impact on the dental industry.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d] mb-12">Recent Coverage</h2>
          <div className="space-y-6">
            {[
              { outlet: "Dental Economics", title: "DSM Solutions Raises $50M to Expand AI Platform", date: "March 2024" },
              { outlet: "Forbes", title: "How AI is Transforming Dental Practice Revenue", date: "February 2024" },
              { outlet: "TechCrunch", title: "DSM Solutions Partners with Major DSO Networks", date: "January 2024" },
            ].map((article, i) => (
              <div key={i} className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-[#d4af37] font-medium">{article.outlet}</div>
                    <h3 className="mt-2 font-[family-name:var(--font-playfair)] text-xl text-[#1a365d]">{article.title}</h3>
                    <p className="mt-1 text-sm text-[#2d3748]/70">{article.date}</p>
                  </div>
                  <a href="#" className="text-sm text-[#1a365d] hover:text-[#152a49]">Read →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16 bg-white/50">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/40 p-8 text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-[#1a365d]">Media Inquiries</h2>
            <p className="mt-2 text-sm text-[#2d3748]/70">For press inquiries and media resources</p>
            <a href="mailto:press@dsmsolutions.com" className="mt-4 inline-flex items-center justify-center rounded-full bg-[#1a365d] text-white px-6 py-3 text-sm font-medium shadow-sm hover:bg-[#152a49] transition-colors">
              Contact Press Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
