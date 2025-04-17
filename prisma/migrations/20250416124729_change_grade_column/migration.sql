/*
  Warnings:

  - Changed the type of `grade` on the `grades` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "grades" DROP COLUMN "grade",
ADD COLUMN     "grade" INTEGER NOT NULL;
