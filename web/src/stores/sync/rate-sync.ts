import { rateStore } from "../rate-store";
import { SyncAbstract } from "../lib/sync-abstract";
import { computed, makeObservable } from "mobx";
import { toast } from "react-toastify";
import { api } from "../lib/api";

export class RateSync extends SyncAbstract {
  @computed protected get syncData() {
    return {
      selectedName: rateStore.selectedName,
      ethCostManual: rateStore.ethCostManual
    }
  }

  constructor() {
    super();
    makeObservable(this);
  }

  protected async loadHandler() {
    try {
      await api('/customer-rate/get');
    }
    catch {
      toast.error('Failed to load customer rate');
    }
    await new Promise(r => setTimeout(r, 1000));

    rateStore.selectedName = 'USD';
  }

  protected async syncHandler() {
    try {
      await api('/customer-rate/put', this.syncData);
    }
    catch {
      toast.error('Failed to save customer rate');
    }
    await new Promise(r => setTimeout(r, 1000));
  }
}