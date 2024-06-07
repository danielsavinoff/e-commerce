import { PageDescription, PageHead, PageHeader, PageTitle } from "../../_components/header"
import { addProduct } from "../_actions/product-actions"
import ProductForm from "../_components/forms/product-form"

export default function AddNewProductPage() {
  return(
    <>
      <PageHead className="border-b-0">
        <PageHeader>
          <PageTitle>
            Add product
          </PageTitle>
          <PageDescription>
            Fill in the form to add a new product
          </PageDescription>
        </PageHeader>
      </PageHead>
      <ProductForm action={addProduct} />
    </>
  )
}