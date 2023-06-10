import { makeObservable, observable } from "mobx";

class ApiConfigStore {
  @observable.ref token: string | null = null;
  @observable.ref tokenLoaded = false;

  constructor() {
    makeObservable(this);
  }
}

export const apiConfigStore = new ApiConfigStore();