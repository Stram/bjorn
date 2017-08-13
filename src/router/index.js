import Vue from 'vue';
import Router from 'vue-router';

import Admin from 'pages/Admin.vue';
import AdminDashboard from 'pages/admin/Dashboard.vue';
import AdminWidgetNew from 'pages/admin/widget/New.vue';
import Dashboard from 'pages/Dashboard.vue';
import Login from 'pages/Login.vue';

Vue.use(Router);

export const pages = {
  LOGIN: 'login',
  DASHBOARD: 'dashboard',
  ADMIN_DASHBOARD_INDEX: 'dashboardIndex',
  ADMIN: 'admin',
  ADMIN_WIDGET_NEW: 'adminWidgetNew',
  NOT_FOUND: 'notFound',
};

export function createRouter({store}) {

  function loadDashboardBeforeEnter(to, from, next) {
    if (!store.state.admin.dashboards.isLoaded) {
      store.dispatch('admin/fetchDashboards').then(() => {
        const dashboards = store.getters['admin/dashboards'];
        if (dashboards.length) {
          next({
            name: pages.ADMIN_DASHBOARD_INDEX,
            params: {
              dashboardId: dashboards[0].id,
            },
          });
        } else {
          next();
        }
      });
    } else {
      next();
    }
  }

  const router = new Router({
    mode: 'history',
    routes: [{
      path: '/admin',
      alias: '/',
      name: pages.ADMIN,
      component: Admin,
      meta: {authenticatedRoute: true},
      beforeEnter: loadDashboardBeforeEnter,
    }, {
      path: '/admin/dashboard/:dashboardId',
      name: pages.ADMIN_DASHBOARD_INDEX,
      component: AdminDashboard,
      meta: {authenticatedRoute: true},
      beforeEnter: loadDashboardBeforeEnter,
      children: [{
        path: 'widget/new',
        name: pages.ADMIN_WIDGET_NEW,
        component: AdminWidgetNew,
        meta: {authenticatedRoute: true},
      }],
    }, {
      path: '/dashboard',
      name: pages.DASHBOARD,
      component: Dashboard,
      meta: {authenticatedRoute: true},
    }, {
      path: '/login',
      name: pages.LOGIN,
      component: Login,
    }, {
      path: '*',
      name: pages.NOT_FOUND,
      component: Dashboard,
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
