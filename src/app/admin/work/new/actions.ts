'use server'

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function createProjectAction(formData: FormData) {
  const title = formData.get('title') as string
  let slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const challenge = formData.get('challenge') as string
  const strategy = formData.get('strategy') as string
  const story = formData.get('story') as string
  const youtubeUrl = formData.get('youtubeUrl') as string
  const seoTitle = formData.get('seoTitle') as string
  const seoDescription = formData.get('seoDescription') as string
  const published = formData.get('published') === 'true'
  const featured = formData.get('featured') === 'true'

  const thumbnailId = formData.get('thumbnailId') as string | null
  const heroImageId = formData.get('heroImageId') as string | null
  const ogImageId = formData.get('ogImageId') as string | null
  
  // Gallery IDs will be a comma separated string
  const galleryIdsStr = formData.get('galleryIds') as string | null
  const galleryIds = galleryIdsStr ? galleryIdsStr.split(',').filter(Boolean) : []

  if (!title) {
    return { error: 'Title is required' }
  }

  // Auto-generate slug if left blank
  if (!slug) {
    slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)
  }

  try {
    await prisma.project.create({
      data: {
        title,
        slug,
        description,
        challenge,
        strategy,
        story,
        youtubeUrl,
        seoTitle,
        seoDescription,
        published,
        featured,
        thumbnailId: thumbnailId || null,
        heroImageId: heroImageId || null,
        ogImageId: ogImageId || null,
        gallery: {
          connect: galleryIds.map(gId => ({ id: gId }))
        }
      }
    })
  } catch (error) {
    console.error('Create error', error)
    return { error: 'Failed to create project' }
  }

  revalidatePath('/admin/work')
  redirect('/admin/work')
}
