import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './book.controller';
import { booksProviders } from './books.providers';

@Module({
  providers: [BooksService, ...booksProviders],
  controllers: [BooksController],
})
export class BookModule {}
