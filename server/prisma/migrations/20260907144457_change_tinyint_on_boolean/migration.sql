-- AlterTable
ALTER TABLE `category` MODIFY `is_deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `product` MODIFY `is_deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` MODIFY `is_deleted` BOOLEAN NOT NULL DEFAULT false;
