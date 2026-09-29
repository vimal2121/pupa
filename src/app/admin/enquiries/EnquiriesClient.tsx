'use client'

import { useState } from 'react'
import { updateEnquiryStatusAction, deleteEnquiryAction } from './actions'
import { Trash2 } from 'lucide-react'

export default function EnquiriesClient({ enquiries }: { enquiries: any[] }) {
  const [filter, setFilter] = useState('ALL')
  
  const filtered = filter === 'ALL' 
    ? enquiries 
    : enquiries.filter(e => e.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Enquiries</h1>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 dark:text-white"
        >
          <option value="ALL">All Enquiries</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Name & Company</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Message</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
            {filtered.map(enq => (
              <tr key={enq.id} className={`hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition ${enq.status === 'NEW' ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {new Date(enq.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium dark:text-white">{enq.name}</div>
                  <div className="text-xs text-gray-500 flex flex-col mt-1">
                    <a href={`mailto:${enq.email}`} className="hover:underline">{enq.email}</a>
                    {enq.phone && <a href={`tel:${enq.phone}`} className="hover:underline">{enq.phone}</a>}
                    {enq.company && <span className="text-gray-400 mt-1">{enq.company}</span>}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm dark:text-gray-300 max-w-xs truncate" title={enq.message}>
                  {enq.message}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={enq.status}
                    onChange={(e) => updateEnquiryStatusAction(enq.id, e.target.value)}
                    className={`text-xs font-bold uppercase p-1 rounded border-0 outline-none cursor-pointer
                      ${enq.status === 'NEW' ? 'bg-blue-100 text-blue-800' : 
                        enq.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`
                    }
                  >
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => {
                      if (confirm('Delete this enquiry?')) {
                        deleteEnquiryAction(enq.id)
                      }
                    }}
                    className="text-gray-400 hover:text-red-600 transition p-2 rounded"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
