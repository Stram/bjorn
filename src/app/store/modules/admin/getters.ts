import Dashboard from 'app/models/Dashboard';

import State from './state';

export function dashboards(state: State): Array<Dashboard> {
  return state.dashboards.data;
}

export default {
  dashboards,
};
