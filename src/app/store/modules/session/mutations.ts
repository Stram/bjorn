import User from 'app/models/User';
import * as mutationTypes from 'app/store/mutation-types';

import State from './state';

export default {
  [mutationTypes.SET_USER](state: State, user: User) {
    state.user = user;
  },

  [mutationTypes.SET_TOKEN](state: State, token: string) {
    state.token = token;
  },

  [mutationTypes.AUTHENTIFICATION_FAIL](state: State, error: any) {
    state.isLoading = false;
    state.isLoaded = true;
    state.errorMessage = error;
  },

  [mutationTypes.AUTHENTIFICATION_SUCCESS](state: State) {
    state.isLoading = false;
    state.isLoaded = true;
  },

  [mutationTypes.AUTHENTIFICATION_START](state: State) {
    state.isLoading = true;
    state.errorMessage = null;
  },

  [mutationTypes.RESET_SESSION](state: State) {
    state.isLoading = false;
    state.isLoaded = true;
    state.errorMessage = null;
    state.user = null;
    state.token = null;
  },
};
