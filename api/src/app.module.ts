import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CurrencyListModule } from './currency-list/currency-list.module';
import { FavoriteListModule } from './favorite-list/favotite-list.module';
import { RateModule } from './rate/rate.module';
import { WalletListModule } from './wallet-list/wallet-list.module';
import { EnvConfigModule } from './env-config/env-config.module';
import { EnvConfigService } from './env-config/env-config.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: (envConfigService: EnvConfigService) => ({
        uri: envConfigService.get('MONGODB_URI'),
      }),
    }),
    CurrencyListModule,
    FavoriteListModule,
    RateModule,
    WalletListModule,
    EnvConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
