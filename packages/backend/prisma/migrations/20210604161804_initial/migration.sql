-- CreateTable
CREATE TABLE `User` (
    `uid` VARCHAR(255) NOT NULL,
    `displayName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255),
    `role` ENUM('NONE', 'ADMIN') NOT NULL DEFAULT 'NONE',
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `Theme` (
    `uuid` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `isOfficial` BOOLEAN NOT NULL,
    `answerType` ENUM('BOOL_CHOICE', 'SINGLE_CHOICE', 'MULTI_CHOICE') NOT NULL,
    `authorId` VARCHAR(255) NOT NULL,
    `deadline` DATETIME(0) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Theme.title_unique`(`title`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `UserBoolChoiceAnswer` (
    `uuid` VARCHAR(255) NOT NULL,
    `themeId` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `result` BOOLEAN NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `ResultBoolChoice` (
    `uuid` VARCHAR(255) NOT NULL,
    `isOfficial` BOOLEAN NOT NULL,
    `themeId` VARCHAR(255) NOT NULL,
    `result` BOOLEAN NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `ResultBoolChoice_themeId_unique`(`themeId`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `AnswerChoice` (
    `uuid` VARCHAR(255) NOT NULL,
    `themeId` VARCHAR(255) NOT NULL,
    `text` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `UserChoice` (
    `uuid` VARCHAR(255) NOT NULL,
    `themeId` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `UserChoiceAnswer` (
    `uuid` VARCHAR(255) NOT NULL,
    `choiceUserId` VARCHAR(255) NOT NULL,
    `choiceAnsewerId` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `ResultChoice` (
    `uuid` VARCHAR(255) NOT NULL,
    `isOfficial` BOOLEAN NOT NULL,
    `themeId` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `ResultChoice_themeId_unique`(`themeId`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `ResultChoiceAnswer` (
    `uuid` VARCHAR(255) NOT NULL,
    `choiceResultId` VARCHAR(255) NOT NULL,
    `choiceAnsewerId` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- AddForeignKey
ALTER TABLE `UserChoice` ADD FOREIGN KEY (`themeId`) REFERENCES `Theme`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserChoice` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnswerChoice` ADD FOREIGN KEY (`themeId`) REFERENCES `Theme`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResultBoolChoice` ADD FOREIGN KEY (`themeId`) REFERENCES `Theme`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserChoiceAnswer` ADD FOREIGN KEY (`choiceUserId`) REFERENCES `UserChoice`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserChoiceAnswer` ADD FOREIGN KEY (`choiceAnsewerId`) REFERENCES `AnswerChoice`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResultChoiceAnswer` ADD FOREIGN KEY (`choiceResultId`) REFERENCES `ResultChoice`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResultChoiceAnswer` ADD FOREIGN KEY (`choiceAnsewerId`) REFERENCES `AnswerChoice`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Theme` ADD FOREIGN KEY (`authorId`) REFERENCES `User`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBoolChoiceAnswer` ADD FOREIGN KEY (`themeId`) REFERENCES `Theme`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBoolChoiceAnswer` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResultChoice` ADD FOREIGN KEY (`themeId`) REFERENCES `Theme`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
