import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import pages from 'app/pages';

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [{
      path: '/',
      component: pages.Dashboard,
      name: 'Dashboard',
    }, {
      path: '*',
      component: pages.Dashboard,
      name: 'Not Found'
    }]
  });
}