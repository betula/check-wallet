import { computed, makeObservable, observable } from "mobx";

class GlobalPendingStore {
  @observable.ref protected list: VoidFunction[] = [];

  @computed get pending() {
    return this.list.map(expr => expr()).some(pending => pending);
  }

  constructor() {
    makeObservable(this);
  }

  attach(expr: VoidFunction) {
    this.list = this.list.concat(expr);

    return () => {
      // detach
      this.list = this.list.filter(item => item !== expr);
    }
  }
}

export const globalPendingStore = new GlobalPendingStore();