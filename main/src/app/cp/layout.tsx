'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

//import { auth } from "@/auth"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookMarked, Cog, LineChart, Store } from "lucide-react"
import { usePathname } from "next/navigation"
import { CollapsibleTrigger, Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { CaretSortIcon, TriangleRightIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return(
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={15}
        minSize={15}
        maxSize={40}
      >
        <div className="w-full h-dvh">
          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size={"sm"} variant={"ghost"} className="w-full justify-start mb-4 hover:bg-accent/80">
                  <div className="w-full grid grid-cols-[min-content_1fr_min-content] gap-2">
                    <Avatar className="rounded-sm h-6 w-6">
                      <AvatarFallback className="rounded-sm text-xs">
                      {process.env.NEXT_PUBLIC_APP_NAME![0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col h-full justify-center items-start">
                      <h3 className="text-sm font-medium">{process.env.NEXT_PUBLIC_APP_NAME}</h3>
                    </div>
                    <div className="flex flex-col h-full justify-center">
                      <CaretSortIcon className="w-4 h-4 align-middle"/>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Cog className="h-4 w-4 mr-2" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href={'/'}>
                      Switch to customer view
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={'/logout'}>
                      Sign out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Collapsible defaultOpen>
              <CollapsibleTrigger asChild>
                <Button
                  variant={'ghost'}
                  size={'xs'}
                  className="w-full justify-start px-3 mb-1 text-xs text-muted-foreground hover:text-muted-foreground hover:bg-accent/80 group"
                >
                  Store
                  <TriangleRightIcon className="h-3 w-3 ml-1 group-data-[state=open]:rotate-90 transition" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
                <div className="flex flex-col gap-1">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="w-full justify-start data-[active=true]:bg-accent data-[active=true]:text-accent-foreground hover:!bg-accent/80"
                    asChild
                  >
                    <Link
                      href={'/cp/dashboard'}
                      data-active={pathname.startsWith('/cp/dashboard')}
                    >
                      <LineChart className="h-4 w-4 mr-2"/>
                      Dashboard
                      <span className="ml-auto text-xs tracking-widest opacity-60">
                        ⌘D
                      </span>
                    </Link>
                  </Button>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="w-full justify-start data-[active=true]:bg-accent data-[active=true]:text-accent-foreground hover:!bg-accent/80"
                    asChild
                  >
                    <Link
                      href={'/cp/products'}
                      data-active={pathname.startsWith('/cp/products')}
                    >
                      <Store className="h-4 w-4 mr-2"  />
                      Product assortment
                      <span className="ml-auto text-xs tracking-widest opacity-60">
                        ⌘P
                      </span>
                    </Link>  
                  </Button>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="w-full justify-start data-[active=true]:bg-accent data-[active=true]:text-accent-foreground hover:!bg-accent/80"
                    asChild
                  >
                    <Link
                      href={'/cp/orders'}
                      data-active={pathname.startsWith('/cp/orders')}
                    >
                      <BookMarked className="h-4 w-4 mr-2" />
                      Orders
                      <span className="ml-auto text-xs tracking-widest opacity-60">
                        ⌘O
                      </span>
                    </Link>  
                  </Button>
                </div>           
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize={70}
      >
        <main className="py-6 container max-w-6xl">
          {children}
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

