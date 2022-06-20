import { Shop } from '../shops.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShopsResponseDto {
  shops: Shop[];
}

export class ShopResponseDto extends Shop {};

export class EditShopDto extends Shop{
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Domain of the shop',
    example: 'https://shop2s.com',
  })
  domain: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Callback of the shop',
    example: 'https://shop2s.com/callback',
  })
  callback: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Status of shop',
    example: false,
  })
  active: boolean;
}