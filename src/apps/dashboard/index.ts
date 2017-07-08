import Vue from 'vue';

import App from './components/App.vue';

export function createDashboardApp() {
  const app = new Vue({
    // TODO: Vue options
    render: (h) => h(App),
  });

  return {app};
}
