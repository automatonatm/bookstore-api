import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from '@app/core/types';

@Table({
  tableName: 'orders',
  timestamps: true,
})
export class Order extends Model<Order> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId: number;

  @BelongsTo(() => User)
  customer: User;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @Column({
    type: DataType.ENUM,
    values: Object.values(OrderStatus),
  })
  status: OrderStatus;
}
