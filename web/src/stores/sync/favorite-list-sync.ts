import { when } from "mobx";
import { SyncAbstract } from "../lib/sync-abstract";
import { walletListStore } from "../wallet-list-store";
import { api } from "../lib/api";
import { toast } from "react-toastify";

export class FavoriteListSync extends SyncAbstract {

  async init() {
    // wait loading dependency
    await when(() => walletListStore.sync.initialized);
    super.init();
  }

  protected async loadHandler() {
    const addresses = walletListStore.favorites.map(wallet => wallet.address);
    try {
      this.syncData = await api('/favorite-list/get', { addresses });
    }
    catch {
      toast.error('Failed to load favorite list');
    }
  }
}