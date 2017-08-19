import * as mutationTypes from 'store/mutation-types';

export default {
  [mutationTypes.SET_WINDOW_SIZE](state, windowSize) {
    state.windowWidth = windowSize.width;
    state.windowHeight = windowSize.height;
  },
};
