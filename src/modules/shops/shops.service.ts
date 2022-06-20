import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';

import { CommonMessage } from 'src/common/constants/messages.constants';
import { CreateShopDto } from './dto/create-shop.dto';
import { ShopsRepository } from './shops.repository';
import { genCode } from 'src/helpers';
import { SuccessResponse } from 'src/common/dto/response.dto';
import { ShopsResponseDto, ShopResponseDto, EditShopDto } from './dto/shops-response.dto';
@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopsRepository)
    private readonly shopsRepository: ShopsRepository,
  ) {}

  async create(
    { domain, callback }: CreateShopDto,
    email: string,
  ): Promise<SuccessResponse> {
    try {
      const shop = await this.shopsRepository.findOne(null, {
        where: {
          domain,
          callback,
        },
      });
      if (shop) {
        throw new ConflictException(`Shop ${CommonMessage.ALREADY_EXIST}`);
      }

      const secret = genCode(20);
      const hash = crypto
        .createHmac('sha256', secret)
        .update(secret)
        .digest('hex');

      const newShop = this.shopsRepository.create();
      newShop.domain = domain;
      newShop.callback = callback;
      newShop.secret = secret;
      newShop.key = hash;
      newShop.email = email;
      await newShop.save();

      return {
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async get(): Promise<ShopsResponseDto> {
    try {
      const shops = await this.shopsRepository.find();
      return {
        shops,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getById(id: string): Promise<ShopResponseDto> {
    const shop = await this.shopsRepository.findOne(id);

    if(!shop) {
      throw new NotFoundException(CommonMessage.NOT_FOUND_BY_ID);
    }

    return shop;
  }

  async update(id: string, shop: EditShopDto): Promise<ShopResponseDto> {
    const { callback, domain, active } = shop;

    const existShop = await this.shopsRepository.findOne(id);
    if (!existShop) {
      throw new NotFoundException(CommonMessage.NOT_FOUND_BY_ID);
    }

    existShop.domain = domain;
    existShop.callback = callback;
    existShop.active = active;
    await existShop.save();

    return existShop;
  }

  async delete(id: string): Promise<SuccessResponse> {
    const existShop = await this.shopsRepository.findOne(id);
    if (!existShop) {
      throw new NotFoundException(CommonMessage.NOT_FOUND_BY_ID);
    }

    await this.shopsRepository.delete(id);

    return {
      success: true,
    };
  }
}
