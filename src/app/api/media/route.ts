import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { decrypt } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || ''
    const sessionCookie = cookieHeader.split(';').find(c => c.trim().startsWith('session='))?.split('=')[1]
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await decrypt(sessionCookie)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('q')

    let whereClause = {}
    if (search) {
      whereClause = {
        filename: {
          contains: search
        }
      }
    }

    const assets = await prisma.mediaAsset.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ assets })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}
