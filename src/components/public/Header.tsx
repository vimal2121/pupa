'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export function Header({ logoUrl = '/logo.png' }: { logoUrl?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Work', href: '/work' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Insights', href: '/insights' },
    { name: 'Rates', href: '/rates' },
    { name: 'Let\'s Talk', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="w-full max-w-screen-2xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link 
          href="/" 
          className="relative h-10 w-40 md:h-12 md:w-48 flex-shrink-0"
          aria-label="Pupa Homepage"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image 
            src={logoUrl} 
            alt="Pupa Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>
        
        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-12 text-sm font-medium uppercase tracking-widest text-gray-900">
          {navLinks.map(link => (
            <Link 
              key={link.name}
              href={link.href} 
              className="hover:text-gray-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded px-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="md:hidden text-gray-900 p-2 z-[60]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE FULL-SCREEN NAV */}
      <div 
        className={`fixed inset-0 bg-white z-50 transition-transform duration-500 ease-in-out md:hidden flex flex-col justify-center px-6 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex flex-col space-y-8 text-4xl font-light tracking-tight text-black">
          {navLinks.map(link => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-gray-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black inline-block w-fit"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
