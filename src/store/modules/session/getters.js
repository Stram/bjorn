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
};
