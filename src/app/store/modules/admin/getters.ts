import Dashboard from 'app/models/Dashboard';

import State from './state';

export function dashboards(state: State): Array<Dashboard> {
  return state.dashboards.data.sort((dashboardA, dashboardB) => {
    const createdAtA = new Date(dashboardA.createdAt);
    const createdAtB = new Date(dashboardA.createdAt);
    return createdAtA.getMilliseconds() - createdAtB.getMilliseconds();
  });
}

export default {
  dashboards,
};
