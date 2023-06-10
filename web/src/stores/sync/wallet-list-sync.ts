import { walletListStore } from "../wallet-list-store";
import { SyncAbstract } from "../lib/sync-abstract";
import { api } from "../lib/api";
import { toast } from "react-toastify";

export class WalletListSync extends SyncAbstract {
  protected get syncData() {
    return walletListStore.list;
  }

  protected async loadHandler() {
    try {
      await api('/wallet-list/get');
    }
    catch {
      toast.error('Failed to load wallet list');
    }
    await new Promise(r => setTimeout(r, 1000));

    walletListStore.list = [
      { address: '0x123', favorite: true },
      { address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae', favorite: true }
    ];
  }

  protected async syncHandler() {
    try {
      await api('/wallet-list/put', this.syncData);
    }
    catch {
      toast.error('Failed to save wallet list');
    }
    await new Promise(r => setTimeout(r, 1000));
  }
}