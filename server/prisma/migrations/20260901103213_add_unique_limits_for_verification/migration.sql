/*
  Warnings:

  - A unique constraint covering the columns `[id_user,type]` on the table `verification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `verification_id_user_type_key` ON `verification`(`id_user`, `type`);
