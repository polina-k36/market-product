-- CreateTable
CREATE TABLE `user_identity` (
    `id_user_identity` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `provider` ENUM('GOOGLE') NOT NULL,
    `provider_account_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_identity_provider_provider_account_id_key`(`provider`, `provider_account_id`),
    UNIQUE INDEX `user_identity_id_user_provider_provider_account_id_key`(`id_user`, `provider`, `provider_account_id`),
    PRIMARY KEY (`id_user_identity`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_identity` ADD CONSTRAINT `fk_user_identity_user1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;
