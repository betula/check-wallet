import { Injectable } from '@nestjs/common';

export interface FavoriteRecord {
  address: string;
  eth: string;
  old: boolean;
}

@Injectable()
export class FavoriteListService {
  async getFavoriteList(addresses: string[]): Promise<FavoriteRecord[]> {
    return addresses.map((address: string) => {
      return {
        address,
        eth: String(Math.round(Math.random() * 1000) / 100),
        old: Math.random() > 0.5,
      };
    });
  }
}
