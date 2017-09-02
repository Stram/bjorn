export default {
  dashboards(state) {
    return Object.values(state.dashboards.data);
  },

  widgets(state) {
    return Object.values(state.widgets.data);
  }
};
