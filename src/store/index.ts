import Vue from 'vue';
import Vuex from 'vuex';

import FirebaseServiceClass from 'services/firebase';
import createAdminStoreModule from 'store/modules/admin';
import createSessionModule from 'store/modules/session';
import UIStoreModule from 'store/modules/ui';
import * as mutationTypes from 'store/mutation-types';

import getters from './getters';
import State from './state';

Vue.use(Vuex);

export interface IStoreOptions {
  firebaseService: FirebaseServiceClass;
}

export function createStore({ firebaseService }: IStoreOptions) {
  const store = new Vuex.Store({
    actions: {},
    getters,
    modules: {
      admin: createAdminStoreModule({firebaseService}),
      session: createSessionModule({firebaseService}),
      ui: UIStoreModule,
    },
    mutations: {},
    state: new State(),
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
