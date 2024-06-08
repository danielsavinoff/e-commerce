import { auth } from "@/auth"

import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server"

export default async function middleware(
  req: NextRequest
) {
  const pathname = req.nextUrl.pathname
  const origin = req.nextUrl.origin
  
  if (pathname === '/') return NextResponse.next()

  const session = await auth()

  console.log(session)

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

  if (pathname.match(/^\/cp\/products\/?$/))
    return NextResponse.redirect(`${origin}${'/cp/products/active'}`)
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!public|_next/static|_next/image|favicon.ico|robots.txt|api).*)'
  ]
}