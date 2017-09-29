import Dashboard from 'models/Dashboard';
import Widget from 'models/Widget';
import * as mutationTypes from 'store/mutation-types';

export default function createActions({firebaseService, queriesService}) {
  return {
    startDashboardsSync({commit}) {
      commit(mutationTypes.DASHBOARDS_START_LOADING);
      return new Promise((resolve, reject) => {
        firebaseService.database.ref('dashboards').on('value', (dashboardsData) => {
          dashboardsData.forEach((dashboardData) => {
            const data = dashboardData.toJSON();
            const dashboard = Dashboard.createFromResponse(Object.assign(data, {id: dashboardData.key}));
            commit(mutationTypes.SET_DASHBAORD, dashboard);
            return false;
          });
          commit(mutationTypes.DASHBOARDS_LOADED);
          resolve();
        }, reject);
      });
    },

    startWidgetsSync({commit}) {
      commit(mutationTypes.WIDGETS_START_LOADING);
      return new Promise((resolve, reject) => {
        firebaseService.database.ref('widgets').on('value', (widgetsData) => {
          widgetsData.forEach((widgetData) => {
            const data = widgetData.toJSON();
            const widget = Widget.createFromResponse(Object.assign(data, {id: widgetData.key}));
            commit(mutationTypes.SET_WIDGET, widget);
            return false;
          });
          commit(mutationTypes.WIDGETS_LOADED);
          resolve();
        }, reject);
      });
    },

    fetchDashboards({commit}) {
      commit(mutationTypes.DASHBOARDS_START_LOADING);
      return queriesService.dashboards().then((dashboards) => {
        dashboards.forEach((dashboard) => commit(mutationTypes.SET_DASHBAORD, dashboard));
        commit(mutationTypes.DASHBOARDS_LOADED);
      });
    }
  };
}
