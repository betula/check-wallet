import { computed, makeObservable, observable } from "mobx";
import { FavoriteListSync } from "./sync/favorite-list-sync";
import { MANUAL_NAME, rateStore } from "./rate-store";

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
    const currency = rateStore.selectedCurrency;
    const ethCostFloat = parseFloat(String(currency?.ethCost)) || 0;

    return this.rawList.map(raw => {
      const inCurrencyFloat = ethCostFloat * parseFloat(raw.eth) || 0;
      const inCurrency = this.currencyFormatter.format(inCurrencyFloat);
      return { ...raw, inCurrency }
    })
  }

  @computed protected get currencyFormatter() {
    const options: Intl.NumberFormatOptions = { 
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      useGrouping: true
    };
    const currency = rateStore.selectedCurrency;
    if (currency && currency.name !== MANUAL_NAME) {
      Object.assign(options, {
        style: 'currency',
        currency: currency.name
      });
    }
    return new Intl.NumberFormat('en-US', options);
  }

  constructor() {
    makeObservable(this);
    this.sync.init();
  }

  destroy() {
    this.sync.destroy();
  }
}