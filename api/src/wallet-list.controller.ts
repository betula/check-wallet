import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { WalletListSaveDto } from './wallet-list-save.dto';

@Controller('wallet-list')
export class WalletListController {
  constructor(private readonly appService: AppService) {}

  @Post('get')
  getList() {
    return [
      { address: '0x123', favorite: true },
      { address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae', favorite: true },
    ];
  }

  @Post('save')
  saveList(@Body() walletListSaveDto: WalletListSaveDto) {
    console.log('wallet-list/save', walletListSaveDto.wallets);
    return {};
  }
}
