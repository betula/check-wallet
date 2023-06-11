import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FavoriteListGetDto } from './favotite-list-get.dto';

@Controller('favorite-list')
export class FavoriteListController {
  constructor(private readonly appService: AppService) {}

  @Post('get')
  getList(@Body() favoriteListGetDto: FavoriteListGetDto) {
    return favoriteListGetDto.addresses.map((address: string) => {
      return {
        address,
        eth: String(Math.round(Math.random() * 1000) / 100),
        old: Math.random() > 0.5,
      };
    });
  }
}
