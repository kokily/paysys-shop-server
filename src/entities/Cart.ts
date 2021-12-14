import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import Bill from './Bill';
import User from './User';

export interface InputItem {
  id: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
  count: number;
  amount: number;
}

@Entity()
class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('jsonb')
  items!: [InputItem];

  @Column({ type: 'boolean', default: false })
  completed!: boolean;

  @Column({ type: 'boolean', default: false })
  deleted!: boolean;

  @Column('timestamptz')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  // Relations
  @Column({ nullable: true })
  user_id!: string;

  @ManyToOne((type) => User, (user) => user.carts)
  user!: User;

  @Column({ nullable: true })
  bill_id!: string;

  @OneToOne((type) => Bill, (bill) => bill.cart_id)
  bill!: Bill;
}

export default Cart;
