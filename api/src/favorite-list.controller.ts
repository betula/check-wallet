import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('favorite-list')
export class FavoriteListController {
  constructor(private readonly appService: AppService) {}

  @Post('get')
  getList(@Body() addresses) {
    return addresses.map((address: string) => {
      return {
        address,
        eth: String(Math.round(Math.random() * 1000) / 100),
        old: Math.random() > 0.5,
      };
    });
  }
}
