import { Injectable } from '@nestjs/common';
import { WalletBalanceService } from './wallet-balance.service';
import { EthToWei } from './wallet-const';
import { WalletOldService } from './wallet-old.service';

export interface FavoriteRecord {
  address: string;
  eth: string;
  old: boolean;
}

@Injectable()
export class FavoriteListService {
  constructor(
    private readonly walletBalanceService: WalletBalanceService,
    private readonly walletOldService: WalletOldService,
  ) {}

  async getFavoriteList(addresses: string[]): Promise<FavoriteRecord[]> {
    const [records, isOldList] = await Promise.all([
      this.walletBalanceService.getWalletBalance(addresses),
      this.walletOldService.isWalletsOld(addresses),
    ]);

    const isOldMap = new Map(
      isOldList.map(({ address, isOld }) => [address, isOld]),
    );

    return records.map((record) => {
      return {
        address: record.account,
        eth: String((parseInt(record.balance) || 0) / EthToWei),
        old: isOldMap.get(record.account) || false,
      };
    });
  }
}
