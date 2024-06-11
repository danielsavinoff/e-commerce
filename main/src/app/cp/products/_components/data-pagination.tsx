import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import React from "react"

export default function DataPagination({
  count,
  size,
  index,
  init = {},
  edges = 1,
  className,
  ...props
}: {
  count: number
  size: number
  index: number
  edges?: number
  init?: Record<string, string> | URLSearchParams
} & React.ComponentProps<'nav'>) {
  const lastPage = Math.ceil(count / size)
  const nextPage = index + 1 > lastPage ? index : index + 1
  const prevPage = Math.max(index - 1, 1)

  return(
    <Pagination
      className={cn([
        'ml-auto',
        className
      ])}
      {...props}
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href={`?${new URLSearchParams({
              ...init,
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
                href={`?${new URLSearchParams({
                  ...init,
                  page: `${index - arr.length + i}`
                })}`}
              >
                {index - arr.length + i}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem>
          <PaginationLink 
            href={`?${new URLSearchParams({
              ...init,
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
                href={`?${new URLSearchParams({
                  ...init,
                  page: `${index + i + 1}`
                })}`}
              >
                {index + i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem>
          <PaginationNext 
            href={`?${new URLSearchParams({
              ...init,
              page: `${nextPage}`, 
            })}`}
            aria-disabled={index >= lastPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}