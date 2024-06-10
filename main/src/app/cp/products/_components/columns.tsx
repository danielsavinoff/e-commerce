"use client"

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronsUpDown, Edit, EyeOff, MoreHorizontal, Trash2 } from 'lucide-react'
import {
  CaretSortIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import Link from 'next/link'
import { deleteProduct } from '../_actions/product-actions'

import { Product, ProductShot } from '@prisma/client'
import { Checkbox } from '@/components/ui/checkbox'
import { usePathname, useSearchParams, useSelectedLayoutSegment } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import React from 'react'

const ColumnHeader = ({ 
  header, 
  children,
  sortable = true
}: { 
  header: string
  children?: React.ReactNode
  sortable?: boolean 
}) => {
  const segment = usePathname().split('/').at(-1)?.split('?')[0]
  const params = useSearchParams()
  
  const currentDirection = params.get(header)
  const nextDirection = {
    asc: 'desc',
    desc: undefined,
    default: 'asc'
  }[currentDirection || 'default']

  const newParams = new URLSearchParams(params)

  newParams.set('page', '1')

  if (!nextDirection)
    newParams.delete(header)
  else
    newParams.set(header, nextDirection)

  return (
    <Button variant={'ghost'} asChild>
      <Link 
        href={`${segment}?${newParams.toString()}`}
        className='flex items-center text-muted-foreground -translate-x-4'
      >
      {children}
      {{
        asc: <ArrowUp className='ml-2 h-4 w-4'/>,
        desc: <ArrowDown className='ml-2 h-4 w-4'/>
      }[currentDirection || ''] ?? 
        <CaretSortIcon className='ml-2 h-4 w-4'/>
      }  
    </Link>
    </Button>
  )
}

export const columns: ColumnDef<Product & { productShots: ProductShot[]}>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: 'productImage',
    cell: ({ row }) => (
      <div 
        className="align-middle h-8 aspect-square overflow-hidden rounded-sm" 
        role='image'
      >
        <img 
          src={row.original.productShots[0].pathname}
          className='h-full aspect-square object-cover'
        />
      </div>
    ),
    header: () => <span role='image' /> 
  },
  {
    accessorKey: 'name',
    header: 'Product',
    cell: ({ row }) => (
      <Link
        href={`${row.original.status}/${row.original.slug}`}
        className="flex items-center group"
      >
        <span className="font-medium text-ellipsis whitespace-nowrap overflow-hidden">
          {row.original.name}
        </span>
      </Link>
    ),
    enableSorting: false
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant={'outline'}
      >
        {`${row.original.status[0].toUpperCase()}${row.original.status.substring(1)}`}
      </Badge>
    )
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => (
      <span className='text-nowrap'>
        {`${row.original.stock} items`}
      </span>
    )
  },
  {
    accessorKey: 'priceInTheSmallestDenomination',
    header: 'Price',
    accessorFn: (row) => {
      const divider = parseInt(process.env.NEXT_PUBLIC_APP_CURRENCY_CONVERSION_FACTOR!)
      const currency = process.env.NEXT_PUBLIC_APP_CURRENCY_CODE
      
      return new Intl.NumberFormat(undefined, {
        currency,
        style: 'currency',
        currencyDisplay: 'narrowSymbol',
      }).format(row.priceInTheSmallestDenomination / divider) + ` ${currency}`
    },
    cell: ({ getValue }) => (
      <span className="text-nowrap">
        {getValue() as React.ReactNode}
      </span>
    )
  },
  {
    id: 'action',
    cell: ({ row: { original: product } }) => {
      return(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={'sm'}>
              <DotsHorizontalIcon className='h-4 w-4' />
              <span className="sr-only">Open action menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={`/cp/products/edit/${product.id}`}>
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Hide
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deleteProduct({ id: product.id })}
            >
                Delete
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]