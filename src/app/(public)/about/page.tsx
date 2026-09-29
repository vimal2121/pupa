import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About | Pupa',
  description: 'Pupa is a Brand Empowerment company using film as the ultimate medium for storytelling.',
}

export default function AboutPage() {
  return (
    <main className="w-full bg-white text-black min-h-screen pt-32 pb-48">
      
      {/* HERO */}
      <section className="w-full max-w-screen-2xl mx-auto px-6 mb-32 md:mb-48">
        <h1 className="text-5xl md:text-[8vw] font-bold tracking-tighter leading-[0.85] max-w-5xl mb-12 -ml-1">
          A great story is <br/> only as good as <br/> its telling.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <p className="text-2xl md:text-3xl text-gray-500 font-light leading-relaxed">
            We are a brand empowerment company. We do not just create videos; we engineer cinematic narratives that fundamentally shift how people perceive your organization.
          </p>
          <div className="space-y-8 text-lg font-light text-gray-800 leading-relaxed border-l border-gray-200 pl-8">
            <p>
              In a world flooded with disposable content, true attention is the rarest commodity. We believe that film is the ultimate medium for capturing it.
            </p>
            <p>
              Pupa exists to bridge the gap between complex business strategy and human emotion. We partner with visionaries, founders, and marketing leaders to distill their core truths into undeniable visual assets.
            </p>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="w-full bg-[#51237F] text-white py-32 md:py-48 mb-32">
        <div className="w-full max-w-screen-2xl mx-auto px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#a4d62b] mb-16 text-center">Our Philosophy</h2>
          
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight">
              We reject the generic. We reject the template. We reject the idea that B2B or corporate communication has to be boring.
            </h3>
            <p className="text-2xl text-gray-300 font-light">
              Every brand has a heartbeat. Our job is to make the world feel it.
            </p>
          </div>
        </div>
      </section>

      {/* CAPABILITIES SUMMARY */}
      <section className="w-full max-w-screen-2xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">How we empower.</h2>
            <p className="text-xl text-gray-600 font-light leading-relaxed mb-12">
              We operate across the entire spectrum of moving images. From overarching brand strategy films to viral social media hits, our modular approach ensures that you get exactly the right narrative tool for your specific objective.
            </p>
            <Link 
              href="/services"
              className="inline-flex items-center space-x-4 text-sm uppercase tracking-widest font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded p-1 -ml-1 group"
            >
              <span>View All Capabilities</span>
              <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                →
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {['Strategy Films', 'Brand Films', 'Launch Films', 'Corporate Films'].map((service, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold mb-6">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{service}</h3>
                <Link href={`/services/${service.toLowerCase().replace(' ', '-')}`} className="text-sm text-gray-500 hover:text-black hover:underline underline-offset-4">Learn more</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-screen-2xl mx-auto px-6">
        <Link 
          href="/contact"
          className="group flex flex-col items-center justify-center space-y-8 py-32 border-t border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#51237F] focus-visible:ring-offset-8 rounded-3xl"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-center">
            Ready to change <br/> your narrative?
          </h2>
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#51237F] text-[#a4d62b] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#431d69] transition-all duration-500 shadow-2xl">
            <span className="text-sm uppercase tracking-widest font-bold">Start</span>
          </div>
        </Link>
      </section>
      
    </main>
  )
}
