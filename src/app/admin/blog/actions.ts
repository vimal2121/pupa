'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function saveBlogAction(formData: FormData) {
  const id = formData.get('id') as string | null
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  
  // Optional metadata
  const excerpt = formData.get('excerpt') as string | null
  const author = formData.get('author') as string | null
  const seoTitle = formData.get('seoTitle') as string | null
  const seoDescription = formData.get('seoDescription') as string | null
  
  // Relationships
  const categoryName = formData.get('category') as string | null
  const tagsStr = formData.get('tags') as string | null
  
  // Media
  const featuredImageId = formData.get('featuredImageId') as string | null
  const ogImageId = formData.get('ogImageId') as string | null

  // State
  const status = formData.get('status') as string || 'DRAFT'
  const isPublished = status === 'PUBLISHED'

  // Ensure unique slug logic
  let finalSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  
  const existing = await prisma.blogPost.findUnique({ where: { slug: finalSlug } })
  if (existing && existing.id !== id) {
    finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`
  }

  // Handle Category upsert
  let categoryId = null
  if (categoryName) {
    const catSlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const cat = await prisma.blogCategory.upsert({
      where: { slug: catSlug },
      update: { name: categoryName },
      create: { name: categoryName, slug: catSlug }
    })
    categoryId = cat.id
  }

  // Handle Tags upsert
  const tagConnects: { id: string }[] = []
  if (tagsStr) {
    const tagNames = tagsStr.split(',').map(t => t.trim()).filter(t => t)
    for (const t of tagNames) {
      const tSlug = t.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const tag = await prisma.blogTag.upsert({
        where: { slug: tSlug },
        update: { name: t },
        create: { name: t, slug: tSlug }
      })
      tagConnects.push({ id: tag.id })
    }
  }

  const payload = {
    title,
    slug: finalSlug,
    content,
    excerpt,
    author,
    seoTitle,
    seoDescription,
    status,
    categoryId,
    featuredImageId,
    ogImageId,
    publishDate: isPublished ? new Date() : null,
    tags: {
      set: tagConnects
    }
  }

  if (id) {
    await prisma.blogPost.update({
      where: { id },
      data: payload
    })
  } else {
    await prisma.blogPost.create({
      data: payload
    })
  }

  revalidatePath('/admin/blog')
  revalidatePath('/insights')
  
  if (id) {
    revalidatePath(`/insights/${finalSlug}`)
  }

  return { success: true, redirect: '/admin/blog' }
}

export async function deleteBlogAction(id: string) {
  await prisma.blogPost.delete({ where: { id } })
  revalidatePath('/admin/blog')
  revalidatePath('/insights')
  return { success: true }
}
