import { Module } from 'vuex';

import FirebaseServiceClass from 'app/services/firebase';

import Actions from './actions';
import Getters from './getters';
import Mutations from './mutations';
import State from './state';

export interface IAdminModuleOptions {
  firebaseService: FirebaseServiceClass;
}

export default class UIStoreModule implements Module<State, {}> {

  public namespaced: boolean = true;

  public state: State;
  public mutations = Mutations;
  public getters = Getters;
  public actions = Actions;

  constructor() {
    this.state = new State();
  }
}
