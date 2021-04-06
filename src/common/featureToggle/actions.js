import {
    GET_FEATURE_TOGGLE_LIST,
  } from './constants';
  import {
    removeLocalStorage,
  } from '../commonFunctions';
  import ocraApiService from '../../common/core/api/apiService';
  
  export const actionGetFeatureToggleList = data => {
    removeLocalStorage('featureToggle');
    const request = ocraApiService('getFeatureToggleList', data);
    return {
      type: GET_FEATURE_TOGGLE_LIST,
      payload: request
    };
  };
 
  
  