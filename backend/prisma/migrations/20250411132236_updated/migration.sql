/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `task` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `updatedAt`,
    ADD COLUMN `dueDate` DATETIME(3) NOT NULL;
