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
    state.errorMessage = error;
  },

  [mutationTypes.AUTHENTIFICATION_SUCCESS](state) {
    state.isLoading = false;
    state.isLoaded = true;
  },

  [mutationTypes.AUTHENTIFICATION_START](state) {
    state.isLoading = true;
    state.errorMessage = null;
  },

  [mutationTypes.RESET_SESSION](state) {
    state.isLoading = false;
    state.isLoaded = true;
    state.errorMessage = null;
    state.user = null;
    state.token = null;
  },
};
