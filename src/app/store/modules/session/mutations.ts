import User from 'app/models/User';
import * as mutationTypes from 'app/store/mutation-types';

import State from './state';

export default {
  [mutationTypes.SET_USER](state: State, user: User) {
    state.user = user;
  },
};
