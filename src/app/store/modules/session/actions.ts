import {ActionContext} from 'vuex';

import User from 'app/models/User';
import FirebaseService from 'app/services/firebase';
import {warn} from 'app/services/logger';
import * as mutationTypes from 'app/store/mutation-types';

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
        warn('Error during authentificationo', error);
        commit(mutationTypes.AUTHENTIFICATION_FAIL, error);
        return;
      }

      const token = result.credential.accessToken;
      commit(mutationTypes.SET_TOKEN, token);

      const {email, displayName, photoURL, uid} = result.user;
      const user = new User({
        email,
        name: displayName,
        photoURL,
        uid,
      });
      commit(mutationTypes.SET_USER, user);

      commit(mutationTypes.AUTHENTIFICATION_SUCCESS);
    },

    async logout({ commit }: ActionContext<State, any>) {
      await firebaseService.auth.signOut();
      commit(mutationTypes.RESET_SESSION);
    },
  };
}
