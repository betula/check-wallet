import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FavoriteListGetDto } from './favorite-list-get.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FavoriteListService } from './favorite-list.service';

@Controller('favorite-list')
export class FavoriteListController {
  constructor(private readonly favoriteListService: FavoriteListService) {}

  @Post('get')
  @UseGuards(AuthGuard)
  async getList(@Body() favoriteListGetDto: FavoriteListGetDto) {
    return this.favoriteListService.getFavoriteList(
      favoriteListGetDto.addresses,
    );
  }
}
