-- CreateTable
CREATE TABLE `MovieInfo` (
    `movieId` INTEGER NOT NULL AUTO_INCREMENT,
    `movieName` VARCHAR(191) NOT NULL,
    `screeningTime` INTEGER NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `overview` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NULL,

    PRIMARY KEY (`movieId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
