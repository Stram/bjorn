import Dashboard from 'app/models/Dashboard';
import * as mutationTypes from 'app/store/mutation-types';

import State from './state';

export default {
  [mutationTypes.SET_DASHBAORDS](state: State, dashboards: Array<Dashboard>) {
    state.dashboards = dashboards;
  },
};
