import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopsRepository } from './shops.repository';
import { ShopsController } from './shops.controller';
@Module({
  imports: [TypeOrmModule.forFeature([ShopsRepository])],
  providers: [ShopsService],
  exports: [ShopsService],
  controllers: [ShopsController],
})
export class ShopsModule {}
