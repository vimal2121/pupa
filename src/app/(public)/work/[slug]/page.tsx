import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { YouTubeFacade } from '@/components/public/YouTubeFacade'

const prisma = new PrismaClient()

// Dynamic SEO Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { ogImage: true }
  })

  if (!project) return {}

  return {
    title: `${project.seoTitle || project.title} | Pupa Work`,
    description: project.seoDescription || project.description,
    openGraph: {
      images: project.ogImage ? [project.ogImage.url] : []
    }
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      heroImage: true,
      gallery: true,
    }
  })

  if (!project || !project.published) {
    notFound()
  }

  // Extract YouTube ID safely
  let youtubeId = null
  if (project.youtubeUrl) {
    const match = project.youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)
    if (match) youtubeId = match[1]
  }

  return (
    <main className="w-full bg-white pb-32">
      
      {/* Editorial Title Section */}
      <section className="max-w-screen-2xl mx-auto px-6 pt-16 md:pt-32 pb-16">
        <h1 className="text-5xl md:text-[7vw] leading-[0.9] font-bold tracking-tighter text-black max-w-6xl">
          {project.title}
        </h1>
      </section>

      {/* Cinematic Hero Image */}
      {project.heroImage && (
        <section className="w-full px-6 max-w-[2000px] mx-auto mb-24 md:mb-40">
          <div className="relative w-full aspect-[4/3] md:aspect-video bg-gray-100 overflow-hidden">
            <Image 
              src={project.heroImage.url} 
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </section>
      )}

      {/* Editorial Content Layout */}
      <section className="max-w-screen-2xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-24 mb-32 md:mb-48">
          
          {/* Left Column: Overview / Description */}
          <div className="md:col-span-4">
            {project.description && (
              <div className="sticky top-32">
                <p className="text-xl md:text-2xl text-gray-800 font-medium leading-snug">
                  {project.description}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Narrative */}
          <div className="md:col-span-8 space-y-24 md:space-y-40">
            {project.challenge && (
              <div>
                <h2 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-8">The Challenge</h2>
                <p className="text-2xl md:text-4xl text-black font-light leading-snug whitespace-pre-wrap">
                  {project.challenge}
                </p>
              </div>
            )}
            
            {project.strategy && (
              <div>
                <h2 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-8">The Strategy</h2>
                <p className="text-2xl md:text-4xl text-black font-light leading-snug whitespace-pre-wrap">
                  {project.strategy}
                </p>
              </div>
            )}

            {project.story && (
              <div>
                <h2 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-8">The Story</h2>
                <p className="text-2xl md:text-4xl text-black font-light leading-snug whitespace-pre-wrap">
                  {project.story}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cinematic Video Player */}
      {youtubeId && (
        <section className="max-w-[2000px] mx-auto px-6 mb-32 md:mb-48">
          <div className="relative w-full aspect-video bg-black overflow-hidden">
            <YouTubeFacade videoId={youtubeId} title={project.title} />
          </div>
        </section>
      )}

      {/* Experimental Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="max-w-screen-2xl mx-auto px-6">
          <div className="flex justify-between items-end border-b border-gray-200 pb-8 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Behind the scenes</h2>
            <span className="text-gray-400 font-medium hidden md:block">0{project.gallery.length} Images</span>
          </div>
          
          {/* Mobile: Grid / Desktop: Masonry-style layout via flex/grid combination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {project.gallery.map((img, idx) => {
              // Use a uniform aspect ratio for a clean, aligned grid
              const aspectClass = 'aspect-square'
              return (
                <div key={img.id} className={`relative w-full ${aspectClass} bg-gray-100 overflow-hidden group`}>
                  <Image 
                    src={img.url} 
                    alt={`Gallery image ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                  />
                </div>
              )
            })}
          </div>
        </section>
      )}

    </main>
  )
}
