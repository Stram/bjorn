import * as mutationTypes from 'store/mutation-types';

import State from './state';

interface IWindowSize {
  width: number;
  height: number;
}

export default {
  [mutationTypes.SET_WINDOW_SIZE](state: State, windowSize: IWindowSize) {
    state.windowWidth = windowSize.width;
    state.windowHeight = windowSize.height;
  },
};
