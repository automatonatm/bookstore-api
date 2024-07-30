import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { ordersProvider } from './orders.provider';
import { BookModule } from '../books/book.module';
import { booksProviders } from '../books/books.providers';
import { OrdersController } from './orders.controller';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [CartModule, BookModule],
  providers: [...ordersProvider, ...booksProviders, OrderService],
  controllers: [OrdersController],
})
export class OrderModule {}
