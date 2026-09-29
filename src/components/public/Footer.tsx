import Link from 'next/link'
import Image from 'next/image'

export function Footer({ logoUrl = '/logo.png' }: { logoUrl?: string }) {
  return (
    <footer className="w-full bg-[#51237F] text-white pt-24 pb-12 px-6">
      <div className="w-full max-w-screen-2xl mx-auto flex flex-col">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          <div className="md:col-span-6 flex flex-col items-start">
            <Link href="/" className="relative h-12 w-32 md:h-16 md:w-48 mb-8 block opacity-90 hover:opacity-100 transition-opacity">
              <Image 
                src={logoUrl} 
                alt="Pupa Logo"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-gray-400 max-w-sm font-light leading-relaxed">
              A speciality Brand Empowerment company through storytelling, using films as the medium.
            </p>
          </div>
          
          <div className="md:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">Sitemap</h4>
            <Link href="/work" className="hover:text-gray-300 transition-colors">Work</Link>
            <Link href="/services" className="hover:text-gray-300 transition-colors">Services</Link>
            <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
            <Link href="/insights" className="hover:text-gray-300 transition-colors">Insights</Link>
          </div>

          <div className="md:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">Social</h4>
            <a href="#" className="hover:text-gray-300 transition-colors">Instagram</a>
            <a href="#" className="hover:text-gray-300 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-gray-300 transition-colors">YouTube</a>
          </div>

          <div className="md:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">Contact</h4>
            <a href="mailto:hello@pupa.com" className="hover:text-gray-300 transition-colors">hello@pupa.com</a>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">Let's Talk</Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Pupa. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
