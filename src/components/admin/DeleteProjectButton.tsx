'use client'

import { deleteProjectAction } from '@/app/admin/work/actions'

export function DeleteProjectButton({ id }: { id: string }) {
  return (
    <button 
      onClick={async () => {
        if (confirm('Are you sure you want to delete this project?')) {
          await deleteProjectAction(id)
        }
      }}
      className="text-red-600 hover:underline"
    >
      Delete
    </button>
  )
}
