import { ProjectForm } from '@/components/admin/ProjectForm'

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Create New Project</h1>
      </div>
      
      <ProjectForm />
    </div>
  )
}
