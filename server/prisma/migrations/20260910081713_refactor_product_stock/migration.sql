/*
  Warnings:

  - Added the required column `updated_at` to the `product_stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product_stock` ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL;
