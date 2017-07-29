import User from 'app/models/User';

import State from './state';

export function currentUser(state: State): User {
  return state.user;
}

export function isAuthenticated(state: State): boolean {
  return state.isLoaded && !state.isLoading && Boolean(state.user);
}

export default {
  currentUser,
  isAuthenticated,
};
