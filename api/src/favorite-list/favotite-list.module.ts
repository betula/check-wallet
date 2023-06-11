import { Module } from '@nestjs/common';
import { FavoriteListController } from './favorite-list.controller';
import { AuthModule } from 'src/auth/auth.module';
import { FavoriteListService } from './favorite-list.service';

@Module({
  imports: [AuthModule],
  controllers: [FavoriteListController],
  providers: [FavoriteListService],
})
export class FavoriteListModule {}
