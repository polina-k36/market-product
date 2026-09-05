/*
  Warnings:

  - You are about to drop the column `token_hash` on the `verification` table. All the data in the column will be lost.
  - Added the required column `value_hash` to the `verification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `verification` DROP COLUMN `token_hash`,
    ADD COLUMN `value_hash` TEXT NOT NULL;
