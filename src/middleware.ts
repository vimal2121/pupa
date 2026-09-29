import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from './lib/auth'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtected = path.startsWith('/admin') && path !== '/admin/login'

  if (isProtected) {
    const session = request.cookies.get('session')?.value
    
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const payload = await decrypt(session)
    if (!payload) {
      // Invalid token
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
