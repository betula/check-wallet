import { Schema } from 'mongoose';

export const RateSchemaKey = 'rate';

export interface RateDataRecord {
  selectedName: string;
  ethCostManual: string;
}

export interface RateRecord {
  userId: string;
  data: RateDataRecord;
}

export const RateSchema = new Schema({
  userId: { type: String, index: { unique: true, dropDups: true } },
  data: {
    selectedName: String,
    ethCostManual: String,
  },
});
