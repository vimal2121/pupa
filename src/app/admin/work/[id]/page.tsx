import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { ProjectForm } from '@/components/admin/ProjectForm'

const prisma = new PrismaClient()

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const project = await prisma.project.findUnique({
    where: { id },
    include: { 
      thumbnail: true,
      heroImage: true,
      ogImage: true,
      gallery: true,
    }
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Edit Project: {project.title}</h1>
      </div>

      <ProjectForm project={project} />
    </div>
  )
}
