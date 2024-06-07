import { db } from "@/database/db"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"

import Link from "next/link"

import { Plus } from "lucide-react"

import { PageHead, PageHeader, PageTitle } from "../../_components/header"
import DataTable from "../_components/data-table"
import { columns } from "../_components/columns"
import { notFound } from "next/navigation"
import { Nav } from "@/app/admin/_components/nav"

export default async function ProductsPage({
  searchParams,
  params
}: {
  searchParams?: { [key: string]: string | undefined }
  params: { status: string }
}) {
  if (params.status !== 'active' && params.status !== 'archived')
    return notFound()

  const index = parseInt(`${searchParams?.page}`) || 1
  const size = 10

  const [products, count] = await db.$transaction([
    db.product.findMany({
      skip: (size) * (index - 1), 
      take: size,
      include: { productShots: true },
      where: { status: params.status },
      orderBy: [{ 
        name: 
          searchParams?.name === 'asc' || searchParams?.name === 'desc' ? 
            searchParams.name : undefined,
      }, {
        id:
          searchParams?.id === 'asc' || searchParams?.id === 'desc' ? 
            searchParams.id : undefined, 
      }, {
        priceInTheSmallestDenomination: 
          searchParams?.priceInTheSmallestDenomination === 'asc' || searchParams?.priceInTheSmallestDenomination === 'desc' ? 
            searchParams.priceInTheSmallestDenomination : undefined, 
      }]
    }),
    db.product.count()
  ])

  /* Utils */
  const filteredsearchParams: Record<string, string> = {}

  for (const param in searchParams) {
    if (typeof searchParams[param] !== 'undefined')
      filteredsearchParams[param] = searchParams[param]
  }

  /* Pagination */
  const edges = 1

  const lastPage = Math.ceil(count / size)
  const nextPage = index + 1 > lastPage ? index : index + 1
  const prevPage = Math.max(index - 1, 1)

  return(
    <>
      <PageHead>
        <PageHeader>
          <PageTitle>
            Products
            <Button className="ml-auto" asChild>
              <Link href={'/admin/products/add'}>
                <Plus className="mr-2 h-4 w-4"/> New
              </Link>
            </Button>
          </PageTitle>
        </PageHeader>
        <Nav underlineActiveLink>
          <Link 
            href={'/admin/products/active'}
            data-active={params.status === 'active'}
          >
            Active
          </Link>
          <Link 
            href={'/admin/products/archived'} 
            data-active={params.status === 'archived'}
          >
            Archived
          </Link>
        </Nav>
      </PageHead>
      <div className="mt-8 space-y-4">
        <div className="flex text-sm font-medium text-muted-foreground">
          <p>{count} items</p>
          <p className="ml-auto">
            {1 + (size * (index - 1))}-{Math.min(size * index, count)} from {count} items
          </p>
        </div>

          <DataTable   
            data={products} 
            columns={columns} 
          />
      </div>
      <Pagination className="ml-auto mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href={`all?${new URLSearchParams({
                ...filteredsearchParams,
                page: `${prevPage}`
              })}`}
              aria-disabled={index <= 1}
            />
          </PaginationItem>
          {[...Array(prevPage !== index ? 
              Math.min(index - 1, 
                edges * (lastPage === index ? 2 : 1)) : 0
            )].map((_, i, arr) => (
              <PaginationItem key={index - arr.length + i}>
                <PaginationLink
                  href={`all?${new URLSearchParams({
                    ...filteredsearchParams,
                    page: `${index - arr.length + i}`
                  })}`}
                >
                  {index - arr.length + i}
                </PaginationLink>
              </PaginationItem>
            ))}
          <PaginationItem>
            <PaginationLink 
              href={`all?${new URLSearchParams({
                ...filteredsearchParams,
                page: `${index}`
              })}`}
              isActive
            >
              {index}
            </PaginationLink>
          </PaginationItem>
          {[...Array(nextPage !== index ? 
              Math.min(lastPage - index, 
                edges * (index === 1 ? 2 : 1)) : 0
            )].map((_, i) => (
              <PaginationItem key={index + i + 1}>
                <PaginationLink
                  href={`all?${new URLSearchParams({
                    ...filteredsearchParams,
                    page: `${index + i + 1}`
                  })}`}
                >
                  {index + i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          <PaginationItem>
            <PaginationNext 
              href={`all?${new URLSearchParams({
                ...filteredsearchParams,
                page: `${nextPage}`, 
              })}`}
              aria-disabled={index >= lastPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
