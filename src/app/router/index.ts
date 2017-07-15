import Vue from 'vue';
import Router from 'vue-router';
import {Store} from 'vuex';

import pageComponents from 'app/pages';

Vue.use(Router);

export interface IRouterOptions {
  store: Store<any>;
}

enum pages {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  NOT_FOUND = 'notFound',
}

export function createRouter({store}: IRouterOptions) {
  const router = new Router({
    mode: 'history',
    routes: [{
      component: pageComponents.Dashboard,
      meta: {
        authenticatedRoute: true,
      },
      name: pages.DASHBOARD,
      path: '/',
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
    if (to.meta.authenticatedRoute && store.getters['session/isAuthenticated']) {
      if (!store.state.session.isLoaded) {
        // TODO: Check session
      } else {
        next({
          name: pages.LOGIN,
        });
      }
    } else {
      next();
    }
  });

  return router;
}
