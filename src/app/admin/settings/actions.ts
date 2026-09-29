'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function saveSettingsAction(formData: FormData) {
  const logoUrl = formData.get('logoUrl') as string | null
  const faviconUrl = formData.get('faviconUrl') as string | null
  const homeHeroMedia = formData.get('homeHeroMedia') as string | null

  try {
    if (logoUrl) {
      await prisma.siteSetting.upsert({
        where: { key: 'logo_url' },
        update: { value: logoUrl },
        create: { key: 'logo_url', value: logoUrl }
      })
    }
    
    if (faviconUrl) {
      await prisma.siteSetting.upsert({
        where: { key: 'favicon_url' },
        update: { value: faviconUrl },
        create: { key: 'favicon_url', value: faviconUrl }
      })
    }

    if (homeHeroMedia) {
      await prisma.siteSetting.upsert({
        where: { key: 'home_hero_media' },
        update: { value: homeHeroMedia },
        create: { key: 'home_hero_media', value: homeHeroMedia }
      })
    }

    // Revalidate the entire site so the new logo and favicon appear everywhere immediately
    revalidatePath('/', 'layout')
    
    return { success: true }
  } catch (error) {
    console.error('Error saving settings', error)
    return { error: 'Failed to save settings' }
  }
}
