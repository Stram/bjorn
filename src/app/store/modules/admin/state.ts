import Dashboard from 'app/models/Dashboard';

function setInitialData<T>() {
  return {
    data: [],
    isLoaded: false,
    isLoading: false,
  } as ICollection<T>;
}

interface ICollection<T> {
  data: Array<T>;
  isLoaded: boolean;
  isLoading: boolean;
}

export default class SessionModuleStore {
  public dashboards: ICollection<Dashboard> = setInitialData<Dashboard>();
}
