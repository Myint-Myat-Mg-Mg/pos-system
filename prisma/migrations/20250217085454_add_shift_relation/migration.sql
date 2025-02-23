/*
  Warnings:

  - You are about to drop the column `saleId` on the `Voucher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[voucherNumber]` on the table `Voucher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `voucherNumber` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Voucher_saleId_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shiftId" TEXT;

-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "saleId",
ADD COLUMN     "shiftId" TEXT,
ADD COLUMN     "voucherNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_voucherNumber_key" ON "Voucher"("voucherNumber");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;
