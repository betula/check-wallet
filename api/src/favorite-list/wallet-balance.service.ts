import { Injectable, Logger } from '@nestjs/common';
import { EnvConfigService } from 'src/env-config/env-config.service';
import fetch from 'cross-fetch';

const WalletBalanceApiUrl =
  'https://api.etherscan.io/api?module=account&action=balancemulti'; //address=0x1,0x2{50}&apikey=

interface WalletBalanceRecord {
  account: string;
  balance: string;
}

interface ApiCallResponse {
  status: string;
  message: string;
  result: WalletBalanceRecord[];
}

@Injectable()
export class WalletBalanceService {
  protected logger = new Logger('WalletBalance');

  constructor(private envConfigService: EnvConfigService) {}

  private async apiQuery(addresses: string[]) {
    const apiUrl = `${WalletBalanceApiUrl}&apikey=${this.envConfigService.get(
      'ETHERSCAN_API_KEY',
    )}&address=${addresses}`;
    const response = await fetch(apiUrl);
    const data: ApiCallResponse = await response.json();

    if (data?.status !== '1' || !Array.isArray(data?.result)) {
      this.logger.error(data);
      throw new Error('Invalid response');
    }

    return data.result;
  }

  async getWalletBalance(addresses: string[]): Promise<WalletBalanceRecord[]> {
    const chunks: string[][] = [];

    // https://docs.etherscan.io/api-endpoints/accounts#get-ether-balance-for-multiple-addresses-in-a-single-call
    // up to 20 addresses per call
    const limit = 20;

    for (let i = 0; i < addresses.length; i += limit) {
      chunks.push(addresses.slice(i, i + limit));
    }

    const results = await Promise.all(
      chunks.map((addresses) => this.apiQuery(addresses)),
    );

    return [].concat(...results);
  }
}
