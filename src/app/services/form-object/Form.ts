import {Store} from 'vuex';
import StoreModule from './StoreModule';

import {IFieldOptions} from './Field';

export interface IFormOptions {
  fields: Array<IFieldOptions>;
  store: Store<any>;
  name: string;
}

export default abstract class Form {
  protected name: string;
  protected store: Store<any>;
  protected storeModule: StoreModule;

  constructor({fields, store, name}: IFormOptions) {
    this.name = name;
    this.store = store;
    this.storeModule = new StoreModule(name, this.store);
    this.initialize(fields);
  }

  get listOfFields() {
    return this.storeModule.listOfFields;
  }

  get isValid() {
    return this.storeModule.isValid;
  }

  get fields() {
    return this.storeModule.fields;
  }

  public submit() {
    if (this.isValid) {
      this.onSubmit();
    }
  }

  protected abstract onSubmit(): Promise<any>;

  private initialize(fields: Array<IFieldOptions>) {
    this.storeModule.setFields(fields);
  }
}
