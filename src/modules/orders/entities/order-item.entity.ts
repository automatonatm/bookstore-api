import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Book } from '../../books/books.entity';
import { Order } from './order.entity';

@Table({
  tableName: 'order_items',
  timestamps: true,
})
export class OrderItem extends Model<OrderItem> {
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookId: number;

  @BelongsTo(() => Book)
  book: Book;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;
}
