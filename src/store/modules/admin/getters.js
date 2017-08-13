export default {
  dashboards(state) {
    return Object.values(state.dashboards.data).sort((dashboardA, dashboardB) => {
      const createdAtA = new Date(dashboardA.createdAt);
      const createdAtB = new Date(dashboardB.createdAt);
      return createdAtA.getMilliseconds() - createdAtB.getMilliseconds();
    });
  },

  widgets(state) {
    return Object.values(state.widgets.data);
  },

  isLoading(state) {
    return state.dashboards.isLoading || state.widgets.isLoading;
  },
};
