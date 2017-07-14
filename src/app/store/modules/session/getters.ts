import {GetterTree} from 'vuex';

import State from './state';

export function currentUser(state: State): number {
  return 0;
}

export default <GetterTree<State, any>> {
  currentUser,
}