/*
  Warnings:

  - You are about to drop the column `expire_date` on the `user_card` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_card` DROP FOREIGN KEY `user_card_ibfk_1`;

-- DropIndex
DROP INDEX `unique_user_card` ON `user_card`;

-- AlterTable
ALTER TABLE `user_card` DROP COLUMN `expire_date`,
    ADD COLUMN `card_brand` ENUM('MIR', 'VISA', 'MASTERCARD') NOT NULL DEFAULT 'MIR',
    ADD COLUMN `expire_month` INTEGER NULL,
    ADD COLUMN `expire_year` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user_card` ADD CONSTRAINT `user_card_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;
