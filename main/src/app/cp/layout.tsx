'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

//import { auth } from "@/auth"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRightFromLine, BookMarked, Cog, LifeBuoy, LineChart, Store } from "lucide-react"
import { usePathname } from "next/navigation"

import { CaretSortIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { useHotkeys } from 'react-hotkeys-hook'
import { useRouter } from "next/navigation"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const router = useRouter()

  useHotkeys('Shift+D', () => router.push('/cp/dashboard'))
  useHotkeys('Shift+P', () => router.push('/cp/products'))
  useHotkeys('Shift+O', () => router.push('/cp/orders'))
  useHotkeys('Shift+H', () => router.push('https://github.com/danielsavinoff/newcommerce/issues'))

  if (!isDesktop) return(
    <div className="min-h-dvh">
      <header className="w-full px-8 py-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={"ghost"}
              className="-translate-x-3 !text-muted-foreground"
            >
              <ArrowRightFromLine className="h-4 w-4 mr-2" />
              {process.env.NEXT_PUBLIC_APP_NAME!}
            </Button>
          </SheetTrigger>
          <SheetContent 
            side={"left"}
            className="rounded-tr-md rounded-br-md p-4"
          >
            <div
              className="pt-6"
              children={<Menu />}
            />
          </SheetContent>
        </Sheet>
      </header>
      <main className="container py-[3.75rem]">
        {children}
      </main>
    </div>
  )

  return(
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={20}
        className="min-w-64"
      >
        <Menu />
      </ResizablePanel>
      <ResizablePanel
        defaultSize={80}
        className="min-h-dvh"
      >
        <main 
          className="h-full container max-w-7xl py-[3.75rem]"
        >
          {children}
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

const Menu = () => {
  const pathname = usePathname()

  return(
    <>
      <div className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"sm"} variant={"ghost"} className="w-full justify-start hover:bg-accent/80">
              <div className="w-full grid grid-cols-[min-content_1fr_min-content] gap-2">
                <Avatar className="rounded-sm h-6 w-6">
                  <AvatarFallback className="rounded-sm text-xs select-none">
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
                  <DropdownMenuShortcut className="max-lg:hidden">
                    ⇧⌘Q
                  </DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="p-2">
        <h5 className="w-full justify-start px-3 mb-1 text-xs font-medium text-muted-foreground">
          Store
        </h5>
        <div className="flex flex-col gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
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
                    <LineChart className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                align="center"
                className="max-sm:hidden"
              >
                <p className="text-muted-foreground">
                  Dashboard
                  <span className="ml-2 text-foreground space-x-1">
                    <span className="border rounded-sm py-0.5 px-1 shadow-sm">Shift</span>
                    <span className="border rounded-sm py-0.5 px-1 shadow-sm">D</span>
                  </span>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
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
                    <Store className="h-4 w-4 mr-2" />
                    Product assortment
                  </Link>  
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                align="center"
                className="max-sm:hidden"
              >
                <p className="text-muted-foreground">
                  Product assortment
                  <span className="ml-2 text-foreground space-x-1">
                    <span className="border rounded-sm py-0.5 px-1 shadow-sm">Shift</span>
                    <span className="border rounded-sm py-0.5 px-1 shadow-sm">P</span>
                  </span>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
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
                  </Link>  
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                align="center"
                className="max-sm:hidden"
              >
                <p className="text-muted-foreground">
                  Orders
                  <span className="ml-2 space-x-1 text-foreground">
                    <span className="border rounded-sm py-0.5 px-1 shadow-sm">Shift</span>
                    <span className="border rounded-sm py-0.5 px-1 shadow-sm">O</span>
                  </span>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>  
      </div>
      <div className="p-2 border-t">
        <h5 className="w-full justify-start px-3 mb-1 text-xs font-medium text-muted-foreground">
          Other
        </h5>
        <div className="grid gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="w-full justify-start data-[active=true]:bg-accent data-[active=true]:text-accent-foreground hover:!bg-accent/80"
                  asChild
                >
                  <a
                    href={'https://github.com/danielsavinoff/newcommerce/issues'}
                    target="_blank"
                  >
                    <LifeBuoy className="h-4 w-4 mr-2" />
                    Help
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                align="center"
                className="max-sm:hidden"
              >
                <p className="text-muted-foreground">
                  Help
                  <span className="ml-2 text-foreground space-x-1">
                    <span className="border rounded-sm py-0.5 px-1 shadow-sm">Shift</span>
                    <span className="border rounded-sm py-0.5 px-1 shadow-sm">H</span>
                  </span>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  )
}