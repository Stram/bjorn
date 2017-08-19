import Vue from 'vue';
import Vuex from 'vuex';

import createAdminStoreModule from 'store/modules/admin';
import createSessionModule from 'store/modules/session';
import UIStoreModule from 'store/modules/ui';

import * as mutationTypes from 'store/mutation-types';

import getters from './getters';

Vue.use(Vuex);

export function createStore({firebaseService}) {
  const store = new Vuex.Store({
    actions: {},
    getters,
    modules: {
      admin: createAdminStoreModule({firebaseService}),
      session: createSessionModule({firebaseService}),
      ui: UIStoreModule,
    },
    mutations: {},
    state: {},
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
