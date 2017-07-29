import Vue from 'vue';
import Vuex from 'vuex';

import FirebaseServiceClass from 'app/services/firebase';
import SessionStoreModule from 'app/store/modules/session';

Vue.use(Vuex);

export interface IStoreOptions {
  firebaseService: FirebaseServiceClass;
}

export function createStore({firebaseService}: IStoreOptions) {
  return new Vuex.Store({
    actions: {},
    getters: {},
    modules: {
      session: new SessionStoreModule({firebaseService}),
    },
    mutations: {},
    state: {},
  });
}
