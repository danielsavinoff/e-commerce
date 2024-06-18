'use client'

import { useEffect, useState } from "react"

import { ProductForm } from "@/app/cp/products/_components/forms/product-form"

import { addProduct, updateProduct } from "@/app/cp/products/_actions/product-actions"

import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle, 
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Loader } from "lucide-react"

export default function ProductSheet() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  
  const action = searchParams.get('modal')

  const [open, setOpen] = useState<boolean>(false)
  const [isFormPending, setIsFormPending] = useState<boolean>(false)

  useEffect(() => setOpen(!!action), [searchParams])

  const formAction = action === 'create' ? addProduct : updateProduct

  if (action !== 'create' && action !== 'edit') return null

  return(
    <Sheet 
      open={open}
      onOpenChange={setOpen}
    >
      <SheetContent
        className="rounded-tl-md rounded-bl-md lg:max-w-lg overflow-auto"
        onAnimationEndCapture={() => {
          if (!open) {
            const nextSearchParams = new URLSearchParams(searchParams)

            nextSearchParams.delete('modal')

            router.push(`${pathname}?${nextSearchParams}`)
          }
        }}
      >
        <div className="flex flex-col h-full w-full">
          <div className="p-6">
            <SheetHeader>
              <SheetTitle>
                {`${action[0].toUpperCase()}${action.substring(1)}`} product
              </SheetTitle>
              <SheetDescription>
                Fill in the form to {action} a product
              </SheetDescription>
            </SheetHeader>
            <ProductForm 
              action={formAction}
              onPendingChange={setIsFormPending}
            />
          </div>
          <SheetFooter className="w-full sticky bottom-0 mt-auto p-6 bg-background border-t border-border">
            <SheetClose>
              <Button
                variant={"outline"}
                className="shadow-sm w-full sm:w-auto"
              >
                Cancel
              </Button>
            </SheetClose>
            <Button
              type="submit"
              form="product-form"
              disabled={isFormPending}
              className="w-full sm:w-auto"
            >
              {isFormPending ? (
                <Loader className="h-4 w-4 animate-spin" />
              ): (
                'Save'
              )}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}