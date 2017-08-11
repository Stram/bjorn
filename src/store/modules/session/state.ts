import User from 'models/User';

export default class SessionModuleStore {
  public user: User = null;
  public isLoading = false;
  public isLoaded = false;
  public token = '';
  public errorMessage: string = null;
}
