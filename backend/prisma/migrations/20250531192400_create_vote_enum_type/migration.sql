/*
  Warnings:

  - Added the required column `voteType` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Votes` ADD COLUMN `voteType` ENUM('Correct', 'Simple') NOT NULL;
