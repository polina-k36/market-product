/*
  Warnings:

  - You are about to drop the column `id_group` on the `stock_reservation` table. All the data in the column will be lost.
  - You are about to drop the column `id_product` on the `stock_reservation` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `stock_reservation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `stock_reservation` DROP FOREIGN KEY `fk_stock_reservation_shop1`;

-- DropForeignKey
ALTER TABLE `stock_reservation` DROP FOREIGN KEY `fk_stock_reservation_user1`;

-- DropIndex
DROP INDEX `fk_stock_reservation_product1_idx` ON `stock_reservation`;

-- DropIndex
DROP INDEX `stock_reservation_group_idx` ON `stock_reservation`;

-- DropIndex
DROP INDEX `unique_stock_reservation` ON `stock_reservation`;

-- AlterTable
ALTER TABLE `stock_reservation` DROP COLUMN `id_group`,
    DROP COLUMN `id_product`,
    DROP COLUMN `quantity`;

-- CreateTable
CREATE TABLE `stock_reservation_item` (
    `id_stock_reservation_item` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` DECIMAL(10, 3) NOT NULL,
    `id_stock_reservation` INTEGER NOT NULL,
    `id_product` INTEGER NOT NULL,

    INDEX `fk_stock_reservation_item_product1_idx`(`id_product`),
    INDEX `fk_stock_reservation_item_reservation1_idx`(`id_stock_reservation`),
    UNIQUE INDEX `unique_stock_reservation_item`(`id_stock_reservation`, `id_product`),
    PRIMARY KEY (`id_stock_reservation_item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `stock_reservation_id_user_expires_at_idx` ON `stock_reservation`(`id_user`, `expires_at`);

-- AddForeignKey
ALTER TABLE `stock_reservation` ADD CONSTRAINT `stock_reservation_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_reservation` ADD CONSTRAINT `stock_reservation_id_shop_fkey` FOREIGN KEY (`id_shop`) REFERENCES `shop`(`id_shop`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_reservation_item` ADD CONSTRAINT `stock_reservation_item_id_stock_reservation_fkey` FOREIGN KEY (`id_stock_reservation`) REFERENCES `stock_reservation`(`id_stock_reservation`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_reservation_item` ADD CONSTRAINT `stock_reservation_item_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `product`(`id_product`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `stock_reservation` RENAME INDEX `fk_stock_reservation_shop1_idx` TO `fk_stock_reservation_item_shop1_idx`;

-- RenameIndex
ALTER TABLE `stock_reservation` RENAME INDEX `fk_stock_reservation_user1_idx` TO `fk_stock_reservation_item_user1_idx`;
