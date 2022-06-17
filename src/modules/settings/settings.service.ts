import {
    Injectable,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
import { SettingsResponseDto } from './dto/setting-response.dto';
import { Description, SettingTypes, ThirdParty } from './settings.constants';
  import { SettingsRepository } from './settings.repository';

  @Injectable()
  export class SettingsService {
    constructor(
      @InjectRepository(SettingsRepository)
      private readonly settingsRepository: SettingsRepository,
    ) {}
  
    /**
     * Get all settings.
     */
    async get(): Promise<SettingsResponseDto> {
      const settings = await this.settingsRepository.find();
      return { settings };
    }

    async createDefaults(): Promise<void> {
        const setting = await this.settingsRepository.findOne(null, {
            where: {
                type: SettingTypes.ThirdParty
            }
        })
        
        if (setting) {
            return;
        }

        const settings = this.settingsRepository.create();
        settings.type = SettingTypes.ThirdParty;
        settings.value = ThirdParty.THE_SIEU_RE;
        settings.description = Description.ThirdParty;
        await settings.save();
    }
  }
  