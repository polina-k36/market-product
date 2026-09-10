/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `url_avatar` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `thumbnail`,
    ADD COLUMN `image_key` VARCHAR(255) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `user` DROP COLUMN `url_avatar`,
    ADD COLUMN `avatar_url` TEXT NULL;
