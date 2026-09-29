import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const blogs = [
  {
    title: "Why Cinematic Storytelling is the Future of B2B Marketing",
    slug: "cinematic-storytelling-b2b",
    excerpt: "The days of dry, corporate case studies are over. To capture attention in a saturated market, B2B brands must adopt the narrative techniques of cinema.",
    content: "<p>In an era where attention is the most valuable currency, traditional B2B marketing is failing. Decision-makers are humans first, and humans are hardwired to respond to narrative.</p><p>Cinematic storytelling isn't just about using expensive cameras; it's about tension, pacing, and emotional resonance. When a brand film utilizes these elements, it bypasses the logical filters of the brain and speaks directly to the emotional core, where actual purchasing decisions are made.</p>",
    category: "Brand Strategy",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "The 3-Second Rule: Engineering Viral Hooks",
    slug: "engineering-viral-hooks",
    excerpt: "You have precisely 3 seconds to stop a scroll. Here is the mathematical framework behind visual hooks that demand attention.",
    content: "<p>The algorithm is ruthless. If your video doesn't hook the viewer in the first three seconds, it is dead on arrival.</p><p>At Pupa, we engineer hooks based on pattern interruption. The human brain filters out expected visuals. To capture attention, you must present an image or concept that violates the viewer's expectations, forcing their brain to pause and process the anomaly.</p>",
    category: "Social Media",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Building Internal Culture Through Film",
    slug: "building-internal-culture-film",
    excerpt: "Your best recruitment tool isn't a job description. It's an authentic, documentary-style look into the soul of your company.",
    content: "<p>Top talent doesn't just want a paycheck; they want a mission. Employee attraction films must move beyond the sterile 'talking head' interviews in a well-lit office.</p><p>By utilizing documentary filmmaking techniques—unscripted interactions, environmental capture, and raw honesty—we build a magnetic culture asset that attracts top-tier talent while simultaneously repelling those who do not align with your core values.</p>",
    category: "Corporate Culture",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Brand Empowerment: Moving Beyond the Agency Model",
    slug: "brand-empowerment-beyond-agency",
    excerpt: "Why we call ourselves a Brand Empowerment company rather than a production agency, and why it matters to your bottom line.",
    content: "<p>A traditional agency executes a brief. A brand empowerment company discovers the underlying truth of your organization and engineers a visual asset to deploy it.</p><p>We don't sell videos. We sell the predefined feeling that your customers experience when they interact with your brand. The film is simply the most effective medium to deliver that feeling continuously and at scale.</p>",
    category: "Philosophy",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
  }
]

async function main() {
  console.log('Seeding blogs...')

  // Ensure 'Philosophy' category exists
  let defaultCategory = await prisma.blogCategory.findFirst({
    where: { slug: 'philosophy' }
  })
  if (!defaultCategory) {
    defaultCategory = await prisma.blogCategory.create({
      data: { name: 'Philosophy', slug: 'philosophy' }
    })
  }

  for (const blog of blogs) {
    // Create category if not exist
    let category = await prisma.blogCategory.findFirst({
      where: { name: blog.category }
    })
    if (!category) {
      category = await prisma.blogCategory.create({
        data: { name: blog.category, slug: blog.category.toLowerCase().replace(/ /g, '-') }
      })
    }

    // Create featured image
    const featuredImage = await prisma.mediaAsset.create({
      data: {
        filename: `${blog.slug}-cover.jpg`,
        originalName: `${blog.slug}-cover.jpg`,
        mimeType: 'image/jpeg',
        size: 0,
        url: blog.imageUrl,
        altText: blog.title
      }
    })

    // Upsert blog
    await prisma.blogPost.upsert({
      where: { slug: blog.slug },
      update: {
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        status: 'PUBLISHED',
        featuredImageId: featuredImage.id,
        categoryId: category.id
      },
      create: {
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        status: 'PUBLISHED',
        author: 'Pupa Editorial',
        featuredImageId: featuredImage.id,
        categoryId: category.id
      }
    })

    console.log(`✅ Seeded Blog: ${blog.title}`)
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
