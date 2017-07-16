import {Store} from 'vuex';

import {Form, Presence} from 'app/services/form-object';

export interface ILoginFormOptions {
  store: Store<any>;
}

export default class LoginForm extends Form {
  private store: Store<any>;

  constructor({store}: ILoginFormOptions) {
    super({
      fields: [{
        name: 'username',
        validators: [Presence],
      }, {
        name: 'password',
        validators: [Presence],
      }],
    });
    this.store = store;
  }

  public onSubmit() {
    // this.store.dispatch('');
    console.log('submit');
    return Promise.resolve();
  }
}
