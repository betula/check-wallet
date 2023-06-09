import { computed, makeObservable, observable, reaction, transaction } from "mobx";
import throttle from 'lodash/throttle';
import { globalPendingStore } from "./global-pending-store";

const THROTTLE_MS = 500;

export abstract class SyncAbstract {
  @observable.ref protected numLoading = 0;
  @observable.ref protected numSyncing = 0;

  @observable.ref initialized = false;

  @computed get pending() {
    return this.loading || this.syncing;
  }
  @computed get loading() {
    return this.numLoading > 0;
  }
  @computed get syncing() {
    return this.numSyncing > 0;
  }

  protected abstract get data(): unknown;
  protected loadHandler?(): Promise<void>;
  protected syncHandler?(): Promise<void>;

  constructor() {
    makeObservable(this);

    // Start loading after object will be created on the next tick
    setTimeout(() => {
      this.throttledLoad();
      this.switchOnSync();
    });

    // Registed in global pending store
    globalPendingStore.pushExpression(() => this.pending);
  }

  protected throttledLoad = throttle(() => this.load(), THROTTLE_MS);

  protected async load() {
    this.numLoading++;
    try {
      await this.loadHandler?.();
    }
    finally {
      transaction(() => {
        this.numLoading--;
        this.initialized = true;
      });
    }
  }

  protected async switchOnSync() {
    reaction(() => this.data, () => {
      if (!this.initialized) {
        return;
      }
      this.throttledSync();
    });
  }

  protected throttledSync = throttle(() => this.sync(), THROTTLE_MS);

  protected async sync() {
    this.numSyncing += 1;
    try {
      await this.syncHandler?.();
    }
    finally {
      this.numSyncing -= 1;
    }
  }

}
