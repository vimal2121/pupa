import type { Metadata } from 'next'
import { ScrollHint } from '@/components/public/ScrollHint'

export const metadata: Metadata = {
  title: 'Editing Rates | Pupa',
  description: 'Editing Rates Per Second & Scope of Services',
}

export default function RatesPage() {
  return (
    <main className="w-full bg-white text-black min-h-screen pt-32 pb-48">
      <div className="w-full max-w-screen-2xl mx-auto px-6">
        
        {/* HEADER */}
        <header className="mb-24 md:mb-32">
          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[0.85] mb-8">
            Rates.
          </h1>
          <p className="text-xl md:text-3xl text-gray-500 font-light max-w-3xl leading-relaxed">
            Transparent editing rates per second and a clear scope of our cinematic services.
          </p>
        </header>

        {/* SERVICES / SCOPE TABLE */}
        <section className="mb-32">
          <div className="flex flex-row items-end justify-between mb-12 border-b border-gray-200 pb-8 gap-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Scope of Services</h2>
            {/* Animated Mobile Swipe Indicator */}
            <div className="md:hidden flex items-center justify-end space-x-2 text-xs font-bold uppercase tracking-widest text-[#51237F] flex-shrink-0">
              <span className="animate-pulse">Swipe</span>
              <svg 
                className="w-4 h-4 animate-[bounce-x_2s_infinite]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          <ScrollHint className="pb-8">
            <table className="w-full min-w-[900px] text-left border-collapse relative">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="py-6 pr-6 text-sm font-bold uppercase tracking-widest text-gray-900 w-[40%]">Role / Deliverable</th>
                  <th className="py-6 px-6 text-sm font-bold uppercase tracking-widest text-gray-900 text-center">Daily Content</th>
                  <th className="py-6 px-6 text-sm font-bold uppercase tracking-widest text-gray-900 text-center">Basic Film</th>
                  <th className="py-6 px-6 text-sm font-bold uppercase tracking-widest text-gray-900 text-center">Creative Film</th>
                  <th className="py-6 px-6 text-sm font-bold uppercase tracking-widest text-gray-900 text-center">Brand Film</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100">
                
                {/* 1. Strategist */}
                <tr className="bg-gray-50/50 group hover:bg-gray-50 transition-colors">
                  <td className="py-6 pr-6 font-bold text-lg">1. Strategist</td>
                  <td className="py-6 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-6 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-6 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Strategy Study</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Strategic Direction</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>

                {/* 2. Brand Manager */}
                <tr className="bg-gray-50/50 group hover:bg-gray-50 transition-colors">
                  <td className="py-6 pr-6 font-bold text-lg border-t border-gray-200 mt-4">2. Brand Manager</td>
                  <td className="py-6 px-6 text-center text-gray-300 font-light border-t border-gray-200">—</td>
                  <td className="py-6 px-6 text-center text-gray-300 font-light border-t border-gray-200">—</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Brand Guidelines Study</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Brand Direction</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>

                {/* 3. Editor */}
                <tr className="bg-gray-50/50 group hover:bg-gray-50 transition-colors">
                  <td className="py-6 pr-6 font-bold text-lg border-t border-gray-200 mt-4">3. Editor</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">5 Minute Stock Footage for Sorting</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Studio Time</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Editing Direction</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Professional Editor's Time</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Elementary Graphics</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>

                {/* 4. Writer */}
                <tr className="bg-gray-50/50 group hover:bg-gray-50 transition-colors">
                  <td className="py-6 pr-6 font-bold text-lg border-t border-gray-200 mt-4">4. Writer</td>
                  <td className="py-6 px-6 text-center text-gray-300 font-light border-t border-gray-200">—</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Storytelling Sequence by Writer</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Copywriting by Writer</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>

                {/* 5. Designer */}
                <tr className="bg-gray-50/50 group hover:bg-gray-50 transition-colors">
                  <td className="py-6 pr-6 font-bold text-lg border-t border-gray-200 mt-4">5. Designer</td>
                  <td className="py-6 px-6 text-center text-gray-300 font-light border-t border-gray-200">—</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Slide Designs by Designer</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>

                {/* 6. Third Party */}
                <tr className="bg-gray-50/50 group hover:bg-gray-50 transition-colors">
                  <td className="py-6 pr-6 font-bold text-lg border-t border-gray-200 mt-4">6. Third Party</td>
                  <td className="py-6 px-6 text-center text-gray-300 font-light border-t border-gray-200">—</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Editor's Licensed Stock Music Selection</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Purchase Extra by Client</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>

                {/* 7. Coordinator */}
                <tr className="bg-gray-50/50 group hover:bg-gray-50 transition-colors">
                  <td className="py-6 pr-6 font-bold text-lg border-t border-gray-200 mt-4">7. Coordinator</td>
                  <td className="py-6 px-6 text-center text-gray-300 font-light border-t border-gray-200">—</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                  <td className="py-6 px-6 text-center text-[#a4d62b] font-bold text-xl border-t border-gray-200">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">FM Cost Direction</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Coordination</td>
                  <td className="py-4 px-6 text-center text-gray-300 font-light">—</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                
                {/* APPROVALS & DELIVERY */}
                <tr>
                  <td colSpan={5} className="py-8">
                    <h3 className="text-xl font-bold tracking-tight mt-12 mb-4">Approvals & Delivery</h3>
                  </td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Costs & Timelines on Email</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Client Brief on Email</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Storytelling Sequence on Email</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Edit Revisions — 2 Only</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">Online Coordination Only</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">No Personal Client Meetings</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors border-b border-gray-200">
                  <td className="py-4 pr-6 pl-8 text-gray-600 font-light">5-Day Delivery from Advance</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                  <td className="py-4 px-6 text-center text-black font-bold text-xl">✓</td>
                </tr>
              </tbody>
            </table>
          </ScrollHint>
        </section>

        {/* RATES / PRICING */}
        <section className="bg-gray-50 p-6 md:p-16 rounded-3xl mb-16">
          <div className="flex flex-row items-end justify-between mb-12 gap-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Rate Per Second (INR)</h2>
            {/* Animated Mobile Swipe Indicator */}
            <div className="md:hidden flex items-center justify-end space-x-2 text-xs font-bold uppercase tracking-widest text-[#51237F] flex-shrink-0">
              <span className="animate-pulse">Swipe</span>
              <svg 
                className="w-4 h-4 animate-[bounce-x_2s_infinite]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
          
          <ScrollHint className="pb-4">
            <table className="w-full min-w-[800px] text-left border-collapse relative">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="py-6 pr-6 text-sm font-bold uppercase tracking-widest text-gray-900 w-[40%]">Format</th>
                  <th className="py-6 px-6 text-sm font-bold uppercase tracking-widest text-gray-900 text-center">Daily Content</th>
                  <th className="py-6 px-6 text-sm font-bold uppercase tracking-widest text-gray-900 text-center">Basic Film</th>
                  <th className="py-6 px-6 text-sm font-bold uppercase tracking-widest text-gray-900 text-center">Creative Film</th>
                  <th className="py-6 px-6 text-sm font-bold uppercase tracking-widest text-gray-900 text-center">Brand Film</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="group hover:bg-gray-100 transition-colors">
                  <td className="py-6 pr-6 font-bold text-xl">Reels</td>
                  <td className="py-6 px-6 text-center"><span className="inline-block min-w-[80px] font-light text-[#51237F] text-xl outline-none focus:bg-white focus:ring-2 focus:ring-black rounded px-2" contentEditable suppressContentEditableWarning>₹ XX</span></td>
                  <td className="py-6 px-6 text-center"><span className="inline-block min-w-[80px] font-light text-[#51237F] text-xl outline-none focus:bg-white focus:ring-2 focus:ring-black rounded px-2" contentEditable suppressContentEditableWarning>₹ XX</span></td>
                  <td className="py-6 px-6 text-center"><span className="inline-block min-w-[80px] font-light text-[#51237F] text-xl outline-none focus:bg-white focus:ring-2 focus:ring-black rounded px-2" contentEditable suppressContentEditableWarning>₹ XX</span></td>
                  <td className="py-6 px-6 text-center"><span className="inline-block min-w-[80px] font-light text-[#51237F] text-xl outline-none focus:bg-white focus:ring-2 focus:ring-black rounded px-2" contentEditable suppressContentEditableWarning>₹ XX</span></td>
                </tr>
                <tr className="group hover:bg-gray-100 transition-colors">
                  <td className="py-6 pr-6 font-bold text-xl">Video</td>
                  <td className="py-6 px-6 text-center"><span className="inline-block min-w-[80px] font-light text-[#51237F] text-xl outline-none focus:bg-white focus:ring-2 focus:ring-black rounded px-2" contentEditable suppressContentEditableWarning>₹ XX</span></td>
                  <td className="py-6 px-6 text-center"><span className="inline-block min-w-[80px] font-light text-[#51237F] text-xl outline-none focus:bg-white focus:ring-2 focus:ring-black rounded px-2" contentEditable suppressContentEditableWarning>₹ XX</span></td>
                  <td className="py-6 px-6 text-center"><span className="inline-block min-w-[80px] font-light text-[#51237F] text-xl outline-none focus:bg-white focus:ring-2 focus:ring-black rounded px-2" contentEditable suppressContentEditableWarning>₹ XX</span></td>
                  <td className="py-6 px-6 text-center"><span className="inline-block min-w-[80px] font-light text-[#51237F] text-xl outline-none focus:bg-white focus:ring-2 focus:ring-black rounded px-2" contentEditable suppressContentEditableWarning>₹ XX</span></td>
                </tr>
                <tr className="group hover:bg-gray-100 transition-colors border-b border-gray-200">
                  <td className="py-6 pr-6 font-bold text-xl">Film</td>
                  <td className="py-6 px-6 text-center"><span className="inline-block min-w-[80px] font-light text-[#51237F] text-xl outline-none focus:bg-white focus:ring-2 focus:ring-black rounded px-2" contentEditable suppressContentEditableWarning>₹ XX</span></td>
                  <td className="py-6 px-6 text-center"><span className="inline-block min-w-[80px] font-light text-[#51237F] text-xl outline-none focus:bg-white focus:ring-2 focus:ring-black rounded px-2" contentEditable suppressContentEditableWarning>₹ XX</span></td>
                  <td className="py-6 px-6 text-center"><span className="inline-block min-w-[80px] font-light text-[#51237F] text-xl outline-none focus:bg-white focus:ring-2 focus:ring-black rounded px-2" contentEditable suppressContentEditableWarning>₹ XX</span></td>
                  <td className="py-6 px-6 text-center"><span className="inline-block min-w-[80px] font-light text-[#51237F] text-xl outline-none focus:bg-white focus:ring-2 focus:ring-black rounded px-2" contentEditable suppressContentEditableWarning>₹ XX</span></td>
                </tr>
              </tbody>
            </table>
          </ScrollHint>

          <div className="mt-8 text-right font-bold text-sm uppercase tracking-widest text-gray-500">
            * All Taxes Extra
          </div>
        </section>

      </div>
    </main>
  )
}
