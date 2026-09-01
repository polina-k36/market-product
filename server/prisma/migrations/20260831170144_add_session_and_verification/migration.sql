-- CreateTable
CREATE TABLE `session` (
    `id_session` INTEGER NOT NULL AUTO_INCREMENT,
    `token_hash` TEXT NULL,
    `id_user` INTEGER NOT NULL,
    `expires_at` DATETIME(0) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_session`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification` (
    `id_verification` INTEGER NOT NULL AUTO_INCREMENT,
    `token_hash` TEXT NOT NULL,
    `type` ENUM('EMAIL', 'PHONE') NOT NULL,
    `id_user` INTEGER NOT NULL,
    `expires_at` DATETIME(0) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_verification`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `user_session_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `verification` ADD CONSTRAINT `user_verification_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;
