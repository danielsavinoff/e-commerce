import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

export default function DataPagination({
  count,
  size,
  index,
  init = {},
  edges = 1,
  core = true,
  className,
  ...props
}: {
  count: number
  size: number
  index: number
  edges?: number
  core?: boolean
  init?: Record<string, string> | URLSearchParams
} & React.ComponentProps<'nav'>) {
  const lastPage = Math.ceil(count / size)
  const nextPage = index + 1 > lastPage ? index : index + 1
  const prevPage = Math.max(index - 1, 1)

  return(
    <Pagination
      className={cn([
        'mx-0 justify-normal',
        className
      ])}
      {...props}
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size={"xs"}
            href={`?${new URLSearchParams({
              ...init,
              page: `${prevPage}`
            })}`}
            aria-disabled={index <= 1}
            className="shadow-sm w-8"
          />
        </PaginationItem>
        {[...Array(prevPage !== index ? 
            Math.min(index - 1, 
              edges * (lastPage === index ? 2 : 1)) : 0
          )].map((_, i, arr) => (
            <PaginationItem key={index - arr.length + i}>
              <PaginationLink
                size={"xs"}
                href={`?${new URLSearchParams({
                  ...init,
                  page: `${index - arr.length + i}`
                })}`}
                className="shadow-sm w-8"
              >
                {index - arr.length + i}
              </PaginationLink>
            </PaginationItem>
          ))}
        {core && (
          <PaginationItem>
            <PaginationLink
              size={"xs"} 
              href={`?${new URLSearchParams({
                ...init,
                page: `${index}`
              })}`}
              className="shadow-sm w-8"
              isActive
            >
              {index}
            </PaginationLink>
          </PaginationItem>
        )}
        {[...Array(nextPage !== index ? 
            Math.min(lastPage - index, 
              edges * (index === 1 ? 2 : 1)) : 0
          )].map((_, i) => (
            <PaginationItem key={index + i + 1}>
              <PaginationLink
                size={"xs"}
                href={`?${new URLSearchParams({
                  ...init,
                  page: `${index + i + 1}`
                })}`}
                className="shadow-sm w-8"
              >
                {index + i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem>
          <PaginationNext
            size={"xs"} 
            href={`?${new URLSearchParams({
              ...init,
              page: `${nextPage}`, 
            })}`}
            aria-disabled={index >= lastPage}
            className="shadow-sm w-8"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}