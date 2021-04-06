import { LOADER_SHOW, LOADER_HIDE, LOADER_DISPLAY, LOADER_REMOVE } from '../types';

const INITIAL_STATE = {
  loader: false,
  loaderDisplay: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADER_SHOW:
      state.loader = action.payload;
      return Object.assign({}, state);

    case LOADER_HIDE:
      state.loader = action.payload;
      return Object.assign({}, state);


    case LOADER_DISPLAY:
      state.loaderDisplay = action.payload;
      return Object.assign({}, state);

    case LOADER_REMOVE:
      state.loaderDisplay = action.payload;
      return Object.assign({}, state);

    default:
      return state;
  }
};
