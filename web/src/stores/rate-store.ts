import { computed, makeObservable, observable, transaction } from "mobx";
import { currencyListStore } from "./currency-list-store";
import { RateSync } from "./rate-sync";

const MANUAL_NAME = 'Custom';

class RateStore {
  sync = new RateSync();

  @observable.ref ethCostManual = '1.0';
  @observable.ref selectedName = MANUAL_NAME;

  @computed get initialized() {
    return this.sync.initialized && currencyListStore.sync.initialized;
  }

  @computed get currencies() {
    return currencyListStore.list.concat({
      name: MANUAL_NAME,
      ethCost: this.ethCostManual
    });
  }

  @computed get selectedCurrency() {
    return this.currencies.find(cur => cur.name === this.selectedName);
  }

  constructor() {
    makeObservable(this);
  }

  select(name: string) {
    this.selectedName = name;
  }

  manual(cost: string) {
    transaction(() => {
      this.ethCostManual = cost;
      this.selectedName = MANUAL_NAME;
    });
  }
}

export const rateStore = new RateStore();