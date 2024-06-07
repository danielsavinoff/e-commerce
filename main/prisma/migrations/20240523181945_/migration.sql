-- CreateTable
CREATE TABLE "ProductShot" (
    "productShotId" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "isPreview" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProductShot_pkey" PRIMARY KEY ("productShotId")
);

-- AddForeignKey
ALTER TABLE "ProductShot" ADD CONSTRAINT "ProductShot_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;
