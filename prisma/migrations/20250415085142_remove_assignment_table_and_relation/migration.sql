/*
  Warnings:

  - You are about to drop the `assignments` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AssignmentType" AS ENUM ('ENGLISH', 'MATH');

-- DropForeignKey
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_student_id_fkey";

-- DropForeignKey
ALTER TABLE "grades" DROP CONSTRAINT "grades_assignment_id_fkey";

-- DropTable
DROP TABLE "assignments";
