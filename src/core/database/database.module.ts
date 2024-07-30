import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from '@app/modules/books/books.entity';
import { Order, OrderItem } from '@app/modules/orders/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '@app/modules/users/user.entity';
import { Dialect } from 'sequelize';
import { Cart, CartItem } from '@app/modules/cart/entities';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get<Dialect>('DB_DIALECT'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        models: [Book, User, Order, OrderItem, Cart, CartItem],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
