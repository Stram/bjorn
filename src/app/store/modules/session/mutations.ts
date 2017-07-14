import {MutationTree} from 'vuex';

import * as mutationTypes from 'app/store/mutation-types';
import State from './state';

export default <MutationTree<State>> {
  [mutationTypes.CHANGE_USER](state: State) {
    state.user = '';
  }
}