import Vue from 'vue';
import Vuex from 'vuex';

import firebaseService from 'app/services/firebase';
import SessionStoreModule from 'app/store/modules/session';

Vue.use(Vuex);

export interface IStoreOptions {
  firebaseService: firebaseService;
}

export function createStore({firebaseService}: IStoreOptions) {
  return new Vuex.Store({
    actions: {},
    getters: {},
    modules: {
      session: new SessionStoreModule(),
    },
    mutations: {},
    state: {},
  });
}
