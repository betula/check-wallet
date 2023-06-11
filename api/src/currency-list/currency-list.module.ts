import { Module } from '@nestjs/common';
import { CurrencyListController } from './currency-list.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CurrencyListService } from './currency-list.service';

@Module({
  imports: [AuthModule],
  controllers: [CurrencyListController],
  providers: [CurrencyListService],
})
export class CurrencyListModule {}
