import { PrismaClient } from '@prisma/client'
import { BlogForm } from '@/components/admin/BlogForm'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: {
      category: true,
      tags: true,
      featuredImage: true,
      ogImage: true
    }
  })

  if (!post) notFound()

  return <BlogForm initialData={post} />
}
