import Vue from 'vue';
import {warn} from 'services/logger';

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
  },

  [mutationTypes.SET_WIDGET_OPTIONS](state, {widgetId, options}) {
    if (state.widgets.data[widgetId]) {
      Vue.set(state.widgets.data[widgetId], 'options', options);
    } else {
      warn(`Widget with id ${widgetId} does not exist in the store. Cannot set widget options.`);
    }
  },

  [mutationTypes.SET_WIDGET_SIZE](state, {widgetId, size}) {
    const widget = state.widgets.data[widgetId];
    if (widget) {
      ['x', 'y', 'width', 'height'].forEach((propertyName) => {
        if (size[propertyName] !== undefined) {
          widget[propertyName] = size[propertyName];
        }
      });
    } else {
      warn(`Widget with id ${widgetId} does not exist in the store. Cannot set widget size.`);
    }
  },

};
