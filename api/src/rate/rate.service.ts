import { Injectable } from '@nestjs/common';
import { RateDataRecord, RateRecord, RateSchemaKey } from './rate.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RateService {
  constructor(
    @InjectModel(RateSchemaKey)
    private rateModel: Model<RateRecord>,
  ) {}

  async getRate(userId: string): Promise<RateDataRecord> {
    const doc = await this.rateModel.findOne({ userId }).exec();
    if (doc) {
      return doc.data;
    }
    return {
      selectedName: 'USD',
      ethCostManual: '1.0',
    };
  }

  async saveRate(data: RateDataRecord, userId: string) {
    await this.rateModel.updateOne({ userId }, { data }, { upsert: true });
  }
}
