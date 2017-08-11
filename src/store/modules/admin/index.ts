import { ActionTree, Module } from 'vuex';

import FirebaseServiceClass from 'services/firebase';

import createActions from './actions';
import Getters from './getters';
import Mutations from './mutations';
import State from './state';

export interface IAdminModuleOptions {
  firebaseService: FirebaseServiceClass;
}

export default class AdminStoreModule implements Module<State, {}> {

  public namespaced: boolean = true;

  public state: State;
  public mutations = Mutations;
  public getters = Getters;
  public actions: ActionTree<State, any>;

  constructor({ firebaseService }: IAdminModuleOptions) {
    this.state = new State();
    this.actions = createActions({ firebaseService });
  }
}
