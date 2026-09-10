/*
  Warnings:

  - You are about to drop the column `reserved_stock` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `reserved_stock`,
    DROP COLUMN `stock`;

-- CreateTable
CREATE TABLE `product_stock` (
    `id_product_stock` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` DECIMAL(10, 3) NOT NULL DEFAULT 0,
    `reserved_quantity` DECIMAL(10, 3) NOT NULL DEFAULT 0,
    `id_product` INTEGER NOT NULL,
    `id_shop` INTEGER NOT NULL,

    INDEX `fk_product_stock_product1_idx`(`id_product`),
    INDEX `fk_product_stock_shop1_idx`(`id_shop`),
    UNIQUE INDEX `unique_product_stock`(`id_product`, `id_shop`),
    PRIMARY KEY (`id_product_stock`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_stock` ADD CONSTRAINT `fk_product_stock_product1` FOREIGN KEY (`id_product`) REFERENCES `product`(`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_stock` ADD CONSTRAINT `fk_product_stock_shop1` FOREIGN KEY (`id_shop`) REFERENCES `shop`(`id_shop`) ON DELETE NO ACTION ON UPDATE NO ACTION;
