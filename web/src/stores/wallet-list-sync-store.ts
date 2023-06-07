import { computed, makeAutoObservable, observable, reaction } from "mobx";
import { walletListStore } from "./wallet-list-store";
import throttle from 'lodash/throttle';

const SYNC_MIN_INTERVAL_MS = 500;

export interface WalletRecord {
  address: string;
  favorite: boolean;
}

class WalletListSyncStore {
  _loadingDeep = 0;
  _syncingDeep = 0;

  get pending() {
    return this.loading || this.syncing;
  }
  get loading() {
    return this._loadingDeep > 0;
  }
  get syncing() {
    return this._syncingDeep > 0;
  }

  constructor() {
    makeAutoObservable(this, {
      _loadingDeep: observable.ref,
      _syncingDeep: observable.ref,
      pending: computed,
      loading: computed,
      syncing: computed,
    });

    this.initialLoad();
    this.switchOnSync();
  }

  protected async initialLoad() {
    this._loadingDeep++;
    try {
      await new Promise(r => setTimeout(r, 1000));
      walletListStore.list = [
        { address: '0x123', favorite: false },
        { address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae', favorite: false }
      ];
    }
    finally {
      this._loadingDeep--;
    }
  }

  protected async switchOnSync() {
    reaction(() => walletListStore.list, () => {
      if (this.loading) {
        return;
      }
      this.sync();
    });
  }

  protected async syncHandler() {
    this._syncingDeep += 1;
    try {
      console.log('SYNC', walletListStore.list);
      await new Promise(r => setTimeout(r, 1000));
    }
    finally {
      this._syncingDeep -= 1;
    }
  }
  protected sync = throttle(() => this.syncHandler(), SYNC_MIN_INTERVAL_MS);
}

export const walletListSyncStore = new WalletListSyncStore();