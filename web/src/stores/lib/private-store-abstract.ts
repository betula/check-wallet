import { reaction } from "mobx";
import { authStore } from "./auth-store";
import { SyncAbstract } from "./sync-abstract";

export abstract class PrivateStoreAbstract {
  abstract sync: SyncAbstract;

  protected reset?(): void;

  constructor() {
    // Start initializing only after object will be created.
    // After constructor phase.
    setTimeout(() => this.init());
  }

  protected init() {
    if (authStore.isSignedIn) {
      this.sync.init();
    }
    reaction(() => authStore.isSignedIn, (flag) => {
      if (flag) {
        this.sync.init();
      } else {
        this.sync.reset();
        this.reset?.();
      }
    });
  }

}
