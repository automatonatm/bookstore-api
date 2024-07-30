import { BookGenre } from '@app/core/types';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'books',
})
export class Book extends Model<Book> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(BookGenre),
    allowNull: false,
  })
  genre: BookGenre;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stock: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  version: number; // For optimistic locking
}
