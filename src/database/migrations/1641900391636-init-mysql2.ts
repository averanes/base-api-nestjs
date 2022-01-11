import {MigrationInterface, QueryRunner} from "typeorm";

export class initMysql21641900391636 implements MigrationInterface {
    name = 'initMysql21641900391636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_23c05c292c439d77b0de816b50` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `products` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` text NOT NULL, `price` int NOT NULL, `stock` int NOT NULL, `image` varchar(255) NOT NULL, `create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `brand_id` int NULL, INDEX `IDX_75895eeb1903f8a17816dafe0a` (`price`), INDEX `IDX_4fbc36ad745962e5c11001e1a8` (`price`, `stock`), UNIQUE INDEX `IDX_4c9fb58de893725258746385e1` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `brand` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `image` varchar(255) NOT NULL, `createAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_5f468ae5696f07da025138e38f` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` varchar(100) NOT NULL, `createAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `customer_id` int NULL, UNIQUE INDEX `REL_d72eb2a5bbff4f2533a5d4caff` (`customer_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `order_item` (`id` int NOT NULL AUTO_INCREMENT, `createAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `quantity` int NOT NULL, `productId` int NULL, `orderId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `order` (`id` int NOT NULL AUTO_INCREMENT, `createAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `customerId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `customer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `createAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `products_categories` (`product_id` int NOT NULL, `category_id` int NOT NULL, INDEX `IDX_f2c76a4306a82c696d620f81f0` (`product_id`), INDEX `IDX_19fe0fe8c2fcf1cbe1a80f639f` (`category_id`), PRIMARY KEY (`product_id`, `category_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_1530a6f15d3c79d1b70be98f2be` FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_d72eb2a5bbff4f2533a5d4caff9` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_904370c093ceea4369659a3c810` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_646bf9ece6f45dbe41c203e06e0` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_124456e637cca7a415897dce659` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products_categories` ADD CONSTRAINT `FK_f2c76a4306a82c696d620f81f08` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products_categories` ADD CONSTRAINT `FK_19fe0fe8c2fcf1cbe1a80f639f1` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `products_categories` DROP FOREIGN KEY `FK_19fe0fe8c2fcf1cbe1a80f639f1`");
        await queryRunner.query("ALTER TABLE `products_categories` DROP FOREIGN KEY `FK_f2c76a4306a82c696d620f81f08`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_124456e637cca7a415897dce659`");
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_646bf9ece6f45dbe41c203e06e0`");
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_904370c093ceea4369659a3c810`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_d72eb2a5bbff4f2533a5d4caff9`");
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_1530a6f15d3c79d1b70be98f2be`");
        await queryRunner.query("DROP INDEX `IDX_19fe0fe8c2fcf1cbe1a80f639f` ON `products_categories`");
        await queryRunner.query("DROP INDEX `IDX_f2c76a4306a82c696d620f81f0` ON `products_categories`");
        await queryRunner.query("DROP TABLE `products_categories`");
        await queryRunner.query("DROP TABLE `customer`");
        await queryRunner.query("DROP TABLE `order`");
        await queryRunner.query("DROP TABLE `order_item`");
        await queryRunner.query("DROP INDEX `REL_d72eb2a5bbff4f2533a5d4caff` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP INDEX `IDX_5f468ae5696f07da025138e38f` ON `brand`");
        await queryRunner.query("DROP TABLE `brand`");
        await queryRunner.query("DROP INDEX `IDX_4c9fb58de893725258746385e1` ON `products`");
        await queryRunner.query("DROP INDEX `IDX_4fbc36ad745962e5c11001e1a8` ON `products`");
        await queryRunner.query("DROP INDEX `IDX_75895eeb1903f8a17816dafe0a` ON `products`");
        await queryRunner.query("DROP TABLE `products`");
        await queryRunner.query("DROP INDEX `IDX_23c05c292c439d77b0de816b50` ON `category`");
        await queryRunner.query("DROP TABLE `category`");
    }

}
