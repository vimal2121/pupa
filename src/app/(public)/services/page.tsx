import type { Metadata } from 'next'
import Link from 'next/link'
import { servicesData } from '@/data/services'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services | Pupa',
  description: 'A modular engagement model for brand empowerment through cinematic storytelling.',
}

export default function ServicesIndexPage() {
  return (
    <main className="w-full bg-white text-black min-h-screen pt-32 pb-48">
      <div className="w-full max-w-screen-2xl mx-auto px-6">
        
        {/* HEADER */}
        <header className="mb-24">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">Capabilities</h1>
          <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl">
            We operate through a modular engagement model, adapting our cinematic approach to solve specific business challenges.
          </p>
        </header>

        {/* SERVICES LIST */}
        <ul className="flex flex-col divide-y divide-gray-200 border-y border-gray-200">
          {servicesData.map((service) => (
            <li key={service.slug} className="group">
              <Link 
                href={`/services/${service.slug}`} 
                className="flex flex-col md:flex-row md:items-center justify-between py-12 md:py-16 hover:bg-gray-50 transition-colors duration-500 focus-visible:outline-none focus-visible:bg-gray-50 focus-visible:ring-2 focus-visible:ring-black px-4 -mx-4 rounded"
              >
                <div className="max-w-4xl">
                  <span className="block text-4xl md:text-7xl font-light tracking-tight text-gray-900 group-hover:translate-x-4 transition-transform duration-500 mb-4">
                    {service.title}
                  </span>
                  <p className="text-gray-500 text-lg md:text-xl font-light opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-500 delay-75">
                    {service.headline}
                  </p>
                </div>
                <div className="mt-8 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowRight className="w-8 h-8 text-black" />
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </main>
  )
}
