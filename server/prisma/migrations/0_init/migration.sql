-- CreateTable
CREATE TABLE `cart` (
    `id_cart` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_cart`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_item` (
    `id_cart_item` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_cart` INTEGER NOT NULL,
    `id_product` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id_cart_item`(`id_cart_item`),
    INDEX `fk_cart_items_product`(`id_product`),
    UNIQUE INDEX `unique_cart_product`(`id_cart`, `id_product`),
    PRIMARY KEY (`id_cart_item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id_category` INTEGER NOT NULL AUTO_INCREMENT,
    `title_category` VARCHAR(150) NOT NULL,
    `is_deleted` TINYINT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `custom_order` (
    `id_custom_order` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(0) NOT NULL,
    `delivery_city` VARCHAR(300) NULL,
    `delivery_street` VARCHAR(300) NULL,
    `delivery_house` VARCHAR(20) NULL,
    `delivery_apartment` VARCHAR(20) NULL,
    `id_shop` INTEGER NOT NULL,
    `id_status` INTEGER NOT NULL,
    `id_payment_method` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `id_delivery_method` INTEGER NOT NULL,
    `id_user_card` INTEGER NULL,
    `total_price` DECIMAL(10, 2) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_order_delivery_method1_idx`(`id_delivery_method`),
    INDEX `fk_order_payment_method1_idx`(`id_payment_method`),
    INDEX `fk_order_shop1_idx`(`id_shop`),
    INDEX `fk_order_status1_idx`(`id_status`),
    INDEX `fk_order_user1_idx`(`id_user`),
    INDEX `fk_order_user_card`(`id_user_card`),
    PRIMARY KEY (`id_custom_order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery_method` (
    `id_delivery_method` INTEGER NOT NULL AUTO_INCREMENT,
    `title_delivery_method` VARCHAR(150) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `title_delivery_method_UNIQUE`(`title_delivery_method`),
    PRIMARY KEY (`id_delivery_method`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice` (
    `id_invoice` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(0) NOT NULL,
    `id_supplier` INTEGER NULL,
    `id_invoice_type` INTEGER NOT NULL,
    `id_custom_order` INTEGER NULL,
    `id_shop` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_invoice_invoice_type1_idx`(`id_invoice_type`),
    INDEX `fk_invoice_order1_idx`(`id_custom_order`),
    INDEX `fk_invoice_shop1_idx`(`id_shop`),
    INDEX `fk_invoice_supplier1_idx`(`id_supplier`),
    PRIMARY KEY (`id_invoice`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_item` (
    `id_invoice_item` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(10, 2) NOT NULL,
    `quantity` DECIMAL(10, 3) NOT NULL,
    `id_product` INTEGER NOT NULL,
    `id_invoice` INTEGER NOT NULL,

    INDEX `fk_invoice_item_invoice1_idx`(`id_invoice`),
    INDEX `fk_invoice_item_product1_idx`(`id_product`),
    UNIQUE INDEX `invoice_item_UNIQUE`(`id_invoice`, `id_product`),
    PRIMARY KEY (`id_invoice_item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_type` (
    `id_invoice_type` INTEGER NOT NULL AUTO_INCREMENT,
    `title_invoice_type` VARCHAR(45) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `title_invoice_type_UNIQUE`(`title_invoice_type`),
    PRIMARY KEY (`id_invoice_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nds` (
    `id_nds` INTEGER NOT NULL AUTO_INCREMENT,
    `rate` DECIMAL(5, 2) NOT NULL,
    `title_rate` VARCHAR(150) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `rate_UNIQUE`(`rate`),
    UNIQUE INDEX `title_UNIQUE`(`title_rate`),
    PRIMARY KEY (`id_nds`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_item` (
    `id_order_item` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(10, 2) NOT NULL,
    `quantity` DECIMAL(10, 3) NOT NULL,
    `id_custom_order` INTEGER NOT NULL,
    `id_product` INTEGER NOT NULL,

    INDEX `fk_order_item_order1_idx`(`id_custom_order`),
    INDEX `fk_order_item_product1_idx`(`id_product`),
    UNIQUE INDEX `order_item_UNIQUE`(`id_custom_order`, `id_product`),
    PRIMARY KEY (`id_order_item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_method` (
    `id_payment_method` INTEGER NOT NULL AUTO_INCREMENT,
    `title_payment_method` VARCHAR(300) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `title_payment_method_UNIQUE`(`title_payment_method`),
    PRIMARY KEY (`id_payment_method`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id_product` INTEGER NOT NULL AUTO_INCREMENT,
    `title_product` VARCHAR(300) NOT NULL,
    `description` TEXT NOT NULL,
    `composition` TEXT NOT NULL,
    `thumbnail` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `is_deleted` TINYINT NOT NULL DEFAULT 0,
    `id_category` INTEGER NOT NULL,
    `id_unit` INTEGER NOT NULL,
    `id_nds` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `reserved_stock` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `title_product_UNIQUE`(`title_product`),
    INDEX `fk_product_category_idx`(`id_category`),
    INDEX `fk_product_nds1_idx`(`id_nds`),
    INDEX `fk_product_unit1_idx`(`id_unit`),
    PRIMARY KEY (`id_product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id_role` INTEGER NOT NULL AUTO_INCREMENT,
    `title_role` VARCHAR(150) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `title_role_UNIQUE`(`title_role`),
    PRIMARY KEY (`id_role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shop` (
    `id_shop` INTEGER NOT NULL AUTO_INCREMENT,
    `shop_city` VARCHAR(200) NOT NULL,
    `shop_street` VARCHAR(200) NOT NULL,
    `shop_house` VARCHAR(20) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `phone_UNIQUE`(`phone`),
    UNIQUE INDEX `shop_address_UNIQUE`(`shop_city`, `shop_street`, `shop_house`),
    PRIMARY KEY (`id_shop`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id_status` INTEGER NOT NULL AUTO_INCREMENT,
    `title_status` VARCHAR(300) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `title_status_UNIQUE`(`title_status`),
    PRIMARY KEY (`id_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier` (
    `id_supplier` INTEGER NOT NULL AUTO_INCREMENT,
    `title_supplier` VARCHAR(300) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `title_supplier_UNIQUE`(`title_supplier`),
    PRIMARY KEY (`id_supplier`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unit` (
    `id_unit` INTEGER NOT NULL AUTO_INCREMENT,
    `title_unit_short` VARCHAR(10) NOT NULL,
    `title_unit_full` VARCHAR(150) NOT NULL,
    `is_deleted` TINYINT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `title_unit_short_UNIQUE`(`title_unit_short`),
    UNIQUE INDEX `title_unit_full_UNIQUE`(`title_unit_full`),
    PRIMARY KEY (`id_unit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(20) NULL,
    `email` VARCHAR(350) NULL,
    `password` VARCHAR(300) NOT NULL,
    `date_birth` DATE NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `is_deleted` TINYINT NOT NULL DEFAULT 0,
    `id_role` INTEGER NOT NULL,
    `is_banned` BOOLEAN NULL DEFAULT false,
    `banned_at` DATETIME(0) NULL,
    `ban_reason` VARCHAR(255) NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `phone_UNIQUE`(`phone`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_user_role1_idx`(`id_role`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_address` (
    `id_user_address` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(200) NOT NULL,
    `street` VARCHAR(200) NOT NULL,
    `house` VARCHAR(20) NOT NULL,
    `apartment` VARCHAR(20) NULL,
    `id_user` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_user_address_user1_idx`(`id_user`),
    PRIMARY KEY (`id_user_address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_card` (
    `id_user_card` INTEGER NOT NULL AUTO_INCREMENT,
    `card_number` TEXT NULL,
    `expire_date` VARCHAR(10) NULL,
    `id_user` INTEGER NULL,
    `is_deleted` BOOLEAN NULL DEFAULT false,
    `deleted_at` DATETIME(0) NULL,
    `card_last4` VARCHAR(4) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_user_card`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `fk_carts_user` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cart_item` ADD CONSTRAINT `fk_cart_items_cart` FOREIGN KEY (`id_cart`) REFERENCES `cart`(`id_cart`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cart_item` ADD CONSTRAINT `fk_cart_items_product` FOREIGN KEY (`id_product`) REFERENCES `product`(`id_product`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `custom_order` ADD CONSTRAINT `fk_order_delivery_method1` FOREIGN KEY (`id_delivery_method`) REFERENCES `delivery_method`(`id_delivery_method`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `custom_order` ADD CONSTRAINT `fk_order_payment_method1` FOREIGN KEY (`id_payment_method`) REFERENCES `payment_method`(`id_payment_method`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `custom_order` ADD CONSTRAINT `fk_order_shop1` FOREIGN KEY (`id_shop`) REFERENCES `shop`(`id_shop`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `custom_order` ADD CONSTRAINT `fk_order_status1` FOREIGN KEY (`id_status`) REFERENCES `status`(`id_status`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `custom_order` ADD CONSTRAINT `fk_order_user1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `custom_order` ADD CONSTRAINT `fk_order_user_card` FOREIGN KEY (`id_user_card`) REFERENCES `user_card`(`id_user_card`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `fk_invoice_invoice_type1` FOREIGN KEY (`id_invoice_type`) REFERENCES `invoice_type`(`id_invoice_type`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `fk_invoice_order1` FOREIGN KEY (`id_custom_order`) REFERENCES `custom_order`(`id_custom_order`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `fk_invoice_shop1` FOREIGN KEY (`id_shop`) REFERENCES `shop`(`id_shop`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `fk_invoice_supplier1` FOREIGN KEY (`id_supplier`) REFERENCES `supplier`(`id_supplier`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invoice_item` ADD CONSTRAINT `fk_invoice_item_invoice1` FOREIGN KEY (`id_invoice`) REFERENCES `invoice`(`id_invoice`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invoice_item` ADD CONSTRAINT `fk_invoice_item_product1` FOREIGN KEY (`id_product`) REFERENCES `product`(`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `fk_order_item_order1` FOREIGN KEY (`id_custom_order`) REFERENCES `custom_order`(`id_custom_order`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `fk_order_item_product1` FOREIGN KEY (`id_product`) REFERENCES `product`(`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `fk_product_category` FOREIGN KEY (`id_category`) REFERENCES `category`(`id_category`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `fk_product_nds1` FOREIGN KEY (`id_nds`) REFERENCES `nds`(`id_nds`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `fk_product_unit1` FOREIGN KEY (`id_unit`) REFERENCES `unit`(`id_unit`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_role1` FOREIGN KEY (`id_role`) REFERENCES `role`(`id_role`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_address` ADD CONSTRAINT `fk_user_address_user1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_card` ADD CONSTRAINT `user_card_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

