import state from './state';
import mutations from './mutations';
import actions from './actions';

export default function({localStorageService}) {
  return {
    namespaced: true,
    state,
    mutations,
    actions: actions({localStorageService})
  };
}
