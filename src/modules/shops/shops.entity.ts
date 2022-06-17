import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    BaseEntity,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  
  @Entity({ name: 'shops' })
  export class Shop extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
    @Column({ name: 'email', nullable: false})
    email: string;
  
    @ApiProperty({ example: 'hsdhsa2t54dsagf2d542d2', description: 'Secret of Shop unique' })
    @Column({ name: 'secret', nullable: false })
    secret: string;

    @ApiProperty({ example: 'hsdhsa2t5', description: 'Key of Shop unique' })
    @Column({ name: 'key', nullable: false })
    key: string;

    @ApiProperty({ example: 'https://shop.com', description: 'Domain of the shop' })
    @Column({ name: 'domain', nullable: false })
    domain: string;

    @ApiProperty({ example: 'https://shop.com/callback', description: 'Callback of the shop to push status card' })
    @Column({ name: 'callback', nullable: false })
    callback: string;
  
    @ApiProperty({ example: true, description: 'Status of shop' })
    @Column({ name: 'active', default: true })
    active: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  