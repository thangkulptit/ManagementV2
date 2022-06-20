import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'cards' })
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'VIETTEL', description: 'Loại thẻ cào' })
  @Column({ name: 'type', nullable: false})
  type: string;

  @ApiProperty({ example: 50000, description: 'Mệnh giá của card' })
  @Column({ name: 'amount', nullable: false })
  amount: number;

  @ApiProperty({ example: 40000, description: 'Giá trị card thực nhận được' })
  @Column({ name: 'real_amount', nullable: false })
  realAmount: string;

  @ApiProperty({ example: '009283928392392', description: 'Số seri của card' })
  @Column({ name: 'seri', nullable: false })
  seri: string;

  @ApiProperty({ example: '009283928392392', description: 'Số pin dưới lớp cào' })
  @Column({ name: 'pin', nullable: false })
  pin: string;

  @ApiProperty({ example: 0, description: 'Trạng thái nạp card' })
  @Column({ name: 'status', nullable: false, default: 0 })
  status: number;

  @ApiProperty({ example: 0, description: 'Trạng thái bên thứ 3 trả về cho mình' })
  @Column({ name: 'status_3rd', nullable: true })
  status3rd: number;

  @ApiProperty({ example: 0, description: 'Trạng thái có cần phải sử dụng tới Cronjob để nạp lại hay không' })
  @Column({ name: 'is_cronjob', default: false })
  isCronjob: boolean;

  @ApiProperty({ example: 0, description: 'Mã đơn hàng được gửi lên Shop' })
  @Column({ name: 'order_by_id', default: false, nullable: true })
  orderById: string;

  @ApiProperty({ example: 0, description: 'Shop gửi lên card này' })
  @Column({ name: 'shop_id', default: false, nullable: true })
  shopId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
