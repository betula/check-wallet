import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  CurrencyListSchemaKey,
  CurrencyListRecord,
} from './currency-list.schema';
import { InjectModel } from '@nestjs/mongoose';
import { EnvConfigService } from 'src/env-config/env-config.service';
import fetch from 'cross-fetch';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

const CurrencyNameList = ['USD', 'EUR'];
const CurrencyApiUrl =
  'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR';

const CacheKey = 'CurrencyListCache';
const CacheTtl = 300; // 300 ms

interface ApiResponseData {
  USD: string;
  EUR: string;
}

@Injectable()
export class CurrencyListService {
  protected logger = new Logger('CurrencyList');

  constructor(
    @InjectModel(CurrencyListSchemaKey)
    private currencyListModel: Model<CurrencyListRecord>,
    private envConfigService: EnvConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async apiQuery() {
    const apiUrl = `${CurrencyApiUrl}&api_key=${this.envConfigService.get(
      'CRYPTOCOMPARE_API_KEY',
    )}`;
    const response = await fetch(apiUrl);
    const data: ApiResponseData = await response.json();

    if (!data.USD || !data.EUR) {
      this.logger.error(data);
      throw new Error('Invalid response');
    }

    const list: CurrencyListRecord[] = CurrencyNameList.map((name) => ({
      name,
      ethCost: String(data[name]),
    }));

    return list;
  }

  private async safeQuery() {
    try {
      const list = await this.apiQuery();

      try {
        await this.currencyListModel.bulkWrite(
          list.map(({ name, ethCost }) => {
            return {
              updateOne: {
                filter: { name },
                update: { $set: { ethCost } },
                upsert: true,
              },
            };
          }),
        );
      } catch {}

      return list;
    } catch (e) {
      this.logger.error(e);
      return (await this.currencyListModel.find().exec()) || [];
    }
  }

  async getCurrencyList(): Promise<CurrencyListRecord[]> {
    const cached = await this.cacheManager.get<CurrencyListRecord[]>(CacheKey);
    if (cached) {
      return cached;
    }
    const list = await this.safeQuery();
    await this.cacheManager.set(CacheKey, list, CacheTtl);

    return list;
  }
}
