export interface StorageProvider {
  /**
   * Upload a file buffer to storage and return the URL
   */
  upload(fileBuffer: Buffer, filename: string, mimeType: string): Promise<string>;
  
  /**
   * Delete a file from storage by its URL or filename
   */
  delete(identifier: string): Promise<void>;
  
  /**
   * Get the public URL for a given identifier
   */
  getUrl(identifier: string): string;
}
