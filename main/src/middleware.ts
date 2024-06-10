import { auth } from "@/auth"

import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server"

export default async function middleware(
  req: NextRequest
) {
  const pathname = req.nextUrl.pathname
  const origin = req.nextUrl.origin
  
  if (pathname === '/') return NextResponse.next()

  const session = await auth()

  if (pathname.startsWith('/auth')) return(session ? 
    NextResponse.redirect(origin) :
    NextResponse.next()
  )

  if (!session) return NextResponse.redirect(
    `${req.nextUrl.origin}/auth`
  )
  
  if (pathname.startsWith('/cp') && 
    !session.user.roles?.some(role => (
      role === 'seller' || 
      role === 'admin' || 
      role === 'manager'
  ))) return NextResponse.error()

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!public|_next/static|_next/image|favicon.ico|robots.txt|api).*)'
  ]
}