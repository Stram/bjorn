import Vue from 'vue';
import Router from 'vue-router';
import {Store} from 'vuex';

import Admin from 'pages/Admin.vue';
import AdminDashboard from 'pages/admin/Dashboard.vue';
import AdminWidgetNew from 'pages/admin/widget/New.vue';
import Dashboard from 'pages/Dashboard.vue';
import Login from 'pages/Login.vue';

Vue.use(Router);

export interface IRouterOptions {
  store: Store<any>;
}

export enum pages {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  ADMIN_DASHBOARD_INDEX = 'dashboardIndex',
  ADMIN = 'admin',
  ADMIN_WIDGET_NEW = 'adminWidgetNew',
  NOT_FOUND = 'notFound',
}

export function createRouter({store}: IRouterOptions) {
  const router = new Router({
    mode: 'history',
    routes: [{
      alias: '/',
      children: [{
        children: [{
          component: AdminWidgetNew,
          meta: {
            authenticatedRoute: true,
          },
          name: pages.ADMIN_WIDGET_NEW,
          path: 'widget/new',
        }],
        component: AdminDashboard,
        meta: {
          authenticatedRoute: true,
        },
        name: pages.ADMIN_DASHBOARD_INDEX,
        path: 'dashboard/:dashboardId',
      }],
      component: Admin,
      meta: {
        authenticatedRoute: true,
      },
      name: pages.ADMIN,
      path: '/admin',
      beforeEnter(to, from, next) {
        if (!store.state.admin.dashboards.isLoaded) {
          store.dispatch('admin/fetchDashboards').then(() => {
            const dashboards = store.getters['admin/dashboards'];
            if (dashboards.length) {
              next({
                name: pages.ADMIN_DASHBOARD_INDEX,
                params: {
                  dashboardId: dashboards[0].uid,
                },
              });
            } else {
              next();
            }
          });
        } else {
          next();
        }
      },
    }, {
      component: Dashboard,
      meta: {
        authenticatedRoute: true,
      },
      name: pages.DASHBOARD,
      path: '/dashboard',
    }, {
      component: Login,
      name: pages.LOGIN,
      path: '/login',
    }, {
      component: Dashboard,
      name: pages.NOT_FOUND,
      path: '*',
    }],
  });

  router.beforeEach((to, from, next) => {
    if (to.meta.authenticatedRoute && !store.getters['session/isAuthenticated']) {
      store.dispatch('session/check').then(() => {
        next();
      }).catch((error) => {
        if (error.user === null) {
          next({
            name: pages.LOGIN,
          });
        } else {
          throw error;
        }
      });
    } else {
      next();
    }
  });

  return router;
}
