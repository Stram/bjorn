import Dashboard from 'models/Dashboard';
import Widget from 'models/Widget';
import * as mutationTypes from 'store/mutation-types';

export default function createActions({firebaseService}) {
  function saveResource(resourceName, resource) {
    return new Promise((resolve, reject) => {
      if (resource.id) {
        firebaseService.database.ref(`${resourceName}/${resource.id}`).set(resource).then(resolve).catch(reject);
      } else {
        firebaseService.database.ref(resourceName).push(resource).then(resolve).catch(reject);
      }
    });
  }

  function fetchResource(resourceName, resourceId) {
    return new Promise((resolve, reject) => {
      firebaseService.database.ref(`${resourceName}/${resourceId}`).once('value').then(resolve).catch(reject);
    });
  }

  return {
    fetchDashboard({commit}, dashboardId) {
      commit(mutationTypes.DASHBOARDS_START_LOADING);
      return fetchResource('dashboards', dashboardId)
        .then((response) => {
          const jsonResponse = response.toJSON();
          const dashboard = Dashboard.createFromResponse(Object.assign(jsonResponse, {id: response.key}));
          commit(mutationTypes.SET_DASHBAORD, dashboard);
          commit(mutationTypes.DASHBOARDS_LOADED);
          return dashboard;
        });
    },

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
      return saveResource('dashboards', dashboard);
    },

    async createNewDashboard({commit, dispatch}, data) {
      const {createdAt, width, height} = data;
      const dashboardDataToSave = {
        createdAt,
        width, height
      };
      const dashboardResponse = await dispatch('saveDashboard', dashboardDataToSave);
      const dashboard = new Dashboard(Object.assign({
        id: dashboardResponse.key,
      }, dashboardDataToSave));

      commit(mutationTypes.SET_DASHBAORD, dashboard);
      return dashboard;
    },

    async createNewWidget({commit, dispatch}, data) {
      const {x, y, width, height, dashboard, type} = data;
      const widgetDataToSave = {
        x, y,
        width, height,
        type,
      };

      const widgetResponse = await dispatch('saveWidget', widgetDataToSave);
      const widget = new Widget(Object.assign({
        id: widgetResponse.key,
      }, widgetDataToSave));

      commit(mutationTypes.SET_WIDGET, widget);
      dashboard.widgets.push(widget.id);
      await dispatch('saveDashboard', dashboard);
      commit(mutationTypes.SET_DASHBAORD, dashboard);
      return widget;
    },

    saveWidget(context, widget) {
      return saveResource('widgets', widget);
    },

    fetchWidget({commit}, widgetId) {
      commit(mutationTypes.WIDGETS_START_LOADING);
      return fetchResource('widgets', widgetId)
        .then((response) => {
          const jsonResponse = response.toJSON();
          const widget = Widget.createFromResponse(Object.assign(jsonResponse, {id: response.key}));
          commit(mutationTypes.SET_WIDGET, widget);
          commit(mutationTypes.WIDGETS_LOADED);
          return widget;
        });
    },

    getWidget({state}, widgetId) {
      return state.widgets.data[widgetId];
    }
  };
}
