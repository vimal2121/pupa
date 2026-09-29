'use client'

import { useEffect, useRef } from 'react'

interface ScrollHintProps {
  children: React.ReactNode
  className?: string
}

export function ScrollHint({ children, className = '' }: ScrollHintProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run the hint animation on mobile
    if (window.innerWidth >= 768) return

    const hintTimeout = setTimeout(() => {
      if (scrollRef.current) {
        // Scroll slightly to the right to hint at content
        scrollRef.current.scrollTo({
          left: 80,
          behavior: 'smooth'
        })
        
        // Smoothly return to the start
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              left: 0,
              behavior: 'smooth'
            })
          }
        }, 1000)
      }
    }, 1500) // Wait 1.5s after page load to perform the peek

    return () => clearTimeout(hintTimeout)
  }, [])

  return (
    <div 
      ref={scrollRef} 
      className={`w-full overflow-x-auto -webkit-overflow-scrolling-touch ${className}`}
    >
      {children}
    </div>
  )
}
