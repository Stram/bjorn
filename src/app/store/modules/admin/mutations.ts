import Dashboard from 'app/models/Dashboard';
import * as mutationTypes from 'app/store/mutation-types';

import State from './state';

export default {
  [mutationTypes.SET_DASHBAORDS](state: State, dashboards: Array<Dashboard>) {
    state.dashboards.data = dashboards;
  },

  [mutationTypes.DASHBOARDS_START_LOADING](state: State) {
    state.dashboards.isLoading = true;
  },

  [mutationTypes.DASHBOARDS_LOADED](state: State) {
    state.dashboards.isLoaded = true;
    state.dashboards.isLoading = false;
  },
};
