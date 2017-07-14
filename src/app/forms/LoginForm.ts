import {Store} from 'vuex';

import Form from 'app/forms/Form';

export interface LoginFormOptions {
  store: Store<any>;
}

export default class LoginForm extends Form {
  public username: string;
  public password: string;
  private store: Store<any>;

  constructor({store}: LoginFormOptions) {
    super();
    this.store = store;
  }

  onSubmit() {
    // this.store.dispatch('');
    return Promise.resolve();
  }
}