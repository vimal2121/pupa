import { PrismaClient } from '@prisma/client'
import { servicesData } from '@/data/services'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

const prisma = new PrismaClient()

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData.find(s => s.slug === slug)
  if (!service) return {}
  return {
    title: `${service.title} | Pupa Services`,
    description: service.headline,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesData.find(s => s.slug === slug)
  
  if (!service) notFound()

  // Find featured projects to show as "Related Work"
  // Since we don't map services to projects strictly right now, we'll just pull 2 featured projects.
  const relatedWork = await prisma.project.findMany({
    where: { published: true, featured: true },
    take: 2,
    include: { thumbnail: true, category: true }
  })

  return (
    <main className="w-full bg-white text-black min-h-screen pt-32 pb-48">
      <div className="w-full max-w-screen-2xl mx-auto px-6">
        
        {/* HERO */}
        <header className="mb-24 md:mb-48">
          <Link href="/services" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-12 inline-block">
            ← All Capabilities
          </Link>
          <h1 className="text-5xl md:text-[8vw] font-bold tracking-tighter leading-[0.85] mb-12">
            {service.title}.
          </h1>
          <p className="text-2xl md:text-4xl font-light text-[#51237F] max-w-4xl leading-tight">
            {service.headline}
          </p>
        </header>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-32">
          
          <div className="lg:col-span-5 space-y-16">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-200 pb-4">The Purpose</h3>
              <p className="text-lg md:text-xl text-gray-800 font-light leading-relaxed">
                {service.explanation}
              </p>
            </div>
            
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-200 pb-4">Who It's For</h3>
              <p className="text-lg text-gray-800 font-light leading-relaxed">
                {service.whoItsFor}
              </p>
            </div>
            
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-200 pb-4">The Deliverable</h3>
              <p className="text-lg text-gray-800 font-light leading-relaxed">
                {service.whatWeDeliver}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="bg-gray-50 p-8 md:p-16 rounded-2xl">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">Our Process</h3>
              <ul className="space-y-12">
                {service.process.map((step, idx) => (
                  <li key={idx} className="flex flex-col md:flex-row md:items-baseline">
                    <span className="text-4xl font-light text-[#a4d62b] w-16 mb-4 md:mb-0">
                      0{idx + 1}
                    </span>
                    <span className="text-2xl md:text-4xl font-medium tracking-tight text-gray-900">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* RELATED WORK */}
        {relatedWork.length > 0 && (
          <section className="mb-32">
            <div className="flex items-end justify-between mb-16 border-b border-gray-200 pb-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Related Work</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedWork.map((project) => (
                <Link key={project.id} href={`/work/${project.slug}`} className="group block">
                  <div className="relative w-full aspect-video bg-gray-100 overflow-hidden mb-6 rounded-lg">
                    {project.thumbnail && (
                      <Image 
                        src={project.thumbnail.url} 
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      {project.category?.name || 'Film'}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight group-hover:text-gray-600 transition-colors">
                    {project.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center py-24 bg-[#51237F] text-white rounded-3xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Ready to create a {service.title}?</h2>
          <Link 
            href="/contact"
            className="inline-block px-12 py-5 bg-[#a4d62b] text-[#51237F] font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#a4d62b] focus-visible:ring-offset-4 focus-visible:ring-offset-[#51237F]"
          >
            Start Your Story
          </Link>
        </section>

      </div>
    </main>
  )
}
