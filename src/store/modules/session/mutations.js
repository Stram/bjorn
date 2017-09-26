import * as mutationTypes from 'store/mutation-types';

export default {
  [mutationTypes.SET_USER](state, user) {
    state.user = user;
  },

  [mutationTypes.SET_TOKEN](state, token) {
    state.token = token;
  },

  [mutationTypes.AUTHENTIFICATION_FAIL](state, error) {
    state.isLoading = false;
    state.isLoaded = true;
    state.error = error;
  },

  [mutationTypes.AUTHENTIFICATION_SUCCESS](state) {
    state.isLoading = false;
    state.isLoaded = true;
  },

  [mutationTypes.AUTHENTIFICATION_START](state) {
    state.isLoading = true;
    state.error = null;
  },

  [mutationTypes.RESET_SESSION](state) {
    state.isLoading = false;
    state.isLoaded = true;
    state.error = null;
    state.user = null;
    state.token = null;
  },
};
