import { computed, makeObservable, observable } from "mobx";
import { FavoriteListSync } from "./favorite-list-sync";
import { rateStore } from "./rate-store";

export interface FavoriteRawRecord {
  address: string;
  eth: string;
  old: boolean;
}

export interface FavoriteRecord extends FavoriteRawRecord {
  inCurrency: string;
}

export class FavoriteListStoreLocal {
  sync = new FavoriteListSync({
    set: (data: FavoriteRawRecord[]) => {
      this.rawList = data;
    }
  });

  @observable.ref rawList: FavoriteRawRecord[] = [];

  @computed get list(): FavoriteRecord[] {
    const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
    const currency = rateStore.selectedCurrency;
    const ethCostFloat = parseFloat(String(currency?.ethCost)) || 0;

    return this.rawList.map(raw => {
      const inCurrencyFloat = ethCostFloat * parseFloat(raw.eth) || 0;
      return {
        ...raw,
        inCurrency: formatter.format(inCurrencyFloat) + ' ' + currency?.name
      }
    })
  }

  constructor() {
    makeObservable(this);
  }

  destroy() {
    this.sync.destroy();
  }
}