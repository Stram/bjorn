import { ActionContext } from 'vuex';

import Dashboard from 'app/models/Dashboard';
import FirebaseService from 'app/services/firebase';
import * as mutationTypes from 'app/store/mutation-types';

import State from './state';

interface ISessionModuleActionOptions {
  firebaseService: FirebaseService;
}

export default function createActions({ firebaseService }: ISessionModuleActionOptions) {
  return {
    startDashboardSync({ commit }: ActionContext<State, any>) {
      commit(mutationTypes.DASHBOARDS_START_LOADING);
      return new Promise((resolve) => {
        firebaseService.database.ref('dashboards').on('value', (dashboardsData) => {
          commit(mutationTypes.DASHBOARDS_LOADED);
          const dashboards: Array<Dashboard> = [];
          dashboardsData.forEach((dashboardData) => {
            const data: any = dashboardData.toJSON();
            dashboards.push(new Dashboard({
              createdAt: data.createdAt,
              uid: dashboardData.key,
            }));
            return false;
          });
          commit(mutationTypes.SET_DASHBAORDS, dashboards);
          resolve();
        });
      });
    },

    saveDashboard({ commit }: ActionContext<State, any>, dashboard: Dashboard) {
      return new Promise((resolve, reject) => {
        firebaseService.database.ref('dashboards').push(dashboard).then(resolve).catch(reject);
      });
    },
  };
}
