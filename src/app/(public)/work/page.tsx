import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'

const prisma = new PrismaClient()

// Standard Next.js Metadata configuration
export const metadata = {
  title: 'Our Work | Pupa',
  description: 'A selection of brand films, strategy campaigns, and stories crafted to empower businesses.',
}

export default async function WorkIndexPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: {
      thumbnail: true,
      category: true,
    }
  })

  return (
    <main className="w-full">
      <div className="max-w-screen-2xl mx-auto px-6 py-24 md:py-32">
        
        {/* Editorial Header */}
        <header className="mb-24 md:mb-40 max-w-4xl">
          <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] mb-8">
            Work.
          </h1>
          <p className="text-xl md:text-3xl text-gray-600 font-light leading-relaxed max-w-3xl">
            A curation of films, strategic narratives, and experimental storytelling designed to build enduring brands.
          </p>
        </header>

        {projects.length === 0 ? (
          <div className="py-32 border-t border-gray-200">
            <p className="text-gray-500 text-xl font-light">No projects published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-24 md:gap-y-40">
            {projects.map((project, index) => {
              // Create an experimental staggered masonry effect by pushing even items down on desktop
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
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                      {project.title}
                    </h2>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

      </div>
    </main>
  )
}
