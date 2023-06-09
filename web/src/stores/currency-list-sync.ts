import { currencyListStore } from "./currency-list-store";
import { SyncAbstract } from "./lib/sync-abstract";

const PULL_MS = 1000 * 60 * 5; // auto update currency rate each 5 minutes

export class CurrencyListSync extends SyncAbstract {
  protected get data() {
    return currencyListStore.list;
  }

  protected async loadHandler() {
    await new Promise(r => setTimeout(r, 1000));
    currencyListStore.list = [
      { name: 'USD', ethCost: '1.2' },
      { name: 'EUR', ethCost: '1.8' },
    ];
    console.log('LOAD CURRENCY LIST');
  }

  constructor() {
    super();
    this.autoPull();
  }

  protected autoPull() {
    setInterval(() => this.throttledLoad(), PULL_MS)
  }
}