import { PrismaClient } from '@prisma/client'
import { SettingsForm } from './SettingsForm'

const prisma = new PrismaClient()

export default async function SettingsPage() {
  const settings = await prisma.siteSetting.findMany()
  
  // Convert array of settings to a key-value object
  const settingsMap = settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value
    return acc
  }, {} as Record<string, string>)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Site Settings</h1>
      </div>
      
      <SettingsForm initialSettings={settingsMap} />
    </div>
  )
}
