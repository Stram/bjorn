import Vue from 'vue';

import * as mutationTypes from 'store/mutation-types';

export default {
  [mutationTypes.SET_DASHBAORD](state, dashboard) {
    Vue.set(state.dashboards.data, dashboard.id, dashboard);
  },

  [mutationTypes.DASHBOARDS_START_LOADING](state) {
    state.dashboards.isLoading = true;
  },

  [mutationTypes.DASHBOARDS_LOADED](state) {
    state.dashboards.isLoaded = true;
    state.dashboards.isLoading = false;
  },



  [mutationTypes.SET_WIDGET](state, widget) {
    Vue.set(state.widgets.data, widget.id, widget);
  },

  [mutationTypes.WIDGETS_START_LOADING](state) {
    state.widgets.isLoading = true;
  },

  [mutationTypes.WIDGETS_LOADED](state) {
    state.widgets.isLoaded = true;
    state.widgets.isLoading = false;
  }

};
