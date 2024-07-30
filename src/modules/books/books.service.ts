import { BOOK_REPOSITORY } from '@app/core/constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './books.entity';
import { BookFilterDto } from './dto/Bookfilter.dto';
import { Op } from 'sequelize';
import { SortOrder } from '@app/core/types';

@Injectable()
export class BooksService {
  constructor(
    @Inject(BOOK_REPOSITORY) private readonly bookRepository: typeof Book,
  ) {}

  public async getBooks(query: BookFilterDto): Promise<Book[]> {
    const { title, author, genre, offset, limit, sortBy, sortOrder } = query;

    const where: any = {};

    if (title) {
      where.title = { [Op.like]: `%${title}%` };
    }

    if (author) {
      where.author = { [Op.like]: `%${author}%` };
    }

    if (genre) {
      where.genre = genre;
    }

    const order: any[] = [];
    if (query.sortBy) {
      order.push([sortBy, sortOrder || SortOrder.ASC]);
    } else {
      order.push(['createdAt', SortOrder.ASC]);
    }

    return this.bookRepository.findAll({
      where,
      order,
      offset: offset || 0,
      limit: limit || 10,
    });
  }

  public async getBook(id: number): Promise<Book> {
    const book = this.findBookById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  public async findBookById(id: number): Promise<Book> {
    return this.bookRepository.findByPk(id);
  }
}
