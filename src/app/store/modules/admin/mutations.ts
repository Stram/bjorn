import Dashboard from 'app/models/Dashboard';
import * as mutationTypes from 'app/store/mutation-types';

import State from './state';

export default {
  [mutationTypes.SET_DASHBAORDS](state: State, dashboards: Array<Dashboard>) {
    state.dashboards = dashboards;
  },

  [mutationTypes.DASHBOARDS_START_LOADING](state: State) {
    state.isLoading = true;
  },

  [mutationTypes.DASHBOARDS_LOADED](state: State) {
    state.isLoaded = true;
    state.isLoading = false;
  },
};
