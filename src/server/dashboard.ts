import {createDashboardApp} from '../apps/dashboard';

export default () => {
  const {app} = createDashboardApp();
  return app;
}
