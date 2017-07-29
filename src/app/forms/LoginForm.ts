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

  public async onSubmit() {
    await this.store.dispatch('session/login');
    // TODO: reroute;
    console.log('reroute');
    return Promise.resolve();
  }
}
