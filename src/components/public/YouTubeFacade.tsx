'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

export function YouTubeFacade({ videoId, title }: { videoId: string, title: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  
  if (isPlaying) {
    return (
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
        className="w-full h-full"
      />
    )
  }

  // Use maxresdefault for high-quality thumbnail
  return (
    <div 
      className="relative w-full h-full cursor-pointer group bg-gray-100 overflow-hidden"
      onClick={() => setIsPlaying(true)}
      onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') setIsPlaying(true) }}
      role="button"
      tabIndex={0}
      aria-label={`Play video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700 flex items-center justify-center">
        <div className="w-20 h-20 bg-white flex items-center justify-center rounded-full shadow-2xl scale-95 group-hover:scale-100 transition-transform duration-500">
          <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
        </div>
      </div>
    </div>
  )
}
