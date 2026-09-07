/*
  Warnings:

  - Made the column `is_banned` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `is_banned` BOOLEAN NOT NULL DEFAULT false;
