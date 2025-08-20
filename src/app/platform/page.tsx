export const metadata = {
  title: 'Enterprise Dental AI Platform Architecture | DSM Solutions',
  description: 'Enterprise-grade dental AI platform with HIPAA compliance, SOC 2 certification, and 100+ practice management system integrations.',
};

export default function PlatformPage() {
  return (
    <main>
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-[#1a365d]">
              Enterprise Dental AI Platform Architecture
            </h1>
            <p className="mt-6 text-lg text-[#2d3748]/80">
              Built for scale, security, and seamless integration. From solo practices to 500+ location DSOs.
            </p>
          </div>

          <div className="mt-12 aspect-video rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
            <img
              src="https://multipurposethemes.com/wp-content/uploads/2025/03/Oral-LTR-Dashboard-Light.png"
              alt="DSM Platform Dashboard"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d] text-center mb-12">Security & Compliance</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "HIPAA Compliant",
              "SOC 2 Certified",
              "256-bit Encryption",
              "99.9% Uptime SLA",
            ].map((feature, i) => (
              <div key={i} className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6 text-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-transparent border border-[#d4af37]/40 mx-auto" />
                <h3 className="mt-4 text-[#1a365d] font-medium">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d] text-center mb-12">Integration Ecosystem</h2>
          <div className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-8">
            <div className="text-center">
              <div className="font-[family-name:var(--font-playfair)] text-4xl text-[#1a365d]">100+</div>
              <div className="text-sm text-[#2d3748]/70 mt-2">Practice Management System Integrations</div>
              <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-4">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-12 rounded bg-gradient-to-br from-[#1a365d]/5 to-transparent" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
