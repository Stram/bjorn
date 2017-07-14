import Vue from 'vue';
import Vuex from 'vuex';

import firebaseService from 'app/services/firebase';
import SessionStoreModule from 'app/store/modules/session';

Vue.use(Vuex);

export interface storeOptions {
  firebaseService: firebaseService
}

export function createStore({firebaseService}: storeOptions) {
  console.log(firebaseService);
  
  return new Vuex.Store({
    modules: {
      session: new SessionStoreModule(),
    },
    state: {},
    actions: {},
    mutations: {},
    getters: {}
  });
}