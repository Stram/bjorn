import State from './state';

export function isLoading(state: State, getters: any) {
  return getters['admin/isLoading'] || getters['session/isLoading'];
}

export default {
  isLoading,
};
