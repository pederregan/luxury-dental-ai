export const metadata = {
  title: 'AI Patient Acquisition Software for Dental Practices | DSM Solutions',
  description: 'Convert 3x more website visitors into booked patients with DSM Solutions AI patient acquisition software. Average $180K annual revenue increase.',
};

export default function PatientAcquisitionPage() {
  return (
    <main>
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-[#1a365d]">
              AI Patient Acquisition Software for Dental Practices
            </h1>
            <p className="mt-6 text-lg text-[#2d3748]/80">
              75% of dental practice website visitors leave without booking. Convert 3x more website visitors into booked patients with intelligent automation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#demo" className="inline-flex items-center justify-center rounded-full bg-[#1a365d] text-white px-6 py-3 text-sm font-medium shadow-sm hover:bg-[#152a49] transition-colors">
                See Live Demo
              </a>
              <a href="/pricing" className="inline-flex items-center justify-center rounded-full border border-[#1a365d]/20 text-[#1a365d] px-6 py-3 text-sm font-medium hover:bg-white/60 transition-colors">
                View Investment Options
              </a>
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/40 p-8">
            <div className="text-center">
              <div className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d]">$180K</div>
              <div className="text-sm text-[#2d3748]/70 mt-1">Average Annual Revenue Increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Patient Experience Image */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
            <img
              src="https://www.dentalpartnersofboston.com/wp-content/uploads/2025/03/happy-male-dental-patient.jpg"
              alt="Happy Dental Patient"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d] text-center mb-12">Product Showcase</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "LeadCapture AI Chatbot", desc: "24/7 intelligent patient engagement" },
              { title: "Smart Form Intelligence", desc: "Conversion-optimized intake forms" },
              { title: "Call Analytics & AI Coaching", desc: "Transform every call into a booking" },
              { title: "Patient Journey Optimization", desc: "Automated follow-up sequences" },
            ].map((feature, i) => (
              <div key={i} className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-transparent border border-[#d4af37]/40" />
                <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-xl text-[#1a365d]">{feature.title}</h3>
                <p className="mt-2 text-sm text-[#2d3748]/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
