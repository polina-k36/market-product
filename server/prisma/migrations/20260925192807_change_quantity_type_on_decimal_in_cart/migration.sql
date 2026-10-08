/*
  Warnings:

  - You are about to alter the column `quantity` on the `cart_item` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,3)`.

*/
-- AlterTable
ALTER TABLE `cart_item` MODIFY `quantity` DECIMAL(10, 3) NOT NULL;
