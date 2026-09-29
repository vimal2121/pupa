import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
import { Plus } from 'lucide-react'
import { DeleteProjectButton } from '@/components/admin/DeleteProjectButton'

const prisma = new PrismaClient()

export default async function WorkPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Work / Projects</h1>
        <Link 
          href="/admin/work/new"
          className="flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950">
              <th className="px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Title</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No projects found. Create one!
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-zinc-950/50">
                  <td className="px-6 py-4 font-medium dark:text-white">{project.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${project.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300'}`}>
                      {project.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link href={`/admin/work/${project.id}`} className="text-blue-600 hover:underline mr-4">Edit</Link>
                    <DeleteProjectButton id={project.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
