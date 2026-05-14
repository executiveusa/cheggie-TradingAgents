import { NextRequest, NextResponse } from 'next/server'

const PROTECTED = ['/dashboard', '/reports', '/watchlist', '/settings']

export function middleware(req: NextRequest) {
  // Auth enforcement only active when Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) return NextResponse.next()

  const { pathname } = req.nextUrl
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p))
  if (!isProtected) return NextResponse.next()

  const token = req.cookies.get('sb-access-token')?.value
    || req.cookies.get('supabase-auth-token')?.value

  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/reports/:path*', '/watchlist/:path*', '/settings/:path*'],
}
