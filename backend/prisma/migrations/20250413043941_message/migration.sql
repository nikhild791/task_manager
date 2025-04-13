/*
  Warnings:

  - Added the required column `completedAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` ADD COLUMN `completedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `message` VARCHAR(191) NOT NULL,
    `senderName` VARCHAR(191) NOT NULL,
    `roomId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
