import { toast } from "react-toastify";
import { currencyListStore } from "../currency-list-store";
import { api } from "../lib/api";
import { SyncAbstract } from "../lib/sync-abstract";

const PULL_MS = 1000 * 60 * 5; // auto update currency rate each 5 minutes

export class CurrencyListSync extends SyncAbstract {
  protected get syncData() {
    return currencyListStore.list;
  }

  protected async loadHandler() {
    try {
      await api('/currency-list/get');
    }
    catch {
      toast.error('Failed to load currency list');
    }
    await new Promise(r => setTimeout(r, 1000));

    currencyListStore.list = [
      { name: 'USD', ethCost: '1.2' },
      { name: 'EUR', ethCost: '17000' },
    ];
  }

  constructor() {
    super();
    this.autoPull();
  }

  protected autoPull() {
    setInterval(() => this.throttledLoad(), PULL_MS)
  }
}