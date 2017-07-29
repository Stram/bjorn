import {Store} from 'vuex';

import {Form} from 'app/services/form-object';

export interface ILoginFormOptions {
  store: Store<any>;
}

export default class LoginForm extends Form {
  constructor({store}: ILoginFormOptions) {
    super({
      fields: [],
      name: 'login-form',
      store,
    });
  }

  public onSubmit() {
    return this.store.dispatch('session/login');
  }
}
