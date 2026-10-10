/*
  Warnings:

  - A unique constraint covering the columns `[id_product,id_shop,id_user,id_group]` on the table `stock_reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_group` to the `stock_reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `stock_reservation` DROP FOREIGN KEY `fk_stock_reservation_product1`;

-- DropIndex
DROP INDEX `unique_stock_reservation` ON `stock_reservation`;

-- AlterTable
ALTER TABLE `stock_reservation` ADD COLUMN `id_group` VARCHAR(191) NOT NULL,
    ALTER COLUMN `quantity` DROP DEFAULT;

-- CreateIndex
CREATE INDEX `fk_stock_reservation_user1_idx` ON `stock_reservation`(`id_user`);

-- CreateIndex
CREATE INDEX `stock_reservation_group_idx` ON `stock_reservation`(`id_group`);

-- CreateIndex
CREATE UNIQUE INDEX `unique_stock_reservation` ON `stock_reservation`(`id_product`, `id_shop`, `id_user`, `id_group`);

-- AddForeignKey
ALTER TABLE `stock_reservation` ADD CONSTRAINT `fk_stock_reservation_user1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

