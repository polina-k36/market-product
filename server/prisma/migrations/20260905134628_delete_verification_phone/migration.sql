/*
  Warnings:

  - You are about to drop the column `phone_verified` on the `user` table. All the data in the column will be lost.
  - The values [PHONE] on the enum `verification_type` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `method` to the `verification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `phone_verified`;

-- AlterTable
ALTER TABLE `verification` ADD COLUMN `method` ENUM('CODE', 'LINK') NOT NULL,
    MODIFY `type` ENUM('EMAIL') NOT NULL;
