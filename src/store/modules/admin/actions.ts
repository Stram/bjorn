import { ActionContext } from 'vuex';

import Dashboard from 'models/Dashboard';
import FirebaseService from 'services/firebase';
import * as mutationTypes from 'store/mutation-types';

import State from './state';

interface ISessionModuleActionOptions {
  firebaseService: FirebaseService;
}

export default function createActions({ firebaseService }: ISessionModuleActionOptions) {
  return {
    fetchDashboards({ commit }: ActionContext<State, any>) {
      commit(mutationTypes.DASHBOARDS_START_LOADING);
      return new Promise((resolve, reject) => {
        firebaseService.database.ref('dashboards').once('value').then((dashboardsData) => {
          const dashboards: Array<Dashboard> = [];
          dashboardsData.forEach((dashboardData: any) => {
            const data: any = dashboardData.toJSON();
            dashboards.push(new Dashboard({
              createdAt: data.createdAt,
              uid: dashboardData.key,
            }));
            return false;
          });
          commit(mutationTypes.SET_DASHBAORDS, dashboards);
          commit(mutationTypes.DASHBOARDS_LOADED);
          resolve();
        }).catch(reject);
      });
    },

    saveDashboard({ commit }: ActionContext<State, any>, dashboard: Dashboard) {
      return new Promise((resolve, reject) => {
        firebaseService.database.ref('dashboards').push(dashboard).then(resolve).catch(reject);
      });
    },

    startDashboardSync({ commit, state, getters }: ActionContext<State, any>, dashboardId: string) {
      commit(mutationTypes.DASHBOARDS_START_LOADING);
      return new Promise((resolve) => {
        firebaseService.database.ref(`dashboards/${dashboardId}`).on('value', (dashboardData) => {
          const data: any = dashboardData.toJSON();
          const newDashboard = new Dashboard({
            createdAt: data.createdAt,
            uid: dashboardData.key,
          });
          commit(mutationTypes.SET_DASHBAORD, newDashboard);
          commit(mutationTypes.DASHBOARDS_LOADED);
          resolve();
        });
      });
    },
  };
}
