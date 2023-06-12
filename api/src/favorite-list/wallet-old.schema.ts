import { Schema } from 'mongoose';

export const WalletOldSchemaKey = 'wallet_old';

export interface WalletOldRecord {
  address: string;
  firstTxMs: string;
}

export const WalletOldSchema = new Schema({
  address: { type: String, index: { unique: true, dropDups: true } },
  firstTxMs: String,
});
