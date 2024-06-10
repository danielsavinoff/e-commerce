'use server'

import fs from 'fs/promises'
import path from "path"

import { db } from "@/database/db"

import { z } from "zod"

import slugify from 'slugify'
import { redirect } from 'next/navigation'

const image = (z
  .instanceof(File)
  .refine(file => 
    file.size === 0 || file.type.startsWith('image/'), 'File should be in the image format'
  )
  .refine(file => file.size > 0, 'Image is required')
  .refine(file => file.size < (2**20)* 5, `Image should not exceed the size of 5 MB`)
)

const imageCollection = image.array().max(4, 'Too many images attached')

const addProductSchema = z.object({
  name: z.string().min(1).max(2**6),
  priceInTheSmallestDenomination: z.coerce.number().int().nonnegative(),
  productShot: image.or(imageCollection),
  status: z.enum(["active", "archived"])
})

const groupFormDataEntries = (formData: FormData) => {
  const input: Record<string, unknown> = {}

  for (const [key, entry] of formData.entries()) {
    if (typeof input[key] !== 'undefined') {
      if (Array.isArray(input[key]))
        input[key] = [...input[key], entry]
      else 
        input[key] = [input[key], entry]
    } else 
      input[key] = entry
  }

  return input
}

const root = `public/`

const saveProductShots = (data: File | File[], dir: string) => {
  const shots: { pathname: string, position: number }[] = []

  const files = Array.isArray(data) ? 
    [...data] : 
    [data]

  files.forEach(async (file, i) => {
    const fileExtension = file.type.split('/')[1]

    const name = `${crypto.randomUUID()}.${fileExtension}`
    shots.push({ pathname: `${dir}/${name}`, position: i })

    await fs.writeFile(
      path.join(`${root}${dir}`, name), 
      new Uint8Array(await file.arrayBuffer())
    )
  }) 

  return shots
}

async function addProduct(_: unknown, formData: FormData) {
  const grouppedData = groupFormDataEntries(formData)

  const { data, error } = addProductSchema.safeParse(grouppedData)
  
  if (error)
    return error.formErrors.fieldErrors
  
  const dir = `/products`

  await fs.mkdir(`${root}${dir}`, { recursive: true })

  const shots = saveProductShots(data.productShot, dir)

  await db.product.create({ 
    data: {
      name: data.name,
      priceInTheSmallestDenomination: data.priceInTheSmallestDenomination,
      slug: slugify(data.name),
      productShots: {
        createMany: {
          data: shots
        }
      },
      status: data.status
    }
  })

  redirect('products')
}

const updateProductSchema = addProductSchema.merge(z.object({
  productShot: image.or(imageCollection).optional(),
  id: z.string().cuid()
}))

async function updateProduct(_: unknown, formData: FormData) {
  const grouppedData = groupFormDataEntries(formData)

  const { data, error } = updateProductSchema.safeParse(grouppedData) 

  if (error) 
    return error.formErrors.fieldErrors

  let shots
  
  if (data.productShot) {
    const dir = `/products`

    shots = saveProductShots(data.productShot, dir)

    const old = await db.productShot.findMany({
      where: { productId: data.id },
      select: { pathname: true }
    })

    old.forEach(async ({ pathname }) => {
      await fs.rm(`${root}${pathname}`)
    })
  }

  await db.product.update({
    where: { id: data.id },
    data: {
      name: data.name,
      priceInTheSmallestDenomination: data.priceInTheSmallestDenomination,
      slug: slugify(data.name),
      status: data.status,
      ...(shots ? { 
        productShots: {
          deleteMany: { productId: data.id },
          createMany: { data: shots }
        }
      } : {})
    }
  })

  redirect('products')
}

async function deleteProduct({ id }: { id: string }) {
  if (typeof id !== 'string') return null

  const removedProduct = await db.product.delete({
    where: { id },
    include: { productShots: true }
  })

  removedProduct.productShots.forEach(async ({ pathname }) => {
    await fs.rm(`${root}${pathname}`)
  })
}

export { 
  addProduct, 
  updateProduct, 
  deleteProduct 
}