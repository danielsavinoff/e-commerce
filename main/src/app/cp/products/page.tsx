import { db } from "@/database/db"
import { columns } from "@/app/cp/products/_components/columns"

import DataTable from "@/app/cp/products/_components/data-table"
import DataPagination from "@/app/cp/products/_components/data-pagination"

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
        <DataPagination 
          count={count}
          index={index}
          size={size}
          init={filteredsearchParams}
          className="mt-4"
        />
      </div>
    </>
  )
}
