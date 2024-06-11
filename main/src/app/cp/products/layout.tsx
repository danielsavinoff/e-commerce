import { Button } from "@/components/ui/button"

import Link from "next/link"

import { ArrowUpDown, FileDown, Filter, Plus } from "lucide-react"

import { PageHead, PageHeader, PageTitle } from "@/app/cp/_components/header"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CaretSortIcon } from "@radix-ui/react-icons"

export default async function AdminProductPageLayout({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return(
    <>
      <PageHead className="mb-8">
        <PageHeader>
          <PageTitle>
            Product assortment
          </PageTitle>
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size={'xs'}
                  variant={"outline"}
                  className="text-xs"
                >
                  <ArrowUpDown className="h-3 w-3 mr-2" />
                  Sorting
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Sort</h4>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              size={'xs'}
              variant={"outline"}
              className="text-xs"
            >
              <Filter className="h-3 w-3 mr-2" />
              Filters
            </Button>
            <Button
              size={'xs'}
              variant={"outline"}
              className="text-xs ml-auto"
            >
              <FileDown className="mr-2 h-3 w-4" /> Export
            </Button>
            <Button size={"xs"} className="text-xs" asChild>
              <Link href={'?modal=create'}>
                <Plus className="mr-2 h-3 w-4"/> New
              </Link>
            </Button>
          </div>
        </PageHeader>
      </PageHead>
      {children}
      {modal}
    </>
  )
}