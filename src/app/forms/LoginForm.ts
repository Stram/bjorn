import {Store} from 'vuex';

import {Form} from 'app/services/form-object';

export interface ILoginFormOptions {
  store: Store<any>;
}

export default class LoginForm extends Form {
  public username: string;
  public password: string;
  private store: Store<any>;

  constructor({store}: ILoginFormOptions) {
    super({
      fields: [{
        name: 'username',
        type: 'string',
        validators: [],
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
