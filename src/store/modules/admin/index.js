import createActions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export default function createAdminStoreModule({firebaseService}) {
  return {
    namespaced: true,
    actions: createActions({firebaseService}),
    getters,
    mutations,
    state,
  };
}
