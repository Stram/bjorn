import User from 'models/User';
import {warn} from 'services/logger';
import * as mutationTypes from 'store/mutation-types';

export default function createActions({firebaseService}) {
  return {
    async login({commit}) {
      commit(mutationTypes.AUTHENTIFICATION_START);

      let result;
      try {
        result = await firebaseService.auth.signInWithPopup(firebaseService.googleAuthProvider);
      } catch (error) {
        warn('Error during authentification', error);
        commit(mutationTypes.AUTHENTIFICATION_FAIL, error);
        return;
      }

      const token = result.credential.accessToken;
      commit(mutationTypes.SET_TOKEN, token);

      const user = User.createFromResponse(result.user);
      commit(mutationTypes.SET_USER, user);

      commit(mutationTypes.AUTHENTIFICATION_SUCCESS);
    },

    async logout({commit}) {
      await firebaseService.auth.signOut();
      commit(mutationTypes.RESET_SESSION);
    },

    check({commit}) {
      commit(mutationTypes.AUTHENTIFICATION_START);
      return firebaseService.checkSession().then((data) => {
        const user = User.createFromResponse(data.user);
        commit(mutationTypes.SET_USER, user);
        commit(mutationTypes.AUTHENTIFICATION_SUCCESS);
        return data;
      });
    },
  };
}
