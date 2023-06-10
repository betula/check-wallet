import { walletListStore } from "./wallet-list-store";
import { SyncAbstract } from "./lib/sync-abstract";

export class WalletListSync extends SyncAbstract {
  protected get syncData() {
    return walletListStore.list;
  }

  protected async loadHandler() {
    await new Promise(r => setTimeout(r, 1000));
    walletListStore.list = [
      { address: '0x123', favorite: false },
      { address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae', favorite: true }
    ];
    console.log('LOAD WALLET LIST');
  }

  protected async syncHandler() {
    console.log('SYNC WALLET LIST', this.syncData);
    await new Promise(r => setTimeout(r, 1000));
  }
}