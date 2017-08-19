import createActions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export default function createSessionModule({firebaseService}) {
  return {
    namespaced: true,
    state,
    mutations,
    getters,
    actions: createActions({firebaseService}),
  };
}
