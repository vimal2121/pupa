import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const videos = [
  { url: 'https://www.youtube.com/watch?v=pNPFRyA3JW4', id: 'pNPFRyA3JW4', title: 'Pupa Brand Film 01' },
  { url: 'https://www.youtube.com/watch?v=LGWqsZJ6r1w&pp=0gcJCS8MAYcqIYzv', id: 'LGWqsZJ6r1w', title: 'Strategic Engagement 02' },
  { url: 'https://www.youtube.com/watch?v=wW23ZTvlFdM', id: 'wW23ZTvlFdM', title: 'Launch Campaign 03' },
  { url: 'https://www.youtube.com/watch?v=esWPYPQPlj8', id: 'esWPYPQPlj8', title: 'Culture & Talent 04' },
  { url: 'https://www.youtube.com/watch?v=rUGT_Q4gHXs', id: 'rUGT_Q4gHXs', title: 'Bespoke Visuals 05' },
  { url: 'https://www.youtube.com/watch?v=O03jEnPjwJE', id: 'O03jEnPjwJE', title: 'Editorial Short 06' },
  { url: 'https://www.youtube.com/watch?v=JDbJ7qODktI', id: 'JDbJ7qODktI', title: 'Cinematic Portrait 07' },
]

async function main() {
  console.log('Seeding works...')

  for (const [index, video] of videos.entries()) {
    const slug = video.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`

    // Create media asset for thumbnail
    const thumbnail = await prisma.mediaAsset.create({
      data: {
        filename: `${video.id}.jpg`,
        originalName: `${video.id}.jpg`,
        mimeType: 'image/jpeg',
        size: 0,
        url: thumbnailUrl,
        altText: video.title
      }
    })

    // Create project
    await prisma.project.upsert({
      where: { slug },
      update: {
        youtubeUrl: video.url,
        thumbnailId: thumbnail.id,
        featured: true,
        published: true
      },
      create: {
        title: video.title,
        slug,
        youtubeUrl: video.url,
        thumbnailId: thumbnail.id,
        featured: true,
        published: true,
        description: `An exclusive showcase of ${video.title} produced by Pupa.`,
        year: '2026',
        client: 'Pupa Partners'
      }
    })

    console.log(`✅ Seeded: ${video.title}`)
  }

  console.log('Done!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
