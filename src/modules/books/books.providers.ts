import { Book } from './books.entity';
import { BOOK_REPOSITORY } from '@app/core/constants';

export const booksProviders = [
  {
    provide: BOOK_REPOSITORY,
    useValue: Book,
  },
];
