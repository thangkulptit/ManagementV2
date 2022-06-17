import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './modules/settings/settings.module';
import { typeOrmConfig } from './configs/database/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { SettingsService } from './modules/settings/settings.service';
import { ShopsModule } from './modules/shops/shops.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, UsersModule, SettingsModule, ShopsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly settingsService: SettingsService) {
    // Run setting default.
    this.settingsService.createDefaults();
  }
}
