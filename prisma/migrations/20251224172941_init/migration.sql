-- CreateEnum
CREATE TYPE "ValidSizes" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- CreateEnum
CREATE TYPE "ValidTypes" AS ENUM ('SHIRTS', 'PANTS', 'HOODIES', 'HATS');

-- CreateEnum
CREATE TYPE "ValidGender" AS ENUM ('MEN', 'WOMEN', 'KID', 'UNISEX');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "slug" TEXT NOT NULL,
    "sizes" "ValidSizes"[],
    "tags" "ValidTypes"[],
    "gender" "ValidGender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_title_key" ON "Product"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
