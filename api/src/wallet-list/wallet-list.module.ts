import { Module } from '@nestjs/common';
import { WalletListController } from './wallet-list.controller';
import { WalletListService } from './wallet-list.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletListSchemaKey, WalletListSchema } from './wallet-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WalletListSchemaKey, schema: WalletListSchema },
    ]),
    AuthModule,
  ],
  controllers: [WalletListController],
  providers: [WalletListService],
})
export class WalletListModule {}
