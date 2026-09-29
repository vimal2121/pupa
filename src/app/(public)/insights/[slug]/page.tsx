import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const prisma = new PrismaClient()

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { ogImage: true, featuredImage: true }
  })
  
  if (!post) return {}
  
  return {
    title: `${post.seoTitle || post.title} | Pupa Insights`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
      images: post.ogImage ? [post.ogImage.url] : post.featuredImage ? [post.featuredImage.url] : [],
      type: 'article',
      publishedTime: post.publishDate?.toISOString(),
      authors: post.author ? [post.author] : undefined,
    }
  }
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: true,
      featuredImage: true,
    }
  })

  if (!post || post.status !== 'PUBLISHED') notFound()

  // Find related articles (same category)
  const relatedPosts = post.categoryId ? await prisma.blogPost.findMany({
    where: { 
      status: 'PUBLISHED', 
      categoryId: post.categoryId,
      id: { not: post.id }
    },
    take: 2,
    include: { featuredImage: true, category: true }
  }) : []

  return (
    <main className="w-full bg-white text-black min-h-screen pt-24 pb-48">
      
      {/* ARTICLE HEADER */}
      <header className="w-full max-w-4xl mx-auto px-6 text-center mb-16 md:mb-24">
        <div className="flex items-center justify-center space-x-4 mb-8 text-xs font-bold uppercase tracking-widest text-gray-500">
          {post.category && <span>{post.category.name}</span>}
          {post.publishDate && (
            <>
              <span>•</span>
              <time dateTime={post.publishDate.toISOString()}>
                {post.publishDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
            </>
          )}
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-8">
          {post.title}
        </h1>
        
        {post.author && (
          <p className="text-sm font-medium text-gray-900 uppercase tracking-widest">
            By {post.author}
          </p>
        )}
      </header>

      {/* FEATURED IMAGE */}
      {post.featuredImage && (
        <div className="w-full max-w-screen-2xl mx-auto px-6 mb-16 md:mb-24">
          <div className="relative w-full aspect-[21/9] md:aspect-[2.35/1] bg-gray-100 overflow-hidden">
            <Image 
              src={post.featuredImage.url} 
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* ARTICLE BODY */}
      <article className="w-full max-w-3xl mx-auto px-6">
        <div 
          className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#51237F] prose-a:underline-offset-4 prose-img:rounded-lg prose-img:w-full prose-p:font-light prose-p:leading-relaxed prose-p:text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* TAGS */}
        {post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag.id} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs uppercase tracking-widest font-bold rounded">
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <section className="w-full max-w-screen-2xl mx-auto px-6 mt-32 pt-32 border-t border-gray-200">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-16 text-center">
            Read Next
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {relatedPosts.map(rp => (
              <Link key={rp.id} href={`/insights/${rp.slug}`} className="group flex flex-col">
                <div className="relative w-full aspect-[4/3] bg-gray-100 mb-6 overflow-hidden">
                  {rp.featuredImage && (
                    <Image 
                      src={rp.featuredImage.url} 
                      alt={rp.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors">
                  {rp.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.seoTitle || post.title,
            "description": post.seoDescription || post.excerpt,
            "image": post.featuredImage?.url,
            "datePublished": post.publishDate?.toISOString(),
            "dateModified": post.updatedAt.toISOString(),
            "author": post.author ? {
              "@type": "Person",
              "name": post.author
            } : {
              "@type": "Organization",
              "name": "Pupa"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Pupa",
              "logo": {
                "@type": "ImageObject",
                "url": "https://pupa.com/logo.png"
              }
            }
          })
        }}
      />
    </main>
  )
}
