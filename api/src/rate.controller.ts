import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

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
  saveList(@Body() body: any) {
    console.log('rate/save', body);
    return {};
  }
}
