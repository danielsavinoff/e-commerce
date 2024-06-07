/*
  Warnings:

  - You are about to drop the column `filename` on the `ProductShot` table. All the data in the column will be lost.
  - Added the required column `pathname` to the `ProductShot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductShot" DROP COLUMN "filename",
ADD COLUMN     "pathname" TEXT NOT NULL;
