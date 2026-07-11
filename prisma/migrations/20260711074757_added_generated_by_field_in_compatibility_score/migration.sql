/*
  Warnings:

  - Added the required column `generatedBy` to the `CompatibilityScore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CompatibilityScore" ADD COLUMN     "generatedBy" TEXT NOT NULL;
