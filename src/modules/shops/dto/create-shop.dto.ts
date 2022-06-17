import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateShopDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      description: 'Domain of the shop',
      example: 'https://shop.com',
    })
    domain: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      description: 'Callback of the shop',
      example: 'https://shop.com/callback',
    })
    callback: string;
}