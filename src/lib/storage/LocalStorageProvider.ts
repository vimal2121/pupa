import fs from 'fs/promises'
import path from 'path'
import { StorageProvider } from './StorageProvider'

export class LocalStorageProvider implements StorageProvider {
  private readonly uploadDir: string

  constructor() {
    // Store in public/uploads so it can be served statically by Next.js
    this.uploadDir = path.join(process.cwd(), 'public', 'uploads')
  }

  private async ensureDir() {
    try {
      await fs.access(this.uploadDir)
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true })
    }
  }

  async upload(fileBuffer: Buffer, filename: string, mimeType: string): Promise<string> {
    await this.ensureDir()
    const safeFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const filePath = path.join(this.uploadDir, safeFilename)
    
    await fs.writeFile(filePath, fileBuffer)
    
    // Return relative URL for Next.js to serve
    return `/uploads/${safeFilename}`
  }

  async delete(identifier: string): Promise<void> {
    const filename = identifier.replace('/uploads/', '')
    const filePath = path.join(this.uploadDir, filename)
    try {
      await fs.unlink(filePath)
    } catch (error) {
      console.warn('Failed to delete file:', filePath, error)
    }
  }

  getUrl(identifier: string): string {
    return identifier.startsWith('/') ? identifier : `/uploads/${identifier}`
  }
}
