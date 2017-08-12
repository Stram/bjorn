import {ActionContext} from 'vuex';

import User from 'models/User';
import FirebaseService from 'services/firebase';
import {warn} from 'services/logger';
import * as mutationTypes from 'store/mutation-types';

import State from './state';

interface ISessionModuleActionOptions {
  firebaseService: FirebaseService;
}

export default function createActions({firebaseService}: ISessionModuleActionOptions) {
  return {
    async login({ commit }: ActionContext<State, any>) {
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

    async logout({ commit }: ActionContext<State, any>) {
      await firebaseService.auth.signOut();
      commit(mutationTypes.RESET_SESSION);
    },

    check({ commit }: ActionContext<State, any>) {
      commit(mutationTypes.AUTHENTIFICATION_START);
      firebaseService.checkSession().then((data) => {
        const user = User.createFromResponse(data.user);
        commit(mutationTypes.SET_USER, user);
        commit(mutationTypes.AUTHENTIFICATION_SUCCESS);
        return data;
      });
    },
  };
}
