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
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Product',
    cell: ({ row }) => (
      <Link
        href={`/${row.original.slug}`}
        className="flex items-center group"
      >
        <div className="overflow-hidden hidden md:inline-block rounded-md">
          <img 
            src={row.original.productShots[0].pathname}
            className='h-12 aspect-square object-cover group-hover:scale-105  group-hover:brightness-95 transition-all'
          />
        </div>
        <span className="ml-2 font-medium text-ellipsis whitespace-nowrap overflow-hidden">
          {row.original.name}
        </span>
      </Link>
    ),
    enableSorting: false
  },
  {
    accessorKey: 'priceInTheSmallestDenomination',
    header: ({ header }) => (
      <ColumnHeader header={header.id}>
        Price
      </ColumnHeader>
    ),
    accessorFn: (row) => {
      const divider = parseInt(process.env.NEXT_PUBLIC_APP_CURRENCY_CONVERSION_FACTOR!)

      return new Intl.NumberFormat(undefined, {
        currency: process.env.NEXT_PUBLIC_APP_CURRENCY_CODE,
        style: 'currency',
        currencyDisplay: 'narrowSymbol'
      }).format(row.priceInTheSmallestDenomination / divider)
    }
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