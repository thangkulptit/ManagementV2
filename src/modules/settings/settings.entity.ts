import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    BaseEntity,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  
  @Entity({ name: 'settings' })
  export class Setting extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    setting_no: string;
  
    @ApiProperty({ example: 'example@gmail.com', description: 'Type of setting' })
    @Column({ name: 'type', nullable: false})
    type: string;
  
    @ApiProperty({ example: '1', description: 'Value of type' })
    @Column({ name: 'value', nullable: false })
    value: string;

    @ApiProperty({ example: 'ThirdParty', description: 'Description of setting' })
    @Column({ name: 'description', nullable: true })
    description: string;

    @ApiProperty({ example: '1', description: 'Other value' })
    @Column({ name: 'other', nullable: true })
    other: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  