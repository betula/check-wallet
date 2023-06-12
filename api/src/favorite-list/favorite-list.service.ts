import { Injectable } from '@nestjs/common';
import { WalletBalanceService } from './wallet-balance.service';
import { EthToWei } from './wallet-const';

export interface FavoriteRecord {
  address: string;
  eth: string;
  old: boolean;
}

@Injectable()
export class FavoriteListService {
  constructor(private readonly walletBalanceService: WalletBalanceService) {}

  async getFavoriteList(addresses: string[]): Promise<FavoriteRecord[]> {
    const records = await this.walletBalanceService.getWalletBalance(addresses);

    return records.map((record) => {
      return {
        address: record.account,
        eth: String((parseInt(record.balance) || 0) / EthToWei),
        old: Math.random() > 0.5,
      };
    });
  }
}
