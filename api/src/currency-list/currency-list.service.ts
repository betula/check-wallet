import { Injectable } from '@nestjs/common';

export interface CurrencyRecord {
  name: string;
  ethCost: string;
}

@Injectable()
export class CurrencyListService {
  async getCurrencyList(): Promise<CurrencyRecord[]> {
    return [
      { name: 'USD', ethCost: '1.2' },
      { name: 'EUR', ethCost: '17000' },
    ];
  }
}
