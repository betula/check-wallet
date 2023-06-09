import { computed, makeObservable, observable } from "mobx";
import { WalletListSync } from "./wallet-list-sync";

export interface WalletRecord {
  address: string;
  favorite: boolean;
}

class WalletListStore {
  sync = new WalletListSync();

  @observable.ref list: WalletRecord[] = [];

  @computed get favorites() {
    return this.list.filter(item => item.favorite);
  }

  constructor() {
    makeObservable(this);
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