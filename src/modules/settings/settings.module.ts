import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsRepository } from './settings.repository';
import { SettingsController } from './settings.controller';
@Module({
  imports: [TypeOrmModule.forFeature([SettingsRepository])],
  providers: [SettingsService],
  exports: [SettingsService],
  controllers: [SettingsController],
})
export class SettingsModule {}
