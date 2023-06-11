import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrencyListService } from './currency-list.service';

@Controller('currency-list')
export class CurrencyListController {
  constructor(private readonly currencyListService: CurrencyListService) {}

  @Post('get')
  @UseGuards(AuthGuard)
  async getList() {
    return this.currencyListService.getCurrencyList();
  }
}
