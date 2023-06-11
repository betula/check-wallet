import { Injectable } from '@nestjs/common';

export interface WalletRecord {
  address: string;
  favorite: boolean;
}

@Injectable()
export class WalletListService {
  async getWallets(): Promise<WalletRecord[]> {
    return [
      { address: '0x123', favorite: true },
      { address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae', favorite: true },
    ];
  }

  async saveWallets(wallets: WalletRecord[], userId: string) {
    console.log('save wallets', wallets, userId);
    return;
  }
}
