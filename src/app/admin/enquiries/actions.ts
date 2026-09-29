'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function updateEnquiryStatusAction(id: string, status: string) {
  await prisma.enquiry.update({
    where: { id },
    data: { status }
  })
  revalidatePath('/admin/enquiries')
}

export async function deleteEnquiryAction(id: string) {
  await prisma.enquiry.delete({
    where: { id }
  })
  revalidatePath('/admin/enquiries')
}
