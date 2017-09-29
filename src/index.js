import Vue from 'vue';
import PortalVue from 'portal-vue';
import VueForm from 'vue-form';

import 'app/styles/index.scss';

import App from 'components/App.vue';
import {firebaseConfig} from 'config';
import {createRouter} from 'router';
import FirebaseService from 'services/firebase';
import QueriesService from 'services/queries';
import {createStore} from 'store';

const firebaseService = new FirebaseService(firebaseConfig);
const queriesService = new QueriesService(firebaseService);

const store = createStore({firebaseService, queriesService});
const router = createRouter({store});

Vue.use(PortalVue);
Vue.use(VueForm);

const app = new Vue({
  render: (h) => h(App),
  router,
  store,
});

app.$mount('#app');
