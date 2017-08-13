import Dashboard from 'models/Dashboard';
import Widget from 'models/Widget';

function setInitialData() {
  return {
    data: {},
    isLoaded: false,
    isLoading: false,
  };
}

export default {
  dashboards: setInitialData(),
  widgets: setInitialData(),
}
