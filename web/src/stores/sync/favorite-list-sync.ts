import { when } from "mobx";
import { SyncAbstract } from "../lib/sync-abstract";
import { walletListStore } from "../wallet-list-store";
import { api } from "../lib/api";
import { toast } from "react-toastify";

export class FavoriteListSync extends SyncAbstract {

  protected async init() {
    // wait loading dependency
    await when(() => walletListStore.sync.initialized);
    super.init();
  }

  protected async loadHandler() {
    const addresses = walletListStore.favorites.map(wallet => wallet.address);

    try {
      await api('/favorite-list/get', { addresses });
    }
    catch {
      toast.error('Failed to load favorite list');
    }
    await new Promise(r => setTimeout(r, 1000));

    this.syncData = addresses.map(address => {
      return {
        address,
        eth: String(Math.round(Math.random()*1000) / 100),
        old: Math.random() > 0.5
      }
    });
  }
}