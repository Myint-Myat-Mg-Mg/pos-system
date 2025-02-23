-- CreateEnum
CREATE TYPE "ShiftStatus" AS ENUM ('ONGOING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "status" "ShiftStatus" NOT NULL DEFAULT 'ONGOING';
