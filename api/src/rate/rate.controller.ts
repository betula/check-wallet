import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RateSaveDto } from './rate-save.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/auth/auth-payload.decorator';
import { AuthPayloadType } from 'src/auth/auth-payload-type';
import { RateService } from './rate.service';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post('get')
  @UseGuards(AuthGuard)
  async getList() {
    return this.rateService.getRate();
  }

  @Post('save')
  @UseGuards(AuthGuard)
  async saveList(
    @Body() rateSaveDto: RateSaveDto,
    @AuthPayload() authPaload: AuthPayloadType,
  ) {
    await this.rateService.saveRate(rateSaveDto, authPaload.userId);
    return {};
  }
}
