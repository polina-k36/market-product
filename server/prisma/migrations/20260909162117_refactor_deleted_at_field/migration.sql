/*
  Warnings:

  - The primary key for the `cart_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_cart_item` on the `cart_item` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - A unique constraint covering the columns `[id_user,city,street,house,apartment]` on the table `user_address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_user,card_last4]` on the table `user_card` will be added. If there are existing duplicate values, this will fail.
  - Made the column `id_user` on table `user_card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_deleted` on table `user_card` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `user_card` DROP FOREIGN KEY `user_card_ibfk_1`;

-- DropIndex
DROP INDEX `id_cart_item` ON `cart_item`;

-- AlterTable
ALTER TABLE `cart_item` DROP PRIMARY KEY,
    MODIFY `id_cart_item` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_cart_item`);

-- AlterTable
ALTER TABLE `category` ADD COLUMN `deleted_at` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `delivery_method` ADD COLUMN `deleted_at` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `invoice_type` ADD COLUMN `deleted_at` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `nds` ADD COLUMN `deleted_at` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `payment_method` ADD COLUMN `deleted_at` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `deleted_at` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `shop` ADD COLUMN `deleted_at` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `status` ADD COLUMN `deleted_at` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `supplier` ADD COLUMN `deleted_at` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `unit` ADD COLUMN `deleted_at` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deleted_at` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `user_card` MODIFY `id_user` INTEGER NOT NULL,
    MODIFY `is_deleted` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `unique_user_address` ON `user_address`(`id_user`, `city`, `street`, `house`, `apartment`);

-- CreateIndex
CREATE UNIQUE INDEX `unique_user_card` ON `user_card`(`id_user`, `card_last4`);

-- AddForeignKey
ALTER TABLE `user_card` ADD CONSTRAINT `user_card_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;
