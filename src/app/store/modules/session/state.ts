import User from 'app/models/User';

export default class SessionModuleStore {
  public user: User = null;
  public isLoading = false;
  public isLoaded = false;
}
