import Vue from 'vue';

import 'app/styles/index.scss';

import App from 'app/components/App.vue';
import {firebaseConfig} from 'app/config';
import User from 'app/models/User';
import {createRouter, pages} from 'app/router';
import FirebaseService from 'app/services/firebase';
import {createStore} from 'app/store';
import * as mutationTypes from 'app/store/mutation-types';

export function createApp() {
  const firebaseService = new FirebaseService(firebaseConfig);

  const store = createStore({firebaseService});
  const router = createRouter({store, firebase: firebaseService});

  firebaseService.onLogin(async (user) => {
    const { email, displayName, photoURL, uid } = user;
    store.commit(`session/${mutationTypes.SET_USER}`, new User({email, name: displayName, photoURL, uid}));
    store.commit(`session/${mutationTypes.AUTHENTIFICATION_SUCCESS}`);
    router.push({
      name: pages.ADMIN,
    });
  });

  firebaseService.onLogout(() => {
    router.push({
      name: pages.LOGIN,
    });
  });

  Vue.use({
    install(vue, options) {
      vue.prototype.$firebase = firebaseService;
    },
  });

  const app = new Vue({
    render: (h: any) => h(App),
    router,
    store,
  });

  return {app, router};
}
