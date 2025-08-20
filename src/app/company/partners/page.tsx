export const metadata = {
  title: 'Partners | DSM Solutions Partner Ecosystem',
  description: 'Partner with DSM Solutions to deliver comprehensive dental practice transformation solutions.',
};

export default function PartnersPage() {
  return (
    <main>
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-[#1a365d]">
              Partner Ecosystem
            </h1>
            <p className="mt-6 text-lg text-[#2d3748]/80">
              Join our network of industry leaders delivering comprehensive practice transformation solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d] text-center mb-12">Partner Types</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { type: "Technology Partners", desc: "Practice management systems and dental technology providers" },
              { type: "Implementation Partners", desc: "Consultants and implementation specialists" },
              { type: "Referral Partners", desc: "Industry associations and dental service organizations" },
            ].map((partner, i) => (
              <div key={i} className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-transparent border border-[#d4af37]/40 mx-auto" />
                <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-xl text-[#1a365d]">{partner.type}</h3>
                <p className="mt-2 text-sm text-[#2d3748]/70">{partner.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-[#1a365d] text-white px-6 py-3 text-sm font-medium shadow-sm hover:bg-[#152a49] transition-colors">
              Become a Partner
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
