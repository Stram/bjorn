import Vue from 'vue';
import Vuex from 'vuex';

import FirebaseServiceClass from 'app/services/firebase';
import AdminStoreModule from 'app/store/modules/admin';
import SessionStoreModule from 'app/store/modules/session';

Vue.use(Vuex);

export interface IStoreOptions {
  firebaseService: FirebaseServiceClass;
}

export function createStore({ firebaseService }: IStoreOptions) {
  return new Vuex.Store({
    actions: {},
    getters: {},
    modules: {
      admin: new AdminStoreModule({ firebaseService }),
      session: new SessionStoreModule({ firebaseService }),
    },
    mutations: {},
    state: {},
  });
}
