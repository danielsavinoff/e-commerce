/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `priceInSmallestUnit` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `ProductShot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isPreview` on the `ProductShot` table. All the data in the column will be lost.
  - You are about to drop the column `productShotId` on the `ProductShot` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GlobalSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `Product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `priceInTheSmallestDenomination` to the `Product` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `ProductShot` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `position` to the `ProductShot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductShot" DROP CONSTRAINT "ProductShot_productId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "priceInSmallestUnit",
DROP COLUMN "productId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "priceInTheSmallestDenomination" INTEGER NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductShot" DROP CONSTRAINT "ProductShot_pkey",
DROP COLUMN "isPreview",
DROP COLUMN "productShotId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "position" INTEGER NOT NULL,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductShot_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "GlobalSettings";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- AddForeignKey
ALTER TABLE "ProductShot" ADD CONSTRAINT "ProductShot_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
