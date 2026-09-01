-- AlterTable
ALTER TABLE `user` ADD COLUMN `email_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `phone_verified` BOOLEAN NOT NULL DEFAULT false;
