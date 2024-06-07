import { auth } from "@/auth"

import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server"

export default async function middleware(
  req: NextRequest
) {
  const pathname = req.nextUrl.pathname
  const origin = req.nextUrl.origin
  
  if (pathname === '/') return NextResponse.next()

  const session = await auth()

  if (pathname.startsWith('/sign-in')) return(session ? 
    NextResponse.redirect(origin) :
    NextResponse.next()
  )

  if (!session) return NextResponse.redirect(
    `${req.nextUrl.origin}/sign-in`
  )
  
  if (pathname.match(/^\/admin\/products\/?$/))
    return NextResponse.redirect(`${origin}${'/admin/products/active'}`)
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!public|_next/static|_next/image|favicon.ico|robots.txt|api).*)'
  ]
}