import { Injectable } from '@nestjs/common';

export interface RateRecord {
  selectedName: string;
  ethCostManual: string;
}

@Injectable()
export class RateService {
  async getRate(): Promise<RateRecord> {
    return {
      selectedName: 'USD',
      ethCostManual: '1.0',
    };
  }

  async saveRate(rate: RateRecord, userId: string) {
    console.log('save rate', rate, userId);
    return;
  }
}
