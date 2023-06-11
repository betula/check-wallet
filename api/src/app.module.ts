import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { WalletListController } from './wallet-list.controller';
import { RateController } from './rate.controller';
import { CurrencyListController } from './currency-list.controller';
import { FavoriteListController } from './favorite-list.controller';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    AppController,
    WalletListController,
    RateController,
    CurrencyListController,
    FavoriteListController,
  ],
  providers: [AppService],
})
export class AppModule {}
