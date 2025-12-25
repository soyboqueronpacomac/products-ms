-- CreateEnum
CREATE TYPE "ValidTypes" AS ENUM ('shirts', 'pants', 'hoodies', 'hats');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "type" "ValidTypes" NOT NULL DEFAULT 'shirts';
