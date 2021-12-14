import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import Company from './Company';
import Convention from './Convention';
import Event from './Event';
import Hanbok from './Hanbok';
import Meal from './Meal';
import Present from './Present';
import Reserve from './Reserve';
import Prepayment from './Prepayment';

@Entity()
class Wedding extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  husband_name!: string;

  @Column({ type: 'text', nullable: true })
  husband_image!: string;

  @Column('text')
  bride_name!: string;

  @Column({ type: 'text', nullable: true })
  bride_image!: string;

  @Column('text')
  wedding_at!: string;

  @Column('text')
  event_at!: string;

  @Column()
  cost_husband!: number;

  @Column()
  cost_bride!: number;

  @Column()
  meal_husband!: number;

  @Column()
  meal_bride!: number;

  @Column()
  present_husband!: number;

  @Column()
  present_bride!: number;

  @Column()
  reserve_husband!: number;

  @Column()
  reserve_bride!: number;

  @Column('timestamptz')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  // relations
  @Column({ nullable: true })
  conventionId!: string;

  @OneToOne((type) => Convention, (convention) => convention.weddingId)
  convention!: Convention;

  @Column({ nullable: true })
  companyId!: string;

  @OneToOne((type) => Company, (company) => company.weddingId)
  company!: Company;

  @Column({ nullable: true })
  hanbokId!: string;

  @OneToOne((type) => Hanbok, (hanbok) => hanbok.weddingId)
  hanbok!: Hanbok;

  @Column({ nullable: true })
  eventId!: string;

  @OneToOne((type) => Event, (event) => event.weddingId)
  event!: Event;

  @Column({ nullable: true })
  mealId!: string;

  @OneToOne((type) => Meal, (meal) => meal.weddingId)
  meal!: Meal;

  @Column({ nullable: true })
  presentId!: string;

  @OneToOne((type) => Present, (present) => present.weddingId)
  present!: Present;

  @Column({ nullable: true })
  reserveId!: string;

  @OneToOne((type) => Reserve, (reserve) => reserve.weddingId)
  reserve!: Reserve;

  @Column({ nullable: true })
  prepaymentId!: string;

  @OneToOne((type) => Prepayment, (prepayment) => prepayment.weddingId)
  prepayment!: Prepayment;
}

export default Wedding;
