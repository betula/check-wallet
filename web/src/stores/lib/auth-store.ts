import { makeObservable, observable } from "mobx";

class AuthStore {
  @observable.ref token: string | null = null;
  @observable.ref isLoaded = false;
  @observable.ref isSignedIn = false;

  constructor() {
    makeObservable(this);
  }
}

export const authStore = new AuthStore();