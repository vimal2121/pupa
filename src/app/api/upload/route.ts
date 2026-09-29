import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { LocalStorageProvider } from '@/lib/storage/LocalStorageProvider'
import { decrypt } from '@/lib/auth'
import sharp from 'sharp'

const prisma = new PrismaClient()
const storage = new LocalStorageProvider()

// 10MB limit
const MAX_FILE_SIZE = 10 * 1024 * 1024 
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

export async function POST(request: Request) {
  try {
    // 1. Authenticate Request
    const cookieHeader = request.headers.get('cookie') || ''
    const sessionCookie = cookieHeader.split(';').find(c => c.trim().startsWith('session='))?.split('=')[1]
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await decrypt(sessionCookie)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse Form Data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const altText = formData.get('altText') as string | null
    const caption = formData.get('caption') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File exceeds maximum size' }, { status: 400 })
    }

    // 3. Process Image with Sharp
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Convert to webp for optimization unless it's already an optimal format
    // For this implementation, we will standardize on WebP for optimal delivery
    const image = sharp(buffer)
    const metadata = await image.metadata()
    
    let processedBuffer = buffer
    let finalMimeType = file.type
    let finalExtension = file.name.split('.').pop()

    // If it's a JPEG or PNG, convert to WebP to save space and improve performance
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      processedBuffer = await image.webp({ quality: 80 }).toBuffer()
      finalMimeType = 'image/webp'
      finalExtension = 'webp'
    }

    const finalFilename = `${file.name.substring(0, file.name.lastIndexOf('.')) || file.name}.${finalExtension}`

    // 4. Upload to Storage Provider
    const url = await storage.upload(processedBuffer, finalFilename, finalMimeType)

    // 5. Save to Database
    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        filename: finalFilename,
        originalName: file.name,
        mimeType: finalMimeType,
        size: processedBuffer.length,
        url: url,
        width: metadata.width,
        height: metadata.height,
        altText: altText,
        caption: caption,
      }
    })

    return NextResponse.json({ success: true, asset: mediaAsset })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to process upload' }, { status: 500 })
  }
}
