export default {
  isLoading(state, getters) {
    return getters['admin/isLoading'] ||
      getters['session/isLoading'] ||
      state.dashboards.isLoading ||
      state.widgets.isLoading;
  },

  dashboards(state) {
    return Object.values(state.dashboards.data);
  },

  widgets(state) {
    return Object.values(state.widgets.data);
  }
};
