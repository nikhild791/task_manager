/*
  Warnings:

  - The values [MEDIUM] on the enum `Task_level` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `task` ADD COLUMN `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'LOW',
    MODIFY `status` ENUM('PENDING', 'COMPLETED', 'WORKINPROGRESS', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    MODIFY `level` ENUM('EASY', 'AVERAGE', 'HARD') NOT NULL DEFAULT 'EASY';
