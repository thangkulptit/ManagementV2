import { EntityRepository, Repository } from 'typeorm';
import { Setting } from './settings.entity';

@EntityRepository(Setting)
export class SettingsRepository extends Repository<Setting> {}
