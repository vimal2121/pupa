import type { Metadata } from 'next'
import ContactFormClient from './ContactFormClient'

export const metadata: Metadata = {
  title: 'Contact | Pupa',
  description: 'Start your story. Get in touch with Pupa for brand empowerment and storytelling.',
}

export default function ContactPage() {
  return (
    <main className="w-full bg-white text-black min-h-screen pt-32 pb-48">
      <div className="w-full max-w-screen-2xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8">
              Let's talk <br/> about your <br/> next story.
            </h1>
            <p className="text-xl text-gray-500 font-light max-w-md">
              Whether you need a brand film, strategy piece, or a completely custom engagement, we are ready to empower your narrative.
            </p>
          </div>
          
          <div className="mt-16 space-y-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email</h3>
              <a href="mailto:hello@pupa.com" className="text-xl font-medium hover:text-[#51237F] transition-colors">hello@pupa.com</a>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Location</h3>
              <p className="text-xl font-medium">New Delhi, India</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-7 lg:pl-16">
          <ContactFormClient />
        </div>

      </div>
    </main>
  )
}
