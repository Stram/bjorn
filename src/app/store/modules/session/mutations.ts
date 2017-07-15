import {MutationTree} from 'vuex';

import * as mutationTypes from 'app/store/mutation-types';
import User from 'app/models/User';

import State from './state';

export default <MutationTree<State>> {
  [mutationTypes.SET_USER](state: State, user: User) {
    state.user = user;
  }
}