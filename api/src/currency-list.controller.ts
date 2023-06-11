import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('currency-list')
export class CurrencyListController {
  constructor(private readonly appService: AppService) {}

  @Post('get')
  getList() {
    return [
      { name: 'USD', ethCost: '1.2' },
      { name: 'EUR', ethCost: '17000' },
    ];
  }
}
