import Vue from 'vue';

import 'app/styles/index.scss';

import App from 'components/App.vue';
import {firebaseConfig} from 'config';
import {createRouter} from 'router';
import FirebaseService from 'services/firebase';
import {createStore} from 'store';

const firebaseService = new FirebaseService(firebaseConfig);

const store = createStore({firebaseService});
const router = createRouter({store});

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
