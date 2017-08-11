import Vue from 'vue';

import 'app/styles/index.scss';

import App from 'components/App.vue';
import {firebaseConfig} from 'config';
import User from 'models/User';
import {createRouter, pages} from 'router';
import FirebaseService from 'services/firebase';
import {createStore} from 'store';
import * as mutationTypes from 'store/mutation-types';

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
  store.commit(`session/${mutationTypes.SET_USER}`, null);
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

router.onReady(() => {
  app.$mount('#app');
});
