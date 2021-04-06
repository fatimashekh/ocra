import {
  GET_DEPARTMENT_LIST, GET_CLASSIFICATION, SET_BOOKMARK_ID,
  GET_NAVIGATION_ITEM_SUCCESS,
  SET_TAB_KEY, MENU_TOGGLE, BLANK_NAVIGATION_ITEM
} from './types';
import {
  setLocalStorage
} from '../../common/commonFunctions';
import Cryptr from 'cryptr';
import CONSTANTS from "../../common/core/config/appConfig";
import _ from 'lodash';
const INITIAL_STATE = {
  projectList: [], navigationItem: [], navigationId: '', saveNavigationItem: []
};
const cryptr = new Cryptr(CONSTANTS.CRYPTER_KEY);
export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SET_BOOKMARK_ID:
      if (
        action.payload
      ) {
        state.navigationId = action.payload;
        let value = JSON.stringify(action.payload);
        let encodedData = cryptr.encrypt(value);
        localStorage.setItem('navigationId', encodedData);
      }
      return Object.assign({}, state);
    case SET_TAB_KEY:
      if (
        action.payload
      ) {
        state.navigationTabId = action.payload;
        let value = JSON.stringify(action.payload);
        let encodedData = cryptr.encrypt(value);
        localStorage.setItem('navigationTabId', encodedData);
      }
      return Object.assign({}, state);
    case MENU_TOGGLE:
      state.menuOpen = action.payload;
      return Object.assign({}, state);

    case GET_DEPARTMENT_LIST:
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.resourceData
      ) {
        state.projectList = action.payload.data.resourceData;
      }
      return Object.assign({}, state);

    case GET_CLASSIFICATION:
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.resourceData
      ) {
        let purchaseResponse = action.payload.data.resourceData;
        state.listOfDepartment = purchaseResponse.listOfDepartment;
        state.listOfBrands = purchaseResponse.listOfBrands;
        state.listOfMajorCategory = purchaseResponse.listOfCategory;
        state.listOfAddress = purchaseResponse.listOfAddress;
        state.listOfGlobalRegions = purchaseResponse.listOfGlobalRegions;
        state.listOfSectorCategory = purchaseResponse.listOfProductLine;
        state.listOfFunctionalArea = purchaseResponse.listOfDepartment;
      }
      return Object.assign({}, state);

    case "GET_SAVE_NAVIGATION_ITEM":
      if (
        action.payload
      ) {
        state.saveNavigationItem = action.payload;
        let value = JSON.stringify(action.payload);
        let encodedData = cryptr.encrypt(value);
        localStorage.setItem('navigationItem', encodedData);
      }
      return Object.assign({}, state);
      
    case "BLANK_NAVIGATION_ITEM":
      state.menuOpen = '';
      state.navigationId = '';
      state.navigationItem = [];
      localStorage.setItem('navigationTabId', '');
      localStorage.setItem('navigationId', '');
      localStorage.setItem('navigationItem', []);
      return Object.assign({}, state);
    default:
      return state;
  }
};
