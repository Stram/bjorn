import Dashboard from 'models/Dashboard';

export default class Queries {
  constructor(firebaseService) {
    this.firebaseService = firebaseService;
  }

  dashboards() {
    return new Promise((resolve, reject) => {
      this.firebaseService.database.ref('dashboards').once('value').then((dashboardsData) => {
        const dashboards = [];
        dashboardsData.forEach((dashboardData) => {
          const data = dashboardData.toJSON();
          const dashboard = Dashboard.createFromResponse(Object.assign(data, {id: dashboardData.key}));
          dashboards.push(dashboard);
          return false;
        });

        resolve(dashboards);
      }, reject);
    });
  }
}
