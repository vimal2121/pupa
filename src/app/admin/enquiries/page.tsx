import { PrismaClient } from '@prisma/client'
import EnquiriesClient from './EnquiriesClient'

const prisma = new PrismaClient()

export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <EnquiriesClient enquiries={enquiries} />
  )
}
