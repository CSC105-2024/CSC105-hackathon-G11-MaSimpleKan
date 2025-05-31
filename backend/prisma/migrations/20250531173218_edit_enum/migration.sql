/*
  Warnings:

  - The values [math,biology,chemistry,physics,computer] on the enum `Post_subject` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `subject` ENUM('Math', 'Biology', 'Chemistry', 'Physics', 'Computer') NOT NULL;
