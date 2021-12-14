import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import Wedding from './Wedding';

@Entity()
class Reserve extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // 예약금 분할
  @Column('text')
  reserve!: string;

  // 예약금 단가
  @Column()
  reserve_pay!: number;

  // Relations
  @Column({ nullable: true })
  weddingId!: string;

  @OneToOne((type) => Wedding, (wedding) => wedding.reserveId)
  wedding!: Wedding;
}

export default Reserve;
