import { Injectable, Logger } from '@nestjs/common';
import { EnvConfigService } from 'src/env-config/env-config.service';
import fetch from 'cross-fetch';
import { WalletOldRecord, WalletOldSchemaKey } from './wallet-old.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address
const WalletTxlistApiUrl =
  'https://api.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999&page=1&offset=1&sort=asc';
// &address=0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC
// &apikey=YourApiKeyToken';

export interface WalletOldRet {
  address: string;
  isOld: boolean;
}

interface ApiCallResultRecord {
  timeStamp: string;
}

interface ApiCallResponse {
  status: string;
  message: string;
  result: ApiCallResultRecord[];
}

@Injectable()
export class WalletOldService {
  protected logger = new Logger('WalletOld');

  constructor(
    @InjectModel(WalletOldSchemaKey)
    private walletOldModel: Model<WalletOldRecord>,
    private envConfigService: EnvConfigService,
  ) {}

  private async apiFirstTxMsQuery(address: string) {
    const apiUrl = `${WalletTxlistApiUrl}&apikey=${this.envConfigService.get(
      'ETHERSCAN_API_KEY',
    )}&address=${address}`;
    const response = await fetch(apiUrl);
    const data: ApiCallResponse = await response.json();

    if (!['0', '1'].includes(data?.status) || !Array.isArray(data?.result)) {
      this.logger.error(data);
      throw new Error('Invalid response');
    }

    return String(parseInt(data.result[0]?.timeStamp) * 1000 || 0);
  }

  private isOldMs(ms: string) {
    const firstTxMs = parseInt(ms);
    if (!firstTxMs) {
      return false;
    }

    const oneYearAgoMs = new Date().setFullYear(new Date().getFullYear() - 1);
    return firstTxMs <= oneYearAgoMs;
  }

  private async isWalletOld(address: string) {
    const doc = await this.walletOldModel.findOne({ address }).exec();
    if (doc) {
      return this.isOldMs(doc.firstTxMs);
    }

    const firstTxMs = await this.apiFirstTxMsQuery(address);
    await this.walletOldModel.updateOne(
      { address },
      { firstTxMs },
      { upsert: true },
    );

    return this.isOldMs(firstTxMs);
  }

  async isWalletsOld(addresses: string[]): Promise<WalletOldRet[]> {
    const results = await Promise.all(
      addresses.map(async (address) => {
        const isOld = await this.isWalletOld(address);
        return {
          address,
          isOld,
        };
      }),
    );

    return [].concat(...results);
  }
}
