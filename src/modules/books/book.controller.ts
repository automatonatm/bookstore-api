import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookFilterDto } from './dto/Bookfilter.dto';
import { Book } from './books.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Books Manager')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('/')
  @ApiOkResponse({
    type: [Book],
    description: 'Get all books.',
  })
  public async getBooks(@Query() query: BookFilterDto): Promise<Book[]> {
    return this.booksService.getBooks(query);
  }

  @Get('/:bookId')
  @ApiOkResponse({
    type: Book,
    description: 'Get book by id.',
  })
  public async getBook(
    @Param('bookId', ParseIntPipe) bookId: number,
  ): Promise<Book> {
    return this.booksService.getBook(bookId);
  }
}
