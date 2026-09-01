/*
  Warnings:

  - You are about to alter the column `delivery_city` on the `custom_order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(255)`.
  - You are about to alter the column `delivery_street` on the `custom_order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(255)`.
  - You are about to alter the column `title_payment_method` on the `payment_method` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(255)`.
  - You are about to alter the column `title_product` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(255)`.
  - You are about to alter the column `title_status` on the `status` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(255)`.
  - You are about to alter the column `title_supplier` on the `supplier` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(255)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(350)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE `cart` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `cart_item` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `category` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `custom_order` MODIFY `delivery_city` VARCHAR(255) NULL,
    MODIFY `delivery_street` VARCHAR(255) NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `delivery_method` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `invoice` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `invoice_type` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `nds` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `payment_method` MODIFY `title_payment_method` VARCHAR(255) NOT NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `product` MODIFY `title_product` VARCHAR(255) NOT NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `role` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `shop` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `status` MODIFY `title_status` VARCHAR(255) NOT NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `supplier` MODIFY `title_supplier` VARCHAR(255) NOT NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `unit` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(255) NULL,
    MODIFY `password` TEXT NOT NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT,
    MODIFY `id_role` INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE `user_address` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user_card` ALTER COLUMN `updated_at` DROP DEFAULT;
