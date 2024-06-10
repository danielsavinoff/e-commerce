import { Button } from "@/components/ui/button"

import Link from "next/link"

import { ArrowUpDown, File, FileDown, Filter, Plus } from "lucide-react"

import { PageHead, PageHeader, PageDescription, PageTitle } from "@/app/cp/_components/header"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default async function AdminProductPageLayout({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return(
    <>
      <PageHead>
        <PageHeader>
          <PageTitle>
            Product assortment
            <div className="flex ml-auto">
              <Button className="mr-4 shadow-sm" size={"sm"} variant={"outline"}>
                <FileDown className="mr-2 h-4 w-4" /> Export
              </Button>
              <Button size={"sm"} asChild>
                <Link href={'?modal=create'}>
                  <Plus className="mr-2 h-4 w-4"/> Add product
                </Link>
              </Button>
            </div>
          </PageTitle>
        </PageHeader>
      </PageHead>
      <div className="flex my-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
            size={'xs'}
            variant={"outline"}
            className="rounded-full text-xs mr-2 shadow-sm"
            >
              <ArrowUpDown className="h-3 w-3 mr-1" />
              Sorting 
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Sort filter</h4>
              <p className="text-sm text-muted-foreground">
                Sort by any column
              </p>
            </div>
          </PopoverContent>
        </Popover>
        <Button
          size={'xs'}
          variant={"outline"}
          className="rounded-full text-xs shadow-sm"
        >
          <Filter className="h-3 w-3 mr-1" />
          Filter by status 
        </Button>
      </div>
      {children}
      {modal}
    </>
  )
}