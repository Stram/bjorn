const errorMessageMap = {
  'auth/popup-closed-by-user': 'Login failed! Login popup was closed!',
  'auth/unauthorized-domain': 'Login failed! You cannot log in using this domain!'
};

export default {
  currentUser(state) {
    return state.user;
  },

  isAuthenticated(state) {
    return state.isLoaded && !state.isLoading && Boolean(state.user);
  },

  isLoading(state) {
    return state.isLoading;
  },

  errorMessage(state) {
    return state.error && state.error.code && errorMessageMap[state.error.code];
  }
};
