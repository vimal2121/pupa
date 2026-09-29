'use client'

import { useState } from 'react'
import { MediaSelector } from '@/components/admin/MediaSelector'
import { Image as ImageIcon, Loader2, X } from 'lucide-react'
import { saveSettingsAction } from './actions'
import { useRouter } from 'next/navigation'

export function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [logoUrl, setLogoUrl] = useState<string | null>(initialSettings.logo_url || null)
  const [faviconUrl, setFaviconUrl] = useState<string | null>(initialSettings.favicon_url || null)
  const [homeHeroMedia, setHomeHeroMedia] = useState<string | null>(initialSettings.home_hero_media || null)

  const [activeSelector, setActiveSelector] = useState<'logo' | 'favicon' | 'homeHero' | null>(null)

  const handleMediaSelect = (assets: any[]) => {
    if (assets.length === 0) return
    if (activeSelector === 'logo') setLogoUrl(assets[0].url)
    if (activeSelector === 'favicon') setFaviconUrl(assets[0].url)
    if (activeSelector === 'homeHero') setHomeHeroMedia(assets[0].url)
  }

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    if (logoUrl) formData.append('logoUrl', logoUrl)
    if (faviconUrl) formData.append('faviconUrl', faviconUrl)
    if (homeHeroMedia) formData.append('homeHeroMedia', homeHeroMedia)

    const res = await saveSettingsAction(formData)
    
    setIsLoading(false)
    if (res?.error) {
      setError(res.error)
    } else {
      setSuccess(true)
      router.refresh()
    }
  }

  const renderPicker = (label: string, field: 'logo' | 'favicon', currentUrl: string | null) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      {currentUrl ? (
        <div className="relative w-full max-w-sm aspect-video rounded-lg overflow-hidden border border-gray-200 cursor-pointer group bg-gray-50 dark:bg-zinc-800" onClick={() => setActiveSelector(field)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentUrl} alt={label} className="w-full h-full object-contain p-4 transition group-hover:opacity-75" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full pointer-events-none">Change</span>
          </div>
          <button 
            type="button"
            onClick={(e) => { 
              e.stopPropagation(); 
              if (field === 'logo') setLogoUrl(null)
              else if (field === 'favicon') setFaviconUrl(null)
              else if (field === 'homeHero') setHomeHeroMedia(null)
            }}
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
      <form action={handleSubmit} className="space-y-8 max-w-4xl">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">Brand Identity</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {renderPicker('Primary Logo (Header)', 'logo', logoUrl)}
            {renderPicker('Favicon (Browser Tab Icon)', 'favicon', faviconUrl)}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">Homepage Media</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {renderPicker('Hero Background Image/Video', 'homeHero', homeHeroMedia)}
          </div>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{error}</div>}
        {success && <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm border border-green-100">Settings saved successfully!</div>}

        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={isLoading}
            className="flex items-center px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 transition"
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Settings
          </button>
        </div>
      </form>

      <MediaSelector 
        isOpen={activeSelector !== null}
        onClose={() => setActiveSelector(null)}
        multiple={false}
        onSelect={handleMediaSelect}
      />
    </>
  )
}
