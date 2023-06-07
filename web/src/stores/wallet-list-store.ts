import { makeAutoObservable, observable } from "mobx";

export interface WalletRecord {
  address: string;
}

class WalletListStore {
  list: WalletRecord[] = [
    { address: '0x123' },
    { address: '0x456' }
  ];
  syncing = false;

  constructor() {
    makeAutoObservable(this, {
      list: observable.ref,
      syncing: observable.ref
    });
  }

  add(address: string) {
    this.list = this.list.concat({ address });
  }

  update(record: WalletRecord, address: string) {
    this.list = this.list.map(item => {
      if (Object.is(item, record)) {
        return { address };
      }
      else {
        return item;
      }
    });
  }

  remove(record: WalletRecord) {
    this.list = this.list.filter(item => !Object.is(item, record));
  }
}

export const walletListStore = new WalletListStore();