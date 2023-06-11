import { Module } from '@nestjs/common';
import { CurrencyListController } from './currency-list.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CurrencyListService } from './currency-list.service';
import {
  CurrencyListSchema,
  CurrencyListSchemaKey,
} from './currency-list.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigModule } from 'src/env-config/env-config.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forFeature([
      { name: CurrencyListSchemaKey, schema: CurrencyListSchema },
    ]),
    AuthModule,
    EnvConfigModule,
  ],
  controllers: [CurrencyListController],
  providers: [CurrencyListService],
})
export class CurrencyListModule {}
