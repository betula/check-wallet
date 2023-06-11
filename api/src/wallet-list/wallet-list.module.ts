import { Module } from '@nestjs/common';
import { WalletListController } from './wallet-list.controller';
import { WalletListService } from './wallet-list.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [WalletListController],
  providers: [WalletListService],
})
export class WalletListModule {}
