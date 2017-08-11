import Dashboard from 'models/Dashboard';
import * as mutationTypes from 'store/mutation-types';

import State from './state';

export default {
  [mutationTypes.SET_DASHBAORDS](state: State, dashboards: Array<Dashboard>) {
    state.dashboards.data = dashboards;
  },

  [mutationTypes.SET_DASHBAORD](state: State, dashboard: Dashboard) {
    const localIndex = state.dashboards.data.findIndex(({ uid }) => uid === dashboard.uid);
    if (localIndex > -1) {
      state.dashboards.data.splice(localIndex, 1, dashboard);
    } else {
      state.dashboards.data.push(dashboard);
    }
  },

  [mutationTypes.DASHBOARDS_START_LOADING](state: State) {
    state.dashboards.isLoading = true;
  },

  [mutationTypes.DASHBOARDS_LOADED](state: State) {
    state.dashboards.isLoaded = true;
    state.dashboards.isLoading = false;
  },
};
