import { ActionContext } from 'vuex';

// import Dashboard from 'app/models/Dashboard';
import FirebaseService from 'app/services/firebase';
// import * as mutationTypes from 'app/store/mutation-types';

import State from './state';

interface ISessionModuleActionOptions {
  firebaseService: FirebaseService;
}

export default function createActions({ firebaseService }: ISessionModuleActionOptions) {
  return {
    async startDashboardSync({ commit }: ActionContext<State, any>) {
      firebaseService.database.ref('dashboards').on('value', (dashboards) => {
        dashboards.forEach((dashboard) => {
          console.log('dashboard: ', dashboard);
          return false;
        });
      });
    },
  };
}
