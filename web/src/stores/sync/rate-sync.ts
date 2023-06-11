import { rateStore } from "../rate-store";
import { SyncAbstract } from "../lib/sync-abstract";
import { computed, makeObservable, transaction } from "mobx";
import { toast } from "react-toastify";
import { api } from "../lib/api";

interface Data {
  selectedName: string;
  ethCostManual: string;
}

export class RateSync extends SyncAbstract {
  @computed protected get syncData(): Data {
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
      const data = await api('/rate/get');
      transaction(() => {
        rateStore.selectedName = data.selectedName;
        rateStore.ethCostManual = data.ethCostManual;
      });
    }
    catch {
      toast.error('Failed to load customer rate');
    }
  }

  protected async syncHandler() {
    try {
      await api('/rate/save', this.syncData);
    }
    catch {
      toast.error('Failed to save customer rate');
    }
  }
}