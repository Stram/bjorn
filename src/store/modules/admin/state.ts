import Dashboard from 'models/Dashboard';
import Widget from 'models/Widget';

function setInitialData<T>() {
  return {
    data: {},
    isLoaded: false,
    isLoading: false,
  } as ICollection<T>;
}

interface ICollection<T> {
  data: {[key: string]: T};
  isLoaded: boolean;
  isLoading: boolean;
}

export default class SessionModuleStore {
  public dashboards: ICollection<Dashboard> = setInitialData<Dashboard>();
  public widgets: ICollection<Widget> = setInitialData<Widget>();
}
