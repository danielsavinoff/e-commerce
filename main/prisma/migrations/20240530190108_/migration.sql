-- DropForeignKey
ALTER TABLE "ProductShot" DROP CONSTRAINT "ProductShot_productId_fkey";

-- AddForeignKey
ALTER TABLE "ProductShot" ADD CONSTRAINT "ProductShot_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;
