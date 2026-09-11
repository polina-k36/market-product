/*
  Warnings:

  - The values [EMAIL] on the enum `verification_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `verification` ADD COLUMN `reset_token_hash` TEXT NULL,
    MODIFY `type` ENUM('EMAIL_VERIFICATION', 'PASSWORD_RESET') NOT NULL;
