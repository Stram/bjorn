import Dashboard from 'models/Dashboard';
import Widget from 'models/Widget';
import * as mutationTypes from 'store/mutation-types';

import State from './state';

export default function createActions({ firebaseService }) {
  return {
    fetchDashboards({ commit }) {
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

    saveDashboard({ commit }, dashboard) {
      return new Promise((resolve, reject) => {
        firebaseService.database.ref('dashboards').push(dashboard).then((dashboardData) => {
          return dashboardData;
        }).catch(reject);
      });
    },

    async createNewWidget({ commit, dispatch }, data) {
      const { x, y, width, height, dashboard, type } = data;
      const widgetDataToSave = {
        x, y,
        width, height,
        type,
      }

      const widgetResponse = await dispatch('saveWidget', widgetDataToSave);
      const newWidget = new Widget(Object.assign({
        id: widgetResponse.key,
      }, widgetDataToSave));

      commit(mutationTypes.SET_WIDGET, newWidget);
    },

    saveWidget({ commit }, widget) {
      return new Promise((resolve, reject) => {
        firebaseService.database.ref('widgets').push(widget).then(resolve).catch(reject);
      });
    },
  };
}
