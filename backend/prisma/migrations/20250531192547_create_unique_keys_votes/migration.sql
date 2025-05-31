/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId,voteType]` on the table `Votes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Votes` DROP FOREIGN KEY `Votes_userId_fkey`;

-- DropIndex
DROP INDEX `Votes_userId_commentId_idx` ON `Votes`;

-- DropIndex
DROP INDEX `Votes_userId_commentId_key` ON `Votes`;

-- CreateIndex
CREATE INDEX `Votes_userId_commentId_voteType_idx` ON `Votes`(`userId`, `commentId`, `voteType`);

-- CreateIndex
CREATE UNIQUE INDEX `Votes_userId_commentId_voteType_key` ON `Votes`(`userId`, `commentId`, `voteType`);

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
