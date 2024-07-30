import {
  Column,
  Model,
  Table,
  HasMany,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { CartItem } from './cart-item.entity';
import { User } from '@app/modules/users/user.entity';

@Table({
  tableName: 'carts',
  timestamps: true,
})
export class Cart extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId: number;

  @BelongsTo(() => User)
  customer: User;

  @HasMany(() => CartItem)
  items: CartItem[];
}
