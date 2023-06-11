import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  WalletListSchemaKey,
  WalletListRecord,
  WalletRecord,
} from './wallet-list.schema';
import { Model } from 'mongoose';

@Injectable()
export class WalletListService {
  constructor(
    @InjectModel(WalletListSchemaKey)
    private walletListModel: Model<WalletListRecord>,
  ) {}

  async getWallets(userId: string): Promise<WalletRecord[]> {
    const doc = await this.walletListModel.findOne({ userId }).exec();
    if (doc) {
      return doc.wallets;
    }
    return [];
  }

  async saveWallets(wallets: WalletRecord[], userId: string) {
    await this.walletListModel.updateOne(
      { userId },
      { wallets },
      { upsert: true },
    );
  }
}
