import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';
import { Friends } from 'src/modules/friends/entities/friends.entity';

@Table
export class Users extends Model<Users> {
  toJSON() {
    return {
      ...this.get(),
      password: undefined,
      role: undefined,
    };
  }

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastname: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  age: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['user', 'admin'],
    defaultValue: 'user',
  })
  role: string;

  @HasMany(() => Friends)
  friends: Friends[];
}
