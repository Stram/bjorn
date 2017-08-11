import {Module, Store} from 'vuex';
import {getStoreAccessors, GetterHandler, StoreAccessors} from 'vuex-typescript';

import Field, {IFieldOptions} from './Field';

export interface IState {
  fields: {[key: string]: Field};
}

interface IGetters {
  listOfFields: Array<Field>;
  isValid: boolean;
  fields: {string: Field};
}

export default class StoreModule {
  private module: Module<IState, any>;
  private store: Store<any>;
  private storeAccessors: StoreAccessors<IState, {}>;

  constructor(formModuleName: string, store: Store<any>) {
    this.store = store;
    this.module = {
      actions: {},

      getters: {
        listOfFields(state) {
          return Object.values(state.fields);
        },

        isValid(state, getters: IGetters) {
          return getters.listOfFields.every(({isValid}) => isValid);
        },

        fields(state) {
          return state.fields;
        },
      },

      mutations: {
        setFields(state: IState, {fields}: {fields: Array<IFieldOptions>}) {
          fields.map((fieldOptions) => new Field(fieldOptions)).forEach((field) => {
            state.fields[field.name] = field;
          });
        },
      },

      namespaced: true,

      state: {
        fields: {},
      },
    };

    const storeAccessors = getStoreAccessors<IState, {}>(formModuleName);
    this.storeAccessors = storeAccessors;
    this.store.registerModule(formModuleName, this.module);
  }

  get listOfFields(): Array<Field> {
    const getter = this.module.getters.listOfFields as GetterHandler<IState, {}, any>;
    return this.storeAccessors.read(getter)(this.store);
  }

  get isValid(): boolean {
    const getter = this.module.getters.isValid as GetterHandler<IState, {}, any>;
    return this.storeAccessors.read(getter)(this.store);
  }

  get fields(): {string: Field} {
    const getter = this.module.getters.fields as GetterHandler<IState, {}, any>;
    return this.storeAccessors.read(getter)(this.store);
  }

  public setFields(fields: Array<IFieldOptions>) {
    this.storeAccessors.commit(this.module.mutations.setFields)(this.store, {fields});
  }
}
