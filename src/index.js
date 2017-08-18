import Vue from 'vue';
import PortalVue from 'portal-vue';
import VueForm from 'vue-form';

import 'app/styles/index.scss';

import App from 'components/App.vue';
import {firebaseConfig} from 'config';
import {createRouter} from 'router';
import FirebaseService from 'services/firebase';
import {createStore} from 'store';

const firebaseService = new FirebaseService(firebaseConfig);

const store = createStore({firebaseService});
const router = createRouter({store});

Vue.use(PortalVue);
Vue.use(VueForm);

const app = new Vue({
  render: (h) => h(App),
  router,
  store,
});

router.onReady(() => {
  app.$mount('#app');
});
