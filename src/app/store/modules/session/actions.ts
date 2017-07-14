import {ActionTree, ActionContext} from 'vuex'
import State from './state'

export function login(store: ActionContext<State, any>) {
  // TODO: Do login
}

export default <ActionTree<State, any>> {
  login
}