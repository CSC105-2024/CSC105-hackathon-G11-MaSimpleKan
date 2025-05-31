-- CreateTable
CREATE TABLE `Votes` (
    `id` VARCHAR(191) NOT NULL,
    `commentId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Votes_userId_commentId_idx`(`userId`, `commentId`),
    UNIQUE INDEX `Votes_userId_commentId_key`(`userId`, `commentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
