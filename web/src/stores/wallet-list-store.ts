import { makeAutoObservable, observable } from "mobx";

export interface WalletRecord {
  address: string;
  favorite: boolean;
}

class WalletListStore {
  list: WalletRecord[] = [
    { address: '0x123', favorite: false },
    { address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae', favorite: false }
  ];
  syncing = false;

  constructor() {
    makeAutoObservable(this, {
      list: observable.ref,
      syncing: observable.ref
    });
  }

  add(address: string) {
    this.list = this.list.concat({ address, favorite: false });
  }

  update(record: WalletRecord, data: Partial<WalletRecord>) {
    this.list = this.list.map(item => {
      if (Object.is(item, record)) {
        return { ...record, ...data };
      }
      else {
        return item;
      }
    });
  }

  updateAddress(record: WalletRecord, address: string) {
    this.update(record, { address });
  }

  toggleFavorite(record: WalletRecord) {
    this.update(record, {
      favorite: !record.favorite
    });
  }

  remove(record: WalletRecord) {
    this.list = this.list.filter(item => !Object.is(item, record));
  }
}

export const walletListStore = new WalletListStore();