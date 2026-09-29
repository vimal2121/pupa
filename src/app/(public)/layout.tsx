import { Header } from '@/components/public/Header'
import { Footer } from '@/components/public/Footer'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const logoSetting = await prisma.siteSetting.findUnique({
    where: { key: 'logo_url' }
  })
  
  return (
    <div className="bg-white text-black min-h-screen selection:bg-black selection:text-white antialiased flex flex-col">
      <Header logoUrl={logoSetting?.value || '/logo.png'} />
      <div className="flex-1 w-full relative z-0 pt-20">
        {children}
      </div>
      <Footer logoUrl={logoSetting?.value || '/logo.png'} />
    </div>
  )
}
