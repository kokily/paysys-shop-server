import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Bill from './Bill';
import Cart from './Cart';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  username!: string;

  @Column('text')
  password!: string;

  @Column('boolean')
  admin!: boolean;

  @Column('timestamptz')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  // Relations
  @OneToMany((type) => Cart, (cart) => cart.user_id)
  carts!: [Cart];

  @OneToMany((type) => Bill, (bill) => bill.user_id)
  bills!: [Bill];
}

export default User;
