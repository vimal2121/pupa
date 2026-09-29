import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'

const prisma = new PrismaClient()

export default async function BlogIndexPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Blog & Insights</h1>
        <Link 
          href="/admin/blog/new"
          className="flex items-center px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-80 transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Article
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Title</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition">
                <td className="px-6 py-4 font-medium dark:text-white">{post.title}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${post.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{post.category?.name || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{post.createdAt.toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/blog/${post.id}`} className="text-gray-400 hover:text-black dark:hover:text-white transition">
                    <Edit className="w-4 h-4 inline" />
                  </Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No articles found. Start writing!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
