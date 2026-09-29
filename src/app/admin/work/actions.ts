'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function deleteProjectAction(id: string) {
  try {
    await prisma.project.delete({
      where: { id }
    })
    revalidatePath('/admin/work')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete project' }
  }
}
