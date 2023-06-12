import { Module } from '@nestjs/common';
import { FavoriteListController } from './favorite-list.controller';
import { AuthModule } from 'src/auth/auth.module';
import { FavoriteListService } from './favorite-list.service';
import { WalletBalanceService } from './wallet-balance.service';
import { EnvConfigModule } from 'src/env-config/env-config.module';

@Module({
  imports: [AuthModule, EnvConfigModule],
  controllers: [FavoriteListController],
  providers: [FavoriteListService, WalletBalanceService],
})
export class FavoriteListModule {}
