/*
  Warnings:

  - A unique constraint covering the columns `[assignment_id]` on the table `assignments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assignment_id` to the `assignments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `assignments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assignments" ADD COLUMN     "assignment_id" UUID NOT NULL,
ADD COLUMN     "student_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "assignments_assignment_id_key" ON "assignments"("assignment_id");

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
