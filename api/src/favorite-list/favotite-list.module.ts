import { Module } from '@nestjs/common';
import { FavoriteListController } from './favorite-list.controller';
import { AuthModule } from 'src/auth/auth.module';
import { FavoriteListService } from './favorite-list.service';
import { WalletBalanceService } from './wallet-balance.service';
import { EnvConfigModule } from 'src/env-config/env-config.module';
import { WalletOldService } from './wallet-old.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletOldSchemaKey, WalletOldSchema } from './wallet-old.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WalletOldSchemaKey, schema: WalletOldSchema },
    ]),
    AuthModule,
    EnvConfigModule,
  ],
  controllers: [FavoriteListController],
  providers: [FavoriteListService, WalletBalanceService, WalletOldService],
})
export class FavoriteListModule {}
