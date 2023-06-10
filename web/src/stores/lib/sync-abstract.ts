import { computed, makeObservable, observable, reaction, transaction } from "mobx";
import throttle from 'lodash/throttle';
import { globalPendingStore } from "./global-pending-store";

const THROTTLE_MS = 500;

export interface SyncDataConfig {
  get?(): unknown;
  set?(data: unknown): void;
}

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

  protected unsubscribers: VoidFunction[] = [];
  protected destroyed = false;

  protected loadHandler?(): Promise<void>;
  protected syncHandler?(): Promise<void>;

  protected get syncData() { return }
  protected set syncData(_value: unknown) { return }

  constructor(syncDataConfig?: SyncDataConfig) {
    makeObservable(this);

    if (syncDataConfig) {
      Object.defineProperty(this, 'syncData', syncDataConfig);
    }

    // Registed in global pending store
    const dettach = globalPendingStore.attach(() => this.pending);
    this.unsubscribers.push(dettach);

    // Start loading and syncing only after object will be created.
    // After constructor phase.
    setTimeout(() => {
      if (!this.destroyed) {
        this.enableSync();
        this.init();
      }
    });
  }

  destroy() {
    this.destroyed = true;
    this.unsubscribers.forEach(fn => fn());
  }

  protected init() {
    this.throttledLoad();
  }

  protected throttledLoad = throttle(() => this.load(), THROTTLE_MS);

  protected async load() {
    this.numLoading++;
    try {
      if (this.destroyed) {
        return;
      }
      await this.loadHandler?.();
    }
    finally {
      transaction(() => {
        this.numLoading--;
        this.initialized = true;
      });
    }
  }

  protected async enableSync() {
    const stop = reaction(() => this.syncData, () => {
      if (!this.initialized) {
        return;
      }
      this.throttledSync();
    });
    this.unsubscribers.push(stop);
  }

  protected throttledSync = throttle(() => this.sync(), THROTTLE_MS);

  protected async sync() {
    this.numSyncing += 1;
    try {
      if (this.destroyed) {
        return;
      }
      await this.syncHandler?.();
    }
    finally {
      this.numSyncing -= 1;
    }
  }

}
