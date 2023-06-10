import { when } from "mobx";
import { SyncAbstract } from "./lib/sync-abstract";
import { walletListStore } from "./wallet-list-store";

export class FavoriteListSync extends SyncAbstract {

  protected async init() {
    await when(() => walletListStore.sync.initialized);
    super.init();
  }

  protected async loadHandler() {
    const addresses = walletListStore.favorites.map(wallet => wallet.address);

    await new Promise(r => setTimeout(r, 1000));
    this.syncData = addresses.map(address => {
      return {
        address,
        eth: String(Math.round(Math.random()*1000) / 100),
        old: Math.random() > 0.5
      }
    });

    console.log('LOAD FAVORITE LIST');
  }
}