export const metadata = {
  title: 'About DSM Solutions | Dental AI Platform Company',
  description: 'Learn about DSM Solutions, the leading dental AI platform transforming practices with proven revenue growth and operational excellence.',
};

export default function AboutPage() {
  return (
    <main>
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-[#1a365d]">
              About DSM Solutions
            </h1>
            <p className="mt-6 text-lg text-[#2d3748]/80">
              We're not just another software company. We're practice transformation specialists who happen to build exceptional AI technology.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6 text-center">
              <div className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d]">2019</div>
              <div className="text-sm text-[#2d3748]/70 mt-1">Founded</div>
            </div>
            <div className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6 text-center">
              <div className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d]">500+</div>
              <div className="text-sm text-[#2d3748]/70 mt-1">Practices Transformed</div>
            </div>
            <div className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6 text-center">
              <div className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d]">$250M+</div>
              <div className="text-sm text-[#2d3748]/70 mt-1">Revenue Generated for Clients</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d] text-center mb-12">Our Mission</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-[#2d3748]/80">
              To empower dental practices with AI technology that delivers measurable growth, operational excellence, and superior patient outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16 bg-white/50">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d] text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "CEO & Founder",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces"
              },
              {
                name: "Michael Rodriguez",
                role: "CTO",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces"
              },
              {
                name: "Jennifer Park",
                role: "Chief Revenue Officer",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces"
              },
              {
                name: "David Thompson",
                role: "VP of Customer Success",
                image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=faces"
              },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="h-32 w-32 rounded-full overflow-hidden mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-[#1a365d] font-medium">{member.name}</h3>
                <p className="text-sm text-[#2d3748]/70">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
