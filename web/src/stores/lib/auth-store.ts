import { makeObservable, observable } from "mobx";

class AuthStore {
  @observable.ref getTokenDelegate?: () => Promise<string | null>;
  @observable.ref isLoaded = false;
  @observable.ref isSignedIn = false;

  constructor() {
    makeObservable(this);
  }

  async getToken() {
    if (this.getTokenDelegate) {
      return this.getTokenDelegate();
    }
    return null;
  }
}

export const authStore = new AuthStore();