export default {
  isLoading(state, getters) {
    return getters['admin/isLoading'] || getters['session/isLoading'];
  }
};
