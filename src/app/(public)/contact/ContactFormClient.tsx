'use client'

import { useActionState, useState } from 'react'
import { submitEnquiryAction } from './actions'
import { Loader2 } from 'lucide-react'

export default function ContactFormClient() {
  const [state, formAction, isPending] = useActionState(submitEnquiryAction, { success: false, message: '' } as any)

  if (state.success) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-6 py-24 px-6 border border-gray-200 bg-gray-50 rounded-xl">
        <h2 className="text-3xl font-bold tracking-tight">Enquiry Received.</h2>
        <p className="text-gray-600 font-light max-w-sm">
          {state.message} We will be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-8">
      {state.message && !state.success && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="w-full p-4 border-b border-gray-300 focus:border-black bg-transparent outline-none transition-colors"
          />
          {state.errors?.name && <p className="mt-2 text-xs text-red-600">{state.errors.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="company" className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Company</label>
          <input 
            type="text" 
            id="company" 
            name="company" 
            className="w-full p-4 border-b border-gray-300 focus:border-black bg-transparent outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="email" className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Email *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="w-full p-4 border-b border-gray-300 focus:border-black bg-transparent outline-none transition-colors"
          />
          {state.errors?.email && <p className="mt-2 text-xs text-red-600">{state.errors.email[0]}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            className="w-full p-4 border-b border-gray-300 focus:border-black bg-transparent outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Message *</label>
        <textarea 
          id="message" 
          name="message" 
          required 
          rows={5}
          className="w-full p-4 border-b border-gray-300 focus:border-black bg-transparent outline-none transition-colors resize-none"
        ></textarea>
        {state.errors?.message && <p className="mt-2 text-xs text-red-600">{state.errors.message[0]}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full md:w-auto px-12 py-4 bg-[#51237F] text-[#a4d62b] font-bold uppercase tracking-widest text-sm hover:bg-[#431d69] transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending
          </>
        ) : (
          'Send Enquiry'
        )}
      </button>
    </form>
  )
}
