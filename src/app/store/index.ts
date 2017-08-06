import Vue from 'vue';
import Vuex from 'vuex';

import FirebaseServiceClass from 'app/services/firebase';
import AdminStoreModule from 'app/store/modules/admin';
import SessionStoreModule from 'app/store/modules/session';
import UIStoreModule from 'app/store/modules/ui';
import * as mutationTypes from 'app/store/mutation-types';

import { isClient } from 'app/config';

Vue.use(Vuex);

export interface IStoreOptions {
  firebaseService: FirebaseServiceClass;
}

export function createStore({ firebaseService }: IStoreOptions) {
  const store = new Vuex.Store({
    actions: {},
    getters: {},
    modules: {
      admin: new AdminStoreModule({ firebaseService }),
      session: new SessionStoreModule({ firebaseService }),
      ui: new UIStoreModule(),
    },
    mutations: {},
    state: {},
  });

  function onResize() {
    store.commit(`ui/${mutationTypes.SET_WINDOW_SIZE}`, {
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }

  if (isClient) {
    onResize();
    // TODO: Debounce
    window.addEventListener('resize', onResize);
  }

  return store;
}
