/*
  Warnings:

  - Added the required column `updated_at` to the `grades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "grades" ADD COLUMN     "updated_at" TIMESTAMP NOT NULL;
