import { rateStore } from "./rate-store";
import { SyncAbstract } from "./lib/sync-abstract";
import { computed, makeObservable } from "mobx";

export class RateSync extends SyncAbstract {

  @computed protected get data() {
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
    await new Promise(r => setTimeout(r, 1000));
    rateStore.selectedName = 'USD';
    console.log('LOAD RATE');
  }

  protected async syncHandler() {
    console.log('SYNC RATE', this.data);
    await new Promise(r => setTimeout(r, 1000));
  }
}