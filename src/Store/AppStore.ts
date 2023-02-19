import { BehaviorSubject } from "rxjs";

export class AppStore {
  static isExists = false;
  static instance: AppStore;

  public $render = new BehaviorSubject(null);

  constructor() {
    if (AppStore.isExists) {
      return AppStore.instance;
    }

    AppStore.isExists = true;
    AppStore.instance = this;
  }
}

export const Store = new AppStore();
