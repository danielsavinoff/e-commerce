import { notFound } from "next/navigation"
import { db } from "@/database/db"

import { 
  PageDescription, 
  PageHead, 
  PageHeader, 
  PageTitle 
} from "@/app/cp/_components/header"

import ProductForm from "@/app/cp/products/_components/forms/product-form"

import { updateProduct } from "@/app/cp/products/_actions/product-actions"

export default async function EditProductPage({ 
  params: { id }
}: {
  params: { id: string }
}) {
  const selectedProduct = await db.product.findUnique({
    where: { id },
    include: { productShots: true }
  })

  if (!selectedProduct) return notFound()

  return(
    <>
      <PageHead className="border-b-0">
        <PageHeader>
          <PageTitle>
            Edit product
          </PageTitle>
          <PageDescription>
            Fill in the form to edit the selected product
          </PageDescription>
        </PageHeader>
      </PageHead>
      <ProductForm 
        action={updateProduct}
        defaultValues={selectedProduct}
      />
    </>
  )
}

