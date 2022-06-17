import { EntityRepository, Repository } from 'typeorm';
import { Shop } from './shops.entity';

@EntityRepository(Shop)
export class ShopsRepository extends Repository<Shop> {
    
}
