import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import Wedding from './Wedding';

@Entity()
class Prepayment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // 선입금 신랑
  @Column()
  prepayment_husband!: number;

  // 선입금 신부
  @Column()
  prepayment_bride!: number;

  // Relations
  @Column({ nullable: true })
  weddingId!: string;

  @OneToOne((type) => Wedding, (wedding) => wedding.prepaymentId)
  wedding!: Wedding;
}

export default Prepayment;
