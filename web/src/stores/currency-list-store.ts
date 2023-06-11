import { makeObservable, observable } from "mobx";
import { CurrencyListSync } from "./sync/currency-list-sync";
import { PrivateStoreAbstract } from "./lib/private-store-abstract";

export interface CurrencyRecord {
  name: string;
  ethCost: string;
}

class CurrencyListStore extends PrivateStoreAbstract {
  sync = new CurrencyListSync();

  @observable.ref list: CurrencyRecord[] = [];

  constructor() {
    super();
    makeObservable(this);
  }

  reset() {
    this.list = [];
  }
}

export const currencyListStore = new CurrencyListStore();