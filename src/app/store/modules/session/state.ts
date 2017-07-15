import User from 'app/models/User';

export default class SessionModuleStore {
  user: User = null;
  isLoading = false;
  isLoaded = false;
  
}