import Vue from 'vue';

import App from 'app/components/App.vue';
import {firebaseConfig} from 'app/config';
import {createRouter} from 'app/router';
import FirebaseService from 'app/services/firebase';
import {createStore} from 'app/store';

export function createApp() {
  const firebaseService = new FirebaseService(firebaseConfig);

  const store = createStore({firebaseService});
  const router = createRouter({store});

  const app = new Vue({
    render: (h: any) => h(App),
    router,
    store,
  });

  return {app, router};
}
