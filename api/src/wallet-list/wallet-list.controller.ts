import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WalletListSaveDto } from './wallet-list-save.dto';
import { WalletListService } from './wallet-list.service';
import { AuthPayloadType } from 'src/auth/auth-payload-type';
import { AuthPayload } from 'src/auth/auth-payload.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('wallet-list')
export class WalletListController {
  constructor(private readonly walletListService: WalletListService) {}

  @Post('get')
  @UseGuards(AuthGuard)
  async getList() {
    return this.walletListService.getWallets();
  }

  @Post('save')
  @UseGuards(AuthGuard)
  async saveList(
    @Body() walletListSaveDto: WalletListSaveDto,
    @AuthPayload() authPayload: AuthPayloadType,
  ) {
    await this.walletListService.saveWallets(
      walletListSaveDto.wallets,
      authPayload.userId,
    );
    return {};
  }
}
