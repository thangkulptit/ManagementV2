import {
  Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    ValidationPipe,
    Request
  } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { ErrorResponse, SuccessResponse } from 'src/common/dto/response.dto';
import { CommonDescription } from 'src/common/constants/descriptions.constants';
import { ShopsService } from "./shops.service";
import { AuthGuard } from '@nestjs/passport';
import { ShopDescriptions, ShopSummary } from './shops.constants';
import { CreateShopDto } from './dto/create-shop.dto';

@ApiTags('Shops')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopService: ShopsService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: ShopSummary.CREATE })
  @ApiBody({ type: CreateShopDto })
  @ApiCreatedResponse({
    description: ShopDescriptions.CREATED_SUCCESS,
  })
  @ApiConflictResponse({
    description: ShopDescriptions.SHOP_EXISTED,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  async create(
    @Body(ValidationPipe) createShopDto: CreateShopDto,
    @Request() req
  ): Promise<SuccessResponse> {
    return this.shopService.create(createShopDto);
  }
}

