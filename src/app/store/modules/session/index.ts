import {Module} from 'vuex';

import Actions from './actions';
import Getters from './getters';
import Mutations from './mutations';
import State from './state';

export default class SessionStoreModule implements Module<State, {}> {

  public namespaced: boolean = true;

  public state: State;
  public mutations = Mutations;
  public getters = Getters;
  public actions = Actions;

  constructor() {
    this.state = new State();
  }
}
