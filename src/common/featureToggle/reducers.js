import {
    GET_FEATURE_TOGGLE_LIST,
} from './constants';
import {
    setLocalStorage,
  } from '../commonFunctions';
  import * as R from 'ramda';  
const INITIAL_STATE = {
    featureToggle: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_FEATURE_TOGGLE_LIST: {
            setLocalStorage('featureToggle', R.pathOr({},['payload','data'],action));
            return state;
        }
        default:
            return state;
    }
};
