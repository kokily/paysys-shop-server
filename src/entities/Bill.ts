import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Cart, { InputItem } from './Cart';
import User from './User';

@Entity()
class Bill extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  title!: string;

  @Column('text')
  hall!: string;

  @Column('text')
  etc!: string;

  @Column()
  total_amount!: number;

  @Column('jsonb')
  items!: [InputItem];

  @Column({ nullable: true })
  reserve!: number;

  @Column('timestamptz')
  @CreateDateColumn()
  created_at!: Date;

  // Relations
  @Column({ nullable: true })
  cart_id!: string;

  @OneToOne((type) => Cart, (cart) => cart.bill_id)
  cart!: Cart;

  @Column({ nullable: true })
  user_id!: string;

  @Column({ nullable: true })
  username!: string;

  @ManyToOne((type) => User, (user) => user.bills)
  user!: User;
}

export default Bill;
