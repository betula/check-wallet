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
      const ethFloat = parseFloat(raw.eth) || 0;
      const inCurrencyFloat = ethCostFloat * ethFloat;
      const inCurrency = this.currencyFormatter.format(inCurrencyFloat);
      const eth = this.ethFormatter.format(ethFloat);
      return { ...raw, inCurrency, eth }
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

  @computed protected get ethFormatter() {
    const options: Intl.NumberFormatOptions = { 
      maximumFractionDigits: 5,
      minimumFractionDigits: 0,
      useGrouping: false
    };
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