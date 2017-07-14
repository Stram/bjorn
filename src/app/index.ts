import Vue from 'vue';

import App from 'app/components/App.vue';
import {createRouter} from 'app/router';
import {createStore} from 'app/store';
import {firebaseConfig} from 'app/config';
import FirebaseService from 'app/services/firebase';

export function createApp() {
  const firebaseService = new FirebaseService(firebaseConfig);

  const router = createRouter();
  const store = createStore({firebaseService});

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });

  return {app, router};
}
