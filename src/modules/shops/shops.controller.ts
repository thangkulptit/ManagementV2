import {
  Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    ValidationPipe,
    Request,
    Param,
    Put,
    Delete
  } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiParam } from '@nestjs/swagger';

import { ErrorResponse, SuccessResponse } from 'src/common/dto/response.dto';
import { CommonDescription } from 'src/common/constants/descriptions.constants';
import { ShopsService } from "./shops.service";
import { AuthGuard } from '@nestjs/passport';
import { ShopDescriptions, ShopSummary } from './shops.constants';
import { CreateShopDto } from './dto/create-shop.dto';
import { ShopsResponseDto, ShopResponseDto, EditShopDto } from './dto/shops-response.dto';

@ApiTags('Shops')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopService: ShopsService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: ShopSummary.GET_ALL })
  @ApiOkResponse({
    description: CommonDescription.GET_ITEM_SUCCESS,
    type: ShopsResponseDto,
  })
  @ApiBadRequestResponse({
    description: CommonDescription.BAD_REQUEST,
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: CommonDescription.UNAUTHORIZED,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  async get(): Promise<ShopsResponseDto> {
    return this.shopService.get();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: ShopSummary.GET_BY_ID })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({
    description: CommonDescription.GET_ITEM_SUCCESS,
    type: ShopResponseDto,
  })
  @ApiBadRequestResponse({
    description: CommonDescription.BAD_REQUEST,
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: CommonDescription.UNAUTHORIZED,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  async getById(@Param('id') id: string): Promise<ShopResponseDto> {
    return this.shopService.getById(id);
  }

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
    return this.shopService.create(createShopDto, req.user);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: ShopSummary.UPDATE_BY_ID })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: EditShopDto })
  @ApiOkResponse({
    description: CommonDescription.UPDATE_ITEM_SUCESS,
    type: ShopResponseDto,
  })
  @ApiBadRequestResponse({
    description: CommonDescription.BAD_REQUEST,
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: CommonDescription.UNAUTHORIZED,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() editShopDto: EditShopDto,
  ): Promise<ShopResponseDto> {
    return this.shopService.update(id, editShopDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: ShopSummary.DELETE_BY_ID })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({
    description: CommonDescription.DELETE_ITEM_SUCCESS,
    type: ShopResponseDto,
  })
  @ApiBadRequestResponse({
    description: CommonDescription.BAD_REQUEST,
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: CommonDescription.UNAUTHORIZED,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  async delete(
    @Param('id') id: string,
  ): Promise<SuccessResponse> {
    return this.shopService.delete(id);
  }
}

