'use client'

import { useState, useRef, useEffect } from 'react'
import { UploadCloud, Image as ImageIcon, Loader2 } from 'lucide-react'

type MediaAsset = {
  id: string
  url: string
  filename: string
  width: number
  height: number
}

export default function MediaLibraryPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // In a real app we'd fetch these from an API
  // useEffect(() => { fetchAssets() }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadError(null)

    const formData = new FormData()
    formData.append('file', files[0])

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      
      setAssets(prev => [data.asset, ...prev])
    } catch (err: any) {
      setUploadError(err.message)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Media Library</h1>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition"
        >
          {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <UploadCloud className="w-4 h-4 mr-2" />}
          Upload Image
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/jpeg,image/png,image/webp,image/avif" 
        />
      </div>

      {uploadError && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {uploadError}
        </div>
      )}

      {assets.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-xl">
          <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No media assets found.</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Upload your first image to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <div key={asset.id} className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <div className="aspect-square bg-gray-100 dark:bg-zinc-800 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset.url} alt={asset.filename} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate dark:text-gray-200">{asset.filename}</p>
                <p className="text-xs text-gray-500">{asset.width}x{asset.height}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
