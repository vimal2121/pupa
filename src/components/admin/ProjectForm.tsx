'use client'

import { useState } from 'react'
import { MediaSelector } from '@/components/admin/MediaSelector'
import { Image as ImageIcon, Loader2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createProjectAction } from '@/app/admin/work/new/actions'
import { updateProjectAction } from '@/app/admin/work/[id]/actions'

export function ProjectForm({ project }: { project?: any }) {
  const router = useRouter()
  const isEdit = !!project
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Media states
  const [thumbnail, setThumbnail] = useState<any>(project?.thumbnail || null)
  const [heroImage, setHeroImage] = useState<any>(project?.heroImage || null)
  const [ogImage, setOgImage] = useState<any>(project?.ogImage || null)
  const [gallery, setGallery] = useState<any[]>(project?.gallery || [])

  // Media Modal state
  const [activeSelector, setActiveSelector] = useState<'thumbnail' | 'hero' | 'og' | 'gallery' | null>(null)

  const handleMediaSelect = (assets: any[]) => {
    if (assets.length === 0) return
    
    if (activeSelector === 'thumbnail') setThumbnail(assets[0])
    if (activeSelector === 'hero') setHeroImage(assets[0])
    if (activeSelector === 'og') setOgImage(assets[0])
    if (activeSelector === 'gallery') {
      // Append selected to gallery
      const newAssets = assets.filter(a => !gallery.find(g => g.id === a.id))
      setGallery([...gallery, ...newAssets])
    }
  }

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    if (thumbnail) formData.append('thumbnailId', thumbnail.id)
    if (heroImage) formData.append('heroImageId', heroImage.id)
    if (ogImage) formData.append('ogImageId', ogImage.id)
    if (gallery.length > 0) formData.append('galleryIds', gallery.map(g => g.id).join(','))
    
    // Convert checkbox states
    const isPub = formData.get('published') === 'on'
    const isFeat = formData.get('featured') === 'on'
    formData.delete('published')
    formData.delete('featured')
    formData.append('published', isPub ? 'true' : 'false')
    formData.append('featured', isFeat ? 'true' : 'false')

    let res
    if (isEdit) {
      res = await updateProjectAction(project.id, formData)
    } else {
      res = await createProjectAction(formData)
    }
    
    if (res?.error) {
      setError(res.error)
      setIsLoading(false)
    }
  }

  const renderSingleMediaPicker = (label: string, field: 'thumbnail' | 'hero' | 'og', current: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      {current ? (
        <div className="relative w-full max-w-sm aspect-video rounded-lg overflow-hidden border border-gray-200 cursor-pointer group" onClick={() => setActiveSelector(field)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.url} alt={label} className="w-full h-full object-cover transition group-hover:opacity-75" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full pointer-events-none">Change</span>
          </div>
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); field === 'thumbnail' ? setThumbnail(null) : field === 'hero' ? setHeroImage(null) : setOgImage(null) }}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button 
          type="button"
          onClick={() => setActiveSelector(field)}
          className="flex flex-col items-center justify-center w-full max-w-sm aspect-video border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-lg hover:border-black dark:hover:border-gray-400 transition"
        >
          <ImageIcon className="w-6 h-6 text-gray-400 mb-2" />
          <span className="text-sm font-medium text-gray-500">Select Image</span>
        </button>
      )}
    </div>
  )

  return (
    <>
      <form action={handleSubmit} className="space-y-8">
        
        {/* Main Content */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Title *</label>
              <input name="title" type="text" required defaultValue={project?.title || ''} className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL Slug *</label>
              <input name="slug" type="text" required defaultValue={project?.slug || ''} placeholder="Leave blank to auto-generate" className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:text-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">YouTube Video URL</label>
            <input name="youtubeUrl" type="url" defaultValue={project?.youtubeUrl || ''} placeholder="https://youtube.com/watch?v=..." className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:text-white" />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea name="description" rows={3} defaultValue={project?.description || ''} className="w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Challenge</label>
              <textarea name="challenge" rows={3} defaultValue={project?.challenge || ''} className="w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Strategy</label>
              <textarea name="strategy" rows={3} defaultValue={project?.strategy || ''} className="w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Story</label>
              <textarea name="story" rows={3} defaultValue={project?.story || ''} className="w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:text-white" />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">Media & Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {renderSingleMediaPicker('Thumbnail Image (Lists & Grids)', 'thumbnail', thumbnail)}
            {renderSingleMediaPicker('Hero Image (Top of Project Page)', 'hero', heroImage)}
          </div>

          <div className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Gallery (Multiple Images)</label>
              <button type="button" onClick={() => setActiveSelector('gallery')} className="text-sm text-blue-600 font-medium">Add Images</button>
            </div>
            
            {gallery.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallery.map((g, idx) => (
                  <div key={g.id} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.url} alt="Gallery" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/80"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-lg text-center">
                <p className="text-gray-500 text-sm">No gallery images added yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Settings & SEO */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">Settings & SEO</h2>
          
          <div className="flex gap-8 mb-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="published" defaultChecked={project?.published ?? true} className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Published</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Featured Project</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Title</label>
                <input name="seoTitle" type="text" defaultValue={project?.seoTitle || ''} className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Description</label>
                <textarea name="seoDescription" rows={3} defaultValue={project?.seoDescription || ''} className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:text-white" />
              </div>
            </div>
            <div>
              {renderSingleMediaPicker('Open Graph Image (Social Share)', 'og', ogImage)}
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button 
            type="button"
            onClick={() => router.push('/admin/work')}
            className="px-6 py-2 text-gray-600 dark:text-gray-300 font-medium hover:text-black dark:hover:text-white"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isLoading}
            className="flex items-center px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 transition"
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isEdit ? 'Save Changes' : 'Create Project'}
          </button>
        </div>
      </form>

      <MediaSelector 
        isOpen={activeSelector !== null}
        onClose={() => setActiveSelector(null)}
        multiple={activeSelector === 'gallery'}
        onSelect={handleMediaSelect}
      />
    </>
  )
}
