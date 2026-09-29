import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Homepage() {
  const featuredProjects = await prisma.project.findMany({
    where: { published: true, featured: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
    include: {
      thumbnail: true,
      category: true,
    }
  })

  const heroMediaSetting = await prisma.siteSetting.findUnique({
    where: { key: 'home_hero_media' }
  })
  const heroMedia = heroMediaSetting?.value

  const recentBlogs = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    take: 4,
    include: {
      featuredImage: true,
      category: true,
    }
  })

  return (
    <main className="w-full bg-white text-black overflow-hidden">
      
      {/* 1. HERO */}
      <section className="relative w-full min-h-[90vh] md:min-h-screen flex flex-col justify-center pb-24 md:pb-32 pt-32">
        {heroMedia && (
          <div className="absolute inset-0 z-0">
            {heroMedia.endsWith('.mp4') || heroMedia.endsWith('.webm') ? (
              <video 
                src={heroMedia} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover opacity-90"
              />
            ) : (
              <Image 
                src={heroMedia} 
                alt="Homepage Hero"
                fill
                priority
                className="object-cover opacity-90"
              />
            )}
            {/* Subtle gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>
        )}

        <div className="w-full max-w-screen-2xl mx-auto px-6 flex flex-col items-start z-10">
          <h1 className="text-[14vw] sm:text-[12vw] md:text-[9vw] font-bold tracking-tighter leading-[0.85] max-w-6xl mb-12 -ml-1 md:-ml-2">
            Powering brands <br/> with the right films.
          </h1>
          <Link 
            href="/work"
            className="group flex items-center space-x-4 text-sm uppercase tracking-widest font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded p-1 -ml-1"
          >
            <span>Explore Our Work</span>
            <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* 2. PHILOSOPHY */}
      <section className="w-full py-32 md:py-48 bg-gray-50">
        <div className="w-full max-w-screen-2xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 sticky top-32">
              Our Philosophy
            </h2>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-3xl md:text-5xl lg:text-7xl font-light leading-[1.1] tracking-tight text-gray-900">
              A great story is only as good as its telling. The difference between a great brand and a good brand lies in its ability to consistently create a predefined feeling repeatedly.
            </h3>
          </div>
        </div>
      </section>

      {/* 3. FEATURED WORK */}
      <section className="w-full py-32 md:py-48">
        <div className="w-full max-w-screen-2xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight">Featured Work</h2>
            <Link href="/work" className="mt-8 md:mt-0 text-sm uppercase tracking-widest font-bold hover:text-gray-500 transition-colors">
              View All Work [ + ]
            </Link>
          </div>

          {featuredProjects.length === 0 ? (
            <div className="w-full aspect-[21/9] bg-gray-100 flex items-center justify-center border border-gray-200">
              <p className="text-gray-400">Featured projects will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-24">
              {featuredProjects.map((project, index) => {
                const isEven = index % 2 !== 0;
                return (
                  <Link 
                    key={project.id} 
                    href={`/work/${project.slug}`}
                    className={`group block ${isEven ? 'md:mt-32' : ''}`}
                  >
                    <div className="relative w-full aspect-video bg-gray-100 mb-8 overflow-hidden rounded-lg">
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
                    
                    <div className="flex flex-col items-start">
                      {project.category && (
                        <span className="text-xs uppercase tracking-widest text-gray-500 mb-4 block">
                          {project.category.name}
                        </span>
                      )}
                      <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. WHAT PUPA DOES / SERVICES */}
      <section className="w-full py-32 md:py-48 bg-[#51237F] text-white">
        <div className="w-full max-w-screen-2xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 sticky top-32">
              What Pupa Does
            </h2>
          </div>
          <div className="md:col-span-8 space-y-12">
            <p className="text-2xl md:text-4xl font-light leading-snug text-gray-300">
              Pupa is a speciality Brand Empowerment company. We help corporates and businesses attract a sustainable flow of customers continuously through storytelling, using films as our primary medium.
            </p>
            <p className="text-xl md:text-3xl font-light leading-snug text-gray-500">
              We tell stories to customers, employees, suppliers, associates, investors, and the world at large.
            </p>
          </div>
        </div>
      </section>

      {/* 5. HOW WE WORK */}
      <section className="w-full py-32 md:py-48 bg-gray-50">
        <div className="w-full max-w-screen-2xl mx-auto px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-24 text-center md:text-left">
            How We Work
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            {/* Step 1 */}
            <div className="flex flex-col border-t border-gray-200 pt-8">
              <span className="text-sm font-bold tracking-widest mb-8">01. STRATEGY</span>
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                We dive deep into your brand DNA, discovering the truth of your offering to define the precise feeling you need to impart.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col border-t border-gray-200 pt-8">
              <span className="text-sm font-bold tracking-widest mb-8">02. STORYTELLING</span>
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                We craft narratives that bridge the gap between business objectives and human emotion, designing films that resonate deeply.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col border-t border-gray-200 pt-8">
              <span className="text-sm font-bold tracking-widest mb-8">03. EMPOWERMENT</span>
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                We deliver cinematic assets that consistently and continuously create that predefined feeling, repeatedly driving sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FILM MODULES */}
      <section className="w-full py-32 md:py-48">
        <div className="w-full max-w-screen-2xl mx-auto px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-24">
            Film Modules
          </h2>
          
          <ul className="flex flex-col divide-y divide-gray-200 border-y border-gray-200">
            {['Strategy Films', 'Brand Films', 'Launch Films', 'Employee Attraction'].map((service, idx) => (
              <li key={idx} className="group">
                <Link 
                  href={`/services/${service.toLowerCase().replace(' ', '-')}`} 
                  className="flex flex-col md:flex-row md:items-center justify-between py-12 md:py-16 hover:bg-gray-50 transition-colors duration-500 focus-visible:outline-none focus-visible:bg-gray-50 focus-visible:ring-2 focus-visible:ring-black px-4 -mx-4 rounded"
                >
                  <span className="text-4xl md:text-7xl font-light tracking-tight text-gray-900 group-hover:translate-x-4 transition-transform duration-500">
                    {service}
                  </span>
                  <div className="mt-8 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="w-8 h-8 text-black" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LATEST INSIGHTS (BLOGS) */}
      {recentBlogs.length > 0 && (
        <section className="w-full py-32 md:py-48 bg-white border-t border-gray-100">
          <div className="w-full max-w-screen-2xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight">Latest Thinking</h2>
              <Link href="/insights" className="mt-8 md:mt-0 text-sm uppercase tracking-widest font-bold hover:text-gray-500 transition-colors">
                View All Insights [ + ]
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-24">
              {recentBlogs.map((blog, index) => {
                const isEven = index % 2 !== 0;
                return (
                  <Link 
                    key={blog.id} 
                    href={`/insights/${blog.slug}`}
                    className={`group block ${isEven ? 'md:mt-32' : ''}`}
                  >
                    <div className="relative w-full aspect-video bg-gray-100 mb-8 overflow-hidden rounded-lg">
                      {blog.featuredImage && (
                        <Image
                          src={blog.featuredImage.url}
                          alt={blog.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    
                    <div className="flex flex-col items-start">
                      {blog.category && (
                        <span className="text-xs uppercase tracking-widest text-gray-500 mb-4 block">
                          {blog.category.name}
                        </span>
                      )}
                      <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                        {blog.title}
                      </h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. WHO WE WORK WITH */}
      <section className="w-full py-32 md:py-48 bg-gray-50">
        <div className="w-full max-w-screen-2xl mx-auto px-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-16">
            Who We Work With
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-4xl font-light leading-snug text-gray-900">
              We partner with visionary corporates and businesses globally who understand that a great story is the ultimate competitive advantage.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="w-full py-32 md:py-48">
        <div className="w-full max-w-screen-2xl mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-12 max-w-4xl leading-tight">
            Ready to tell your story?
          </h2>
          <Link 
            href="/contact"
            className="group flex flex-col items-center space-y-6 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#51237F] focus-visible:ring-offset-8 rounded-full"
            aria-label="Start your story"
          >
            <div className="w-40 h-40 rounded-full bg-[#51237F] text-[#a4d62b] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#431d69] transition-all duration-500 shadow-2xl">
              <span className="text-sm uppercase tracking-widest font-bold">Start</span>
            </div>
          </Link>
        </div>
      </section>

      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://pupa.com/#organization",
                "name": "Pupa",
                "url": "https://pupa.com/",
                "logo": "https://pupa.com/logo.png",
                "description": "A speciality Brand Empowerment company through storytelling, using films as the medium.",
                "sameAs": [
                  "https://www.instagram.com/pupa",
                  "https://www.linkedin.com/company/pupa",
                  "https://www.youtube.com/pupa"
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://pupa.com/#website",
                "url": "https://pupa.com/",
                "name": "Pupa",
                "publisher": {
                  "@id": "https://pupa.com/#organization"
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}
