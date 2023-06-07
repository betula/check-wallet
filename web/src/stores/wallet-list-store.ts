import { computed, makeAutoObservable, observable } from "mobx";

export interface WalletRecord {
  address: string;
  favorite: boolean;
}

class WalletListStore {
  list: WalletRecord[] = [];

  get favorites() {
    return this.list.filter(item => item.favorite);
  }

  constructor() {
    makeAutoObservable(this, {
      list: observable.ref,
      favorites: computed
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