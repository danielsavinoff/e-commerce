import { Nav, Navbar } from "./_components/nav"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ActiveLink } from "@/app/cp/_components/active-link"

import { auth } from "@/auth"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return(
    <>
      <Navbar>  
        <Nav className="*:py-4">
          <ActiveLink
            href={'/cp/dashboard'}
          >
            Dashboard
          </ActiveLink>
          <ActiveLink
            href={'/cp/products'}
          >
            Products
          </ActiveLink>
          <ActiveLink
            href={'/cp/orders'}
          >
            Orders
          </ActiveLink>
        </Nav>
        <Avatar className="ml-auto">
          <AvatarFallback>
            {session?.user.name?.[0]}
          </AvatarFallback>
        </Avatar>
      </Navbar>
      <main className="py-6 container">{children}</main>
    </>
  )
}

