export const metadata = {
  title: 'Careers at DSM Solutions | Join Our Team',
  description: 'Join DSM Solutions and help transform the dental industry with AI. Open positions in engineering, sales, and customer success.',
};

export default function CareersPage() {
  return (
    <main>
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-[#1a365d]">
              Careers at DSM Solutions
            </h1>
            <p className="mt-6 text-lg text-[#2d3748]/80">
              Join us in transforming the dental industry with AI technology that makes a real difference.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1a365d] mb-12">Open Positions</h2>
          <div className="space-y-4">
            {[
              { title: "Senior AI Engineer", dept: "Engineering", location: "Remote" },
              { title: "Enterprise Account Executive", dept: "Sales", location: "New York, NY" },
              { title: "Customer Success Manager", dept: "Customer Success", location: "Remote" },
              { title: "Product Designer", dept: "Product", location: "San Francisco, CA" },
            ].map((job, i) => (
              <div key={i} className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-[#1a365d] font-medium">{job.title}</h3>
                  <p className="text-sm text-[#2d3748]/70">{job.dept} • {job.location}</p>
                </div>
                <a href="#" className="rounded-full border border-[#1a365d]/20 text-[#1a365d] px-4 py-2 text-sm font-medium hover:bg-white/60 transition-colors">
                  View Role
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
