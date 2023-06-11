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
      walletListStore.list = await api('/wallet-list/get');
    }
    catch {
      toast.error('Failed to load wallet list');
    }
  }

  protected async syncHandler() {
    try {
      const wallets = this.syncData;
      await api('/wallet-list/save', { wallets });
    }
    catch {
      toast.error('Failed to save wallet list');
    }
  }
}