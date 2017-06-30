import * as Vue from 'vue';

import App from './components/App.vue';

export default function createDashboardApp() {
  const app = new Vue({
    // TODO: Vue options
    render: (h) => h(App)
  });

  return {app};
}
