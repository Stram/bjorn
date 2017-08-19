import Vue from 'vue';
import Vuex from 'vuex';

import createAdminStoreModule from 'store/modules/admin';
import createSessionModule from 'store/modules/session';
import UIStoreModule from 'store/modules/ui';

import * as mutationTypes from 'store/mutation-types';

import createActions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

export function createStore({firebaseService}) {
  const store = new Vuex.Store({
    modules: {
      admin: createAdminStoreModule({firebaseService}),
      session: createSessionModule({firebaseService}),
      ui: UIStoreModule,
    },
    actions: createActions({firebaseService}),
    getters,
    mutations,
    state,
  });

  function onResize() {
    store.commit(`ui/${mutationTypes.SET_WINDOW_SIZE}`, {
      height: window.document.body.clientHeight,
      width: window.document.body.clientWidth,
    });
  }

  onResize();
  // TODO: Debounce
  window.addEventListener('resize', onResize);

  return store;
}
