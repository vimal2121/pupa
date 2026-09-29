'use client'

import { useState, useEffect, useRef } from 'react'
import { X, UploadCloud, CheckCircle2, Loader2, Search } from 'lucide-react'

type MediaAsset = {
  id: string
  url: string
  filename: string
  width: number
  height: number
}

interface MediaSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (assets: MediaAsset[]) => void
  multiple?: boolean
}

export function MediaSelector({ isOpen, onClose, onSelect, multiple = false }: MediaSelectorProps) {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [search, setSearch] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      fetchMedia()
    }
  }, [isOpen, search])

  const fetchMedia = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/media${search ? `?q=${search}` : ''}`)
      const data = await res.json()
      if (data.assets) setAssets(data.assets)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', files[0])

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.asset) {
        setAssets(prev => [data.asset, ...prev])
        handleToggleSelect(data.asset.id)
      }
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        if (!multiple) newSet.clear()
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleConfirm = () => {
    const selectedAssets = assets.filter(a => selectedIds.has(a.id))
    onSelect(selectedAssets)
    setSelectedIds(new Set())
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-5xl h-full max-h-[85vh] rounded-2xl flex flex-col shadow-2xl border border-gray-200 dark:border-zinc-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold dark:text-white">Media Library</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search images..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-black dark:text-white outline-none"
            />
          </div>

          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition"
          >
            {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <UploadCloud className="w-4 h-4 mr-2" />}
            Upload
          </button>
          <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
        </div>

        {/* Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : assets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p>No media found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {assets.map((asset) => {
                const isSelected = selectedIds.has(asset.id)
                return (
                  <div 
                    key={asset.id} 
                    onClick={() => handleToggleSelect(asset.id)}
                    className={`relative group rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${isSelected ? 'border-blue-500' : 'border-gray-200 dark:border-zinc-800'}`}
                  >
                    <div className="aspect-square bg-gray-100 dark:bg-zinc-800 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={asset.url} alt={asset.filename} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-gray-50 dark:bg-zinc-950 rounded-b-2xl">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {selectedIds.size} image{selectedIds.size !== 1 && 's'} selected
          </p>
          <div className="space-x-3">
            <button onClick={onClose} className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
              Cancel
            </button>
            <button 
              onClick={handleConfirm}
              disabled={selectedIds.size === 0}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 transition"
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
