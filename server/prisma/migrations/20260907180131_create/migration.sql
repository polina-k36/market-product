/*
  Warnings:

  - A unique constraint covering the columns `[title_category]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `title_category_UNIQUE` ON `category`(`title_category`);
