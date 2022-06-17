import {
  ConflictException,
    Injectable, InternalServerErrorException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import * as crypto from 'crypto';

import { CommonMessage } from 'src/common/constants/messages.constants';
import { CreateShopDto } from './dto/create-shop.dto';
  import { ShopsRepository } from './shops.repository';
  import { genCode } from 'src/helpers';
import { SuccessResponse } from 'src/common/dto/response.dto';
  

  @Injectable()
  export class ShopsService {
    constructor(
      @InjectRepository(ShopsRepository)
      private readonly shopsRepository: ShopsRepository,
    ) {}
  
    async create({domain, callback}: CreateShopDto): Promise<SuccessResponse> {
      try {
        const shop = await this.shopsRepository.findOne(null, {
          where: {
            domain,
            callback
          }
        })
        if (shop) {
          throw new ConflictException(`Shop ${CommonMessage.ALREADY_EXIST}`);
        }

        const secret = genCode(20);
        const hash = crypto.createHmac('sha256', secret).update(secret).digest('hex');

        const newShop = this.shopsRepository.create();
        newShop.domain = domain;
        newShop.callback = callback;
        newShop.secret = secret;
        newShop.key = hash;
        return {
          success: true
        }

      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
 
  }
  