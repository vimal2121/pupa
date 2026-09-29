import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

const prisma = new PrismaClient()

export const metadata: Metadata = {
  title: 'Insights | Pupa',
  description: 'Editorial perspectives on brand empowerment and storytelling through film.',
}

export default async function InsightsIndexPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishDate: 'desc' },
    include: {
      category: true,
      featuredImage: true,
    }
  })

  return (
    <main className="w-full bg-white text-black min-h-screen pt-24 pb-48">
      <div className="w-full max-w-screen-2xl mx-auto px-6">
        
        {/* Header */}
        <header className="mb-24">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">Insights</h1>
          <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl">
            Editorial perspectives on brand empowerment, storytelling, and the cinematic process.
          </p>
        </header>

        {/* Editorial Grid */}
        {posts.length === 0 ? (
          <div className="py-32 border-t border-gray-200">
            <p className="text-xl text-gray-400 font-light">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {posts.map((post) => (
              <Link key={post.id} href={`/insights/${post.slug}`} className="group flex flex-col">
                {/* Image */}
                <div className="relative w-full aspect-[4/3] bg-gray-100 mb-6 overflow-hidden">
                  {post.featuredImage ? (
                    <Image 
                      src={post.featuredImage.url} 
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200" />
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center space-x-4 mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                  {post.category && <span>{post.category.name}</span>}
                  {post.publishDate && (
                    <>
                      <span>•</span>
                      <span>{post.publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors mb-4 line-clamp-3">
                  {post.title}
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-gray-600 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
