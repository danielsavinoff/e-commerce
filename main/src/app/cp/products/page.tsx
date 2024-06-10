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

import { PageHead, PageHeader, PageTitle } from "../_components/header"
import DataTable from "./_components/data-table"
import { columns } from "./_components/columns"
import { notFound } from "next/navigation"
import { Nav } from "@/app/cp/_components/nav"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined }
}) {
  const index = parseInt(`${searchParams?.page}`) || 1
  const size = 10

  const [products, count] = await db.$transaction([
    db.product.findMany({
      skip: (size) * (index - 1), 
      take: size,
      include: { productShots: true },
      // where: { status: params.status },
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
      <div className="flex flex-col">
        <div className="space-y-4">
          <DataTable   
            data={products} 
            columns={columns} 
          />
        </div>
        <p className="text-xs mt-4">
          {(!count ? 0 : 1) + (size * (index - 1))}-{Math.min(size * index, count)} from {count} results
        </p>
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
      </div>
    </>
  )
}
