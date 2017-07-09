import {createDashboardApp} from 'apps/dashboard';
import {APP_ROOT_ID} from 'apps/dashboard/config';

const {app} = createDashboardApp();

// TODO: if element exists
app.$mount(`#${APP_ROOT_ID}`);
