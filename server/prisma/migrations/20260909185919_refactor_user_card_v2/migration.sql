/*
  Warnings:

  - Made the column `card_last4` on table `user_card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expire_month` on table `user_card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expire_year` on table `user_card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user_card` MODIFY `card_last4` VARCHAR(4) NOT NULL,
    MODIFY `expire_month` INTEGER NOT NULL,
    MODIFY `expire_year` INTEGER NOT NULL;
