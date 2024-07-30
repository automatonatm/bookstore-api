import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
