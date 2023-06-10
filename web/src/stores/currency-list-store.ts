import { makeObservable, observable } from "mobx";
import { CurrencyListSync } from "./sync/currency-list-sync";

export interface CurrencyRecord {
  name: string;
  ethCost: string;
}

class CurrencyListStore {
  sync = new CurrencyListSync();

  @observable.ref list: CurrencyRecord[] = [];

  constructor() {
    makeObservable(this);
  }
}

export const currencyListStore = new CurrencyListStore();