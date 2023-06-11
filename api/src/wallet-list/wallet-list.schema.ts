import { Schema } from 'mongoose';

export const WalletListSchemaKey = 'wallet_list';

export interface WalletRecord {
  address: string;
  favorite: boolean;
}

export interface WalletListRecord {
  userId: string;
  wallets: WalletRecord[];
}

export const WalletListSchema = new Schema({
  userId: { type: String, index: { unique: true, dropDups: true } },
  wallets: [
    {
      address: String,
      favorite: Boolean,
    },
  ],
});
