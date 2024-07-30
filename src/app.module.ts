import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { BookModule } from './modules/books/book.module';
import { OrderModule } from './modules/orders/order.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    UsersModule,
    BookModule,
    OrderModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
