import Dashboard from 'models/Dashboard';
import Widget from 'models/Widget';
import * as mutationTypes from 'store/mutation-types';

export default function createActions({firebaseService}) {
  return {
    fetchDashboards({commit}) {
      commit(mutationTypes.DASHBOARDS_START_LOADING);
      return new Promise((resolve, reject) => {
        firebaseService.database.ref('dashboards').once('value').then((dashboardsData) => {
          dashboardsData.forEach((dashboardData) => {
            const data = dashboardData.toJSON();
            commit(mutationTypes.SET_DASHBAORD, new Dashboard({
              createdAt: data.createdAt,
              id: dashboardData.key,
            }));
            return false;
          });
          commit(mutationTypes.DASHBOARDS_LOADED);
          resolve();
        }).catch(reject);
      });
    },

    saveDashboard(context, dashboard) {
      return new Promise((resolve, reject) => {
        firebaseService.database.ref('dashboards').push(dashboard).then((dashboardData) => {
          return dashboardData;
        }).catch(reject);
      });
    },

    async createNewWidget({commit, dispatch}, data) {
      const {x, y, width, height, type} = data;
      const widgetDataToSave = {
        x, y,
        width, height,
        type,
      };

      const widgetResponse = await dispatch('saveWidget', widgetDataToSave);
      const newWidget = new Widget(Object.assign({
        id: widgetResponse.key,
      }, widgetDataToSave));

      commit(mutationTypes.SET_WIDGET, newWidget);

    },

    saveWidget(context, widget) {
      return new Promise((resolve, reject) => {
        firebaseService.database.ref('widgets').push(widget).then(resolve).catch(reject);
      });
    },
  };
}
