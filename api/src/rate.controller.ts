import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RateSaveDto } from './rate-save.dto';

@Controller('rate')
export class RateController {
  constructor(private readonly appService: AppService) {}

  @Post('get')
  getList() {
    return {
      selectedName: 'USD',
      ethCostManual: '1.0',
    };
  }

  @Post('save')
  saveList(@Body() rateSaveDto: RateSaveDto) {
    console.log('rate/save', rateSaveDto);
    return {};
  }
}
