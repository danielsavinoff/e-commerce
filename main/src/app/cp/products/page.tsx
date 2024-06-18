import { db } from "@/database/db"
import { columns } from "@/app/cp/products/_components/columns"

import DataTable from "@/app/cp/products/_components/data-table"
import DataPagination from "@/app/cp/products/_components/data-pagination"

import { Button } from "@/components/ui/button"

import Link from "next/link"

import { ArrowUpDown, Eye, ListFilter, Plus, SlidersHorizontal } from "lucide-react"

import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import _ from 'lodash'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { redirect } from "next/navigation"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string  }
}) {
  if (!['active', 'archived', 'all'].includes(`${searchParams?.tab}`))
    redirect('?tab=active')

  const index = parseInt(`${searchParams?.page}`) || 1
  const size = 10

  const [products, count] = await db.$transaction([
    db.product.findMany({
      skip: (size) * (index - 1), 
      take: size,
      include: { productShots: true },
      where: { 
        ...(searchParams!.tab === 'all' ? {} : {
          status: searchParams!.tab
        })
      },
      orderBy: [{
        name: searchParams?.sort === 'name' ? 'desc' : undefined,
        stock: searchParams?.sort === 'stock' ? 'desc' : undefined,
        priceInTheSmallestDenomination: 
          searchParams?.sort === 'priceInTheSmallestDenomination' ? 
            'desc' : 
            undefined
      }]
    }),
    db.product.count({
      where: {
        ...(searchParams!.tab === 'all' ? {} : {
          status: searchParams!.tab
        })
      }
    })
  ])

  return(
    <>
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="flex text-3xl font-bold text-foreground">
          Product assortment
        </h1>
        <div className="grid items-center sm:grid-cols-2 gap-2">
          <Tabs value={searchParams?.tab}>
            <TabsList className="h-8">
              <TabsTrigger 
                value="active"
                className="h-6"
                asChild
              >
                <Link href={`?${new URLSearchParams({
                  ...searchParams,
                  tab: 'active'
                })}`}>
                  Active
                </Link>
              </TabsTrigger>
              <TabsTrigger 
                value="archived"
                className="h-6"
                asChild
              >
               <Link href={`?${new URLSearchParams({
                  ...searchParams,
                  tab: 'archived'
                })}`}>
                  Archived
                </Link> 
              </TabsTrigger>
              <TabsTrigger 
                value="all"
                className="h-6"
                asChild
              >
                <Link href={`?${new URLSearchParams({
                  ...searchParams,
                  tab: 'all'
                })}`}>
                  All
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex sm:justify-end items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size={"xs"}
                  variant={"outline"}
                  className="shadow-sm"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Display
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Display</DropdownMenuLabel>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Sort by
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="min-w-44">
                      <DropdownMenuRadioGroup value={searchParams?.sort}>
                        <DropdownMenuLabel>
                          Columns
                        </DropdownMenuLabel>
                        <Link href={`?${new URLSearchParams({
                          ...(searchParams ? _.omit(searchParams, ['sort']) : {}),
                          ...(searchParams?.sort === 'name' ? {} : { sort: 'name' })
                        })}`}>
                          <DropdownMenuRadioItem value="name">
                            Product
                          </DropdownMenuRadioItem>
                        </Link>
                        <Link href={`?${new URLSearchParams({
                          ...(searchParams ? _.omit(searchParams, ['sort']) : {}),
                          ...(searchParams?.sort === 'stock' ? {} : { sort: 'stock' })
                        })}`}>
                          <DropdownMenuRadioItem value="stock">
                            Stock
                          </DropdownMenuRadioItem>
                        </Link>
                        <Link href={`?${new URLSearchParams({
                          ...(searchParams ? _.omit(searchParams, ['sort']) : {}),
                          ...(searchParams?.sort === 'priceInTheSmallestDenomination' ? {} : { sort: 'priceInTheSmallestDenomination' })
                        })}`}>
                          <DropdownMenuRadioItem value="priceInTheSmallestDenomination">
                            Price
                          </DropdownMenuRadioItem>
                        </Link>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Eye className="mr-2 h-4 w-4" />
                      Visibility
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="min-w-44">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>
                          Columns
                        </DropdownMenuLabel>
                        <Link
                          href={`?${new URLSearchParams({
                            ...(searchParams ? _.omit(searchParams, ['hidden']) : {}),
                            ...(
                              searchParams?.hidden ? (
                                searchParams.hidden.includes('status') ? (
                                  searchParams.hidden === 'status' ? {} : ({
                                    hidden: _.without(searchParams.hidden.split(','), 'status').join()
                                  })
                                ) : ({ 
                                  hidden: searchParams.hidden.split(',').concat('status').join() 
                                })
                              ) : { hidden: 'status' }
                            )
                          })}`}
                        >
                          <DropdownMenuCheckboxItem
                            checked={!(searchParams?.hidden && 
                              searchParams.hidden.includes('status'))
                            }
                          >
                            Status
                          </DropdownMenuCheckboxItem>
                        </Link>
                        <Link
                          href={`?${new URLSearchParams({
                            ...(searchParams ? _.omit(searchParams, ['hidden']) : {}),
                            ...(
                              searchParams?.hidden ? (
                                searchParams.hidden.includes('stock') ? (
                                  searchParams.hidden === 'stock' ? {} : ({
                                    hidden: _.without(searchParams.hidden.split(','), 'stock').join()
                                  })
                                ) : ({ 
                                  hidden: searchParams.hidden.split(',').concat('stock').join() 
                                })
                              ) : { hidden: 'stock' }
                            )
                          })}`}
                        >
                          <DropdownMenuCheckboxItem
                            checked={!(searchParams?.hidden && 
                              searchParams.hidden.includes('stock'))
                            }
                          >
                            Stock
                          </DropdownMenuCheckboxItem>
                        </Link>
                        <Link
                          href={`?${new URLSearchParams({
                            ...(searchParams ? _.omit(searchParams, ['hidden']) : {}),
                            ...(
                              searchParams?.hidden ? (
                                searchParams.hidden.includes('priceInTheSmallestDenomination') ? (
                                  searchParams.hidden === 'priceInTheSmallestDenomination' ? {} : ({
                                    hidden: _.without(searchParams.hidden.split(','), 'priceInTheSmallestDenomination').join()
                                  })
                                ) : ({ 
                                  hidden: searchParams.hidden.split(',').concat('priceInTheSmallestDenomination').join() 
                                })
                              ) : { hidden: 'priceInTheSmallestDenomination' }
                            )
                          })}`}
                        >
                          <DropdownMenuCheckboxItem
                            checked={!(searchParams?.hidden && 
                              searchParams.hidden.includes('priceInTheSmallestDenomination'))
                            }
                          >
                            Price
                          </DropdownMenuCheckboxItem>
                        </Link>
                      </DropdownMenuGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <Link href={'?'}>
                  <DropdownMenuItem>
                    Reset to default
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              size={"xs"} 
              asChild
            >
              <Link href={`?${new URLSearchParams({
                ...searchParams,
                modal: 'create',
              })}`}>
                <Plus className="mr-2 h-4 w-4"/> Add product
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <DataTable   
        data={products} 
        columns={columns}
        columnVisibility={Object.fromEntries(
          searchParams?.hidden ? (
            searchParams.hidden.split(',').map(e => [e, false])
          ) : []
        )}
      />
      <div className="w-full flex items-center mt-4 px-2">
        <p 
          className="text-sm whitespace-nowrap"
        >
          {(+(!!count)) + (size * (index - 1))} &mdash; {Math.min(size * index, count)} of {count} rows.
        </p>
        <div className="flex items-center gap-6 ml-auto">
          <p className="text-sm font-medium whitespace-nowrap">
            Page {searchParams?.page ?? +(!!count)} of {Math.ceil(count / size)}
          </p>
          <DataPagination 
            count={count}
            index={index}
            size={size}
            init={searchParams}
            edges={0}
            core={false}
            className="justify-end"
          />
        </div>
      </div>
    </>
  )
}
