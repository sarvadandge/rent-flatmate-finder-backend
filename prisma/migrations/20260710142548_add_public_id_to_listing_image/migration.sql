/*
  Warnings:

  - Added the required column `publicId` to the `ListingImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ListingImage" ADD COLUMN     "publicId" TEXT NOT NULL;
