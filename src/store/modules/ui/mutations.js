import * as mutationTypes from 'store/mutation-types';

export default {
  [mutationTypes.SET_WINDOW_SIZE](state, {width, height}) {
    state.windowWidth = width;
    state.windowHeight = height;
  },

  [mutationTypes.SET_THEME](state, themeId) {
    state.theme = themeId;
  },

  [mutationTypes.SET_DASHBOARDS_LAYOUT](state, dashboardsLayoutId) {
    state.dashboardsLayout = dashboardsLayoutId;
  },
};
