import Dashboard from 'models/Dashboard';
import Widget from 'models/Widget';
import * as mutationTypes from 'store/mutation-types';

import State from './state';

export default {
  [mutationTypes.SET_DASHBAORD](state: State, dashboard: Dashboard) {
    state.dashboards.data[dashboard.id] = dashboard;
  },

  [mutationTypes.DASHBOARDS_START_LOADING](state: State) {
    state.dashboards.isLoading = true;
  },

  [mutationTypes.DASHBOARDS_LOADED](state: State) {
    state.dashboards.isLoaded = true;
    state.dashboards.isLoading = false;
  },

  [mutationTypes.SET_WIDGET](state: State, widget: Widget) {
    state.widgets.data[widget.id] = widget;
  },
};
