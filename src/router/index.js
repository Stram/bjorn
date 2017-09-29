import Vue from 'vue';
import Router from 'vue-router';

import Index from 'pages/Index.vue';
import Login from 'pages/Login.vue';
import Admin from 'pages/Admin.vue';
import Dashboards from 'pages/Dashboards.vue';

import AdminDashboard from 'pages/admin/Dashboard.vue';
import AdminWidgetNew from 'pages/admin/widget/New.vue';
import AdminWidgetOptions from 'pages/admin/widget/Options.vue';

import RouterViewProxy from 'pages/RouterViewProxy.vue';
import {START_LOADING, END_LOADING} from 'store/mutation-types';

Vue.use(Router);

export const pages = {
  INDEX: 'index',
  LOGIN: 'login',
  ADMIN: 'admin',
  DASHBOARDS: 'dashboards',
  DASHBOARD: 'dashboard',
  ADMIN_DASHBOARD_WIDGET_INDEX: 'dashboardWidgetIndex',
  ADMIN_DASHBOARD_WIDGET_OPTIONS: 'dashboardWidgetOptions',
  ADMIN_WIDGET_NEW: 'adminWidgetNew',
  NOT_FOUND: 'notFound',
};

export function createRouter({store}) {
  const router = new Router({
    mode: 'history',
    routes: [{
      path: '/admin',
      redirect: {name: pages.DASHBOARDS},
      name: pages.ADMIN,
      component: Admin,
      meta: {authenticatedRoute: true},
      children: [{
        path: 'dashboards',
        name: pages.DASHBOARDS,
        component: Dashboards,
        beforeEnter(to, from, next) {
          store.dispatch('fetchDashboards').then(next, next);
        }
      }]

    }, {
      path: '/admin/dashboard/:dashboardId',
      name: pages.DASHBOARD,
      component: AdminDashboard,
      meta: {authenticatedRoute: true},
      beforeEnter(to, from, next) {
        store.dispatch('admin/fetchDashboard', to.params.dashboardId).then((dashboard) => {
          const promises = dashboard.widgets.map((widgetId) => store.dispatch('admin/fetchWidget', widgetId));
          return Promise.all(promises);
        }).then(() => {
          next();
        });
      },
      children: [{
        path: 'widget/new',
        name: pages.ADMIN_WIDGET_NEW,
        component: AdminWidgetNew,
        meta: {authenticatedRoute: true},
      }, {
        path: 'widget/:widgetId',
        name: pages.ADMIN_DASHBOARD_WIDGET_INDEX,
        component: RouterViewProxy,
        meta: {authenticatedRoute: true},
        children: [{
          path: 'options',
          name: pages.ADMIN_DASHBOARD_WIDGET_OPTIONS,
          component: AdminWidgetOptions,
          meta: {authenticatedRoute: true},
        }]
      }],
    }, {
      path: '/dashboard',
      name: pages.INDEX,
      component: Index,
      meta: {authenticatedRoute: true},
      beforeEnter(to, from, next) {
        const startDashboardsSync = store.dispatch('startDashboardsSync');
        const startWidgetsSync = store.dispatch('startWidgetsSync');
        Promise.all([startDashboardsSync, startWidgetsSync]).then(() => {
          next();
        });
      }
    }, {
      path: '/login',
      name: pages.LOGIN,
      component: Login,
    }, {
      path: '*',
      name: pages.NOT_FOUND,
      component: Index,
    }],
  });

  router.beforeEach((to, from, next) => {
    store.commit(START_LOADING);
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

  router.afterEach(() => {
    store.commit(END_LOADING);
  });

  return router;
}
