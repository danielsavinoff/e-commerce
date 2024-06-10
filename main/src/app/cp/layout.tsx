'use client'

import { Nav, Navbar } from "./_components/nav"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ActiveLink } from "@/app/cp/_components/active-link"

//import { auth } from "@/auth"
import { AvatarDropdown } from "@/components/avatar-dropdown"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookMarked, LineChart, Store } from "lucide-react"
import { usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return(
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel 
          defaultSize={30}
        >
          <div className="w-full h-dvh p-4">
            <div className="ml-auto max-w-xs">
              <h5 className="text-xs font-medium leading-none mb-2 text-muted-foreground">Store</h5>
              <Button
                variant={"ghost"}
                size={"sm"}
                className="w-full justify-start"
                asChild
              >
                <Link
                  href={'/cp/dashboard'}
                  data-active={pathname.startsWith('/cp/dashboard')}
                >
                  <LineChart className="h-4 w-4 mr-2"/>
                  Dashboard
                  <span className="ml-auto text-xs tracking-widest opacity-60">
                    ⇧⌘D
                  </span>
                </Link>
              </Button>
              <Button
                variant={"ghost"}
                size={"sm"}
                className="w-full justify-start"
                asChild
              >
                <Link
                  href={'/cp/products'}
                  data-active={pathname.startsWith('/cp/products')}
                >
                  <Store className="h-4 w-4 mr-2" />
                  Product assortment
                  <span className="ml-auto text-xs tracking-widest opacity-60">
                    ⇧⌘P
                  </span>
                </Link>  
              </Button>
              <Button
                variant={"ghost"}
                size={"sm"}
                className="w-full justify-start"
                asChild
              >
                <Link
                  href={'/cp/orders'}
                  data-active={pathname.startsWith('/cp/orders')}
                >
                  <BookMarked className="h-4 w-4 mr-2" />
                  Orders
                  <span className="ml-auto text-xs tracking-widest opacity-60">
                    ⇧⌘O
                  </span>
                </Link>  
              </Button>           
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <main className="py-6 container max-w-6xl">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
      
    </>
  )
}

