import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Wedding from './Wedding';

@Entity()
class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // 웨딩업체
  @Column()
  company_husband!: number;

  @Column()
  company_bride!: number;

  // 야간 옥상전구
  @Column()
  rooftop_husband!: number;

  @Column()
  rooftop_bride!: number;

  // 혼주메이크업 (여)
  @Column()
  owner_woman_husband!: number;

  @Column()
  owner_woman_bride!: number;

  // 혼주메이크업 (남)
  @Column()
  owner_man_husband!: number;

  @Column()
  owner_man_bride!: number;

  // 셀렉
  @Column()
  select_husband!: number;

  @Column()
  select_bride!: number;

  // 액자
  @Column()
  frame_husband!: number;

  @Column()
  frame_bride!: number;

  // 드레스
  @Column()
  dress_husband!: number;

  @Column()
  dress_bride!: number;

  // 헤어피스
  @Column()
  hairpin_husband!: number;

  @Column()
  hairpin_bride!: number;

  // 가발
  @Column()
  wig_husband!: number;

  @Column()
  wig_bride!: number;

  // 비디오 촬영
  @Column()
  video_husband!: number;

  @Column()
  video_bride!: number;

  // 기타사항
  @Column()
  etc_husband!: number;

  @Column()
  etc_bride!: number;

  // Relations
  @Column({ nullable: true })
  weddingId!: string;

  @OneToOne((type) => Wedding, (wedding) => wedding.companyId)
  wedding!: Wedding;
}

export default Company;
