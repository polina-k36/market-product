-- CreateTable
CREATE TABLE `stock_reservation` (
    `id_stock_reservation` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` DECIMAL(10, 3) NOT NULL DEFAULT 0,
    `expires_at` DATETIME(3) NOT NULL,
    `id_product` INTEGER NOT NULL,
    `id_shop` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_stock_reservation_product1_idx`(`id_product`),
    INDEX `fk_stock_reservation_shop1_idx`(`id_shop`),
    UNIQUE INDEX `unique_stock_reservation`(`id_product`, `id_shop`, `id_user`),
    PRIMARY KEY (`id_stock_reservation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stock_reservation` ADD CONSTRAINT `fk_stock_reservation_product1` FOREIGN KEY (`id_product`) REFERENCES `product`(`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `stock_reservation` ADD CONSTRAINT `fk_stock_reservation_shop1` FOREIGN KEY (`id_shop`) REFERENCES `shop`(`id_shop`) ON DELETE NO ACTION ON UPDATE NO ACTION;
