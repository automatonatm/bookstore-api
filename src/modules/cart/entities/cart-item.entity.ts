import { Book } from '@app/modules/books/books.entity';
import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Cart } from './cart.entity';

@Table({
  tableName: 'cart_items',
  timestamps: true,
})
export class CartItem extends Model<CartItem> {
  @ForeignKey(() => Book)
  @Column
  bookId: number;

  @BelongsTo(() => Book)
  book: Book;

  @ForeignKey(() => Cart)
  @Column
  cartId: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @Column
  quantity: number;
}
