'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveBlogAction } from '@/app/admin/blog/actions'
import { MediaSelector } from '@/components/admin/MediaSelector'
import { TiptapEditor } from '@/components/admin/TiptapEditor'
import { Loader2, Image as ImageIcon, X } from 'lucide-react'

export function BlogForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeMediaSelector, setActiveMediaSelector] = useState<'featured' | 'og' | null>(null)

  // Form State
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [category, setCategory] = useState(initialData?.category?.name || '')
  const [tags, setTags] = useState(initialData?.tags?.map((t: any) => t.name).join(', ') || '')
  const [author, setAuthor] = useState(initialData?.author || '')
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '')
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || '')
  const [status, setStatus] = useState(initialData?.status || 'DRAFT')

  const [featuredImage, setFeaturedImage] = useState<any>(initialData?.featuredImage || null)
  const [ogImage, setOgImage] = useState<any>(initialData?.ogImage || null)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (!initialData) {
      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
    }
  }

  const handleMediaSelect = (assets: any[]) => {
    if (assets.length === 0) return
    if (activeMediaSelector === 'featured') setFeaturedImage(assets[0])
    if (activeMediaSelector === 'og') setOgImage(assets[0])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    if (initialData?.id) formData.append('id', initialData.id)
    
    formData.append('title', title)
    formData.append('slug', slug)
    formData.append('content', content)
    formData.append('excerpt', excerpt)
    formData.append('category', category)
    formData.append('tags', tags)
    formData.append('author', author)
    formData.append('seoTitle', seoTitle)
    formData.append('seoDescription', seoDescription)
    formData.append('status', status)

    if (featuredImage) formData.append('featuredImageId', featuredImage.id)
    if (ogImage) formData.append('ogImageId', ogImage.id)

    const res = await saveBlogAction(formData)
    setIsLoading(false)
    if (res.success) {
      router.push(res.redirect)
    }
  }

  const renderMediaBox = (label: string, field: 'featured' | 'og', currentAsset: any, setAsset: any) => (
    <div className="bg-white dark:bg-zinc-900 p-6 border border-gray-200 dark:border-zinc-800 rounded-xl">
      <h3 className="text-sm font-semibold mb-4 dark:text-white">{label}</h3>
      {currentAsset ? (
        <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentAsset.url} alt={label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
            <button type="button" onClick={() => setActiveMediaSelector(field)} className="bg-white text-black px-4 py-2 rounded text-sm font-medium mr-2">Change</button>
            <button type="button" onClick={() => setAsset(null)} className="bg-red-600 text-white p-2 rounded"><X className="w-4 h-4" /></button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setActiveMediaSelector(field)} className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-lg hover:border-black dark:hover:border-gray-400 transition">
          <ImageIcon className="w-6 h-6 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500 font-medium">Select Image</span>
        </button>
      )}
    </div>
  )

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8 pb-32">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold dark:text-white">{initialData ? 'Edit Article' : 'New Article'}</h1>
          <div className="flex items-center space-x-4">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 dark:text-white">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
            <button type="submit" disabled={isLoading} className="flex items-center px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-80 transition disabled:opacity-50">
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {initialData ? 'Update Article' : 'Save Article'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-6 border border-gray-200 dark:border-zinc-800 rounded-xl space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input required type="text" value={title} onChange={handleTitleChange} className="w-full p-3 border border-gray-200 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                <TiptapEditor content={content} onChange={setContent} />
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 border border-gray-200 dark:border-zinc-800 rounded-xl space-y-6">
              <h2 className="text-lg font-semibold dark:text-white">SEO & Metadata</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Excerpt</label>
                <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3} className="w-full p-3 border border-gray-200 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Title</label>
                  <input type="text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug</label>
                  <input required type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Description</label>
                <textarea value={seoDescription} onChange={e => setSeoDescription(e.target.value)} rows={2} className="w-full p-3 border border-gray-200 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-6 border border-gray-200 dark:border-zinc-800 rounded-xl space-y-6">
              <h2 className="text-lg font-semibold dark:text-white">Organization</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author</label>
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Brand Strategy" className="w-full p-3 border border-gray-200 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma separated)</label>
                <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="e.g. video, marketing, b2b" className="w-full p-3 border border-gray-200 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 dark:text-white" />
              </div>
            </div>

            {renderMediaBox('Featured Image', 'featured', featuredImage, setFeaturedImage)}
            {renderMediaBox('Open Graph / Social Image', 'og', ogImage, setOgImage)}
          </div>
        </div>
      </form>

      <MediaSelector 
        isOpen={activeMediaSelector !== null}
        onClose={() => setActiveMediaSelector(null)}
        multiple={false}
        onSelect={handleMediaSelect}
      />
    </>
  )
}
