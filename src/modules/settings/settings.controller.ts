import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseGuards,
  } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { ErrorResponse } from 'src/common/dto/response.dto';
import { CommonDescription } from 'src/common/constants/descriptions.constants';
import { SettingsResponseDto } from './dto/setting-response.dto';
import { SettingsSummary } from './settings.constants';
import { SettingsService } from "./settings.service";
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Settings')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('settings')
export class SettingsController {
    constructor(private readonly settingService: SettingsService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: SettingsSummary.GET_ALL })
    @ApiOkResponse({
        description: CommonDescription.GET_ITEM_SUCCESS,
        type: SettingsResponseDto,
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
    async get(): Promise<SettingsResponseDto> {
        return this.settingService.get();
    }
}

