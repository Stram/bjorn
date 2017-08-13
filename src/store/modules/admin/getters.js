import Dashboard from 'models/Dashboard';

export default {
  dashboards(state) {
    return state.dashboards.data.sort((dashboardA, dashboardB) => {
      const createdAtA = new Date(dashboardA.createdAt);
      const createdAtB = new Date(dashboardA.createdAt);
      return createdAtA.getMilliseconds() - createdAtB.getMilliseconds();
    });
  },
  
  isLoading(state) {
    return state.dashboards.isLoading;
  },
};
