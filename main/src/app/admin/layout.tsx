"use client"

import { Nav, Navbar } from "./_components/nav"

import Link from "next/link"

import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const path = usePathname()
  
  return(
    <>
      <Navbar>  
        <Nav className="*:py-4">
          <Link 
            href='/admin/dashboard' 
            data-active={path.startsWith('/admin/dashboard')}
          >
            Dashboard
          </Link>
          <Link 
            href='/admin/products' 
            data-active={path.startsWith('/admin/products')}
          >
            Products
          </Link>
          <Link 
            href='/admin/orders' 
            data-active={path.startsWith('/admin/orders')}
          >
            Orders
          </Link>
          <Link 
            href='/admin/settings' 
            data-active={path.startsWith('/admin/settings')}
          >
            Settings
          </Link>
        </Nav>
          <Avatar className="ml-auto">
            <AvatarFallback />
          </Avatar>
      </Navbar>
      <main className="py-6 container">{children}</main>
    </>
  )
}

