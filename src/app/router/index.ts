import Vue from 'vue';
import Router from 'vue-router';
import {Store} from 'vuex';

import * as pageComponents from 'app/pages';
import firebaseService from 'app/services/firebase';

Vue.use(Router);

export interface IRouterOptions {
  store: Store<any>;
  firebase: firebaseService;
}

export enum pages {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  ADMIN = 'admin',
  NOT_FOUND = 'notFound',
}

export function createRouter({store, firebase}: IRouterOptions) {
  const router = new Router({
    mode: 'history',
    routes: [{
      alias: '/admin',
      component: pageComponents.Admin,
      meta: {
        authenticatedRoute: true,
      },
      name: pages.ADMIN,
      path: '/',
    }, {
      component: pageComponents.Dashboard,
      meta: {
        authenticatedRoute: true,
      },
      name: pages.DASHBOARD,
      path: '/dashboard',
    }, {
      component: pageComponents.Login,
      name: pages.LOGIN,
      path: '/login',
    }, {
      component: pageComponents.Dashboard,
      name: pages.NOT_FOUND,
      path: '*',
    }],
  });

  router.beforeEach((to, from, next) => {
    if (to.meta.authenticatedRoute && !store.getters['session/isAuthenticated']) {
      next({
        name: pages.LOGIN,
      });
    } else {
      next();
    }
  });

  return router;
}
