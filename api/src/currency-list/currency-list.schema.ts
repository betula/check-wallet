import { Schema } from 'mongoose';

export const CurrencyListSchemaKey = 'currency_list';

export interface CurrencyListRecord {
  name: string;
  ethCost: string;
}

export const CurrencyListSchema = new Schema({
  name: { type: String, index: { unique: true, dropDups: true } },
  ethCost: String,
});
