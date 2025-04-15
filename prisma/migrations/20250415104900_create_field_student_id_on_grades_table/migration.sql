/*
  Warnings:

  - Added the required column `student_id` to the `grades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "grades" ADD COLUMN     "student_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
