import Dashboard from 'app/models/Dashboard';

export default class SessionModuleStore {
  public dashboards: Array<Dashboard> = [];
  public isLoading = false;
  public isLoaded = false;
}
