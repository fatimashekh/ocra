import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  SHOW_SIGNIN,
  USER_TYPE,
  USER_COMPANY_LOGO,
  PROFILE_PHOTO,
  UPDATE_USER_PROFILE,
  GET_USER_PROFILE,
  LOGIN_DETAILS,
  GET_NAVIGATION_ITEM_SUCCESS,
  SAVE_TEMPLATE_ID
} from './types';
import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage
} from '../commonFunctions';
import Cryptr from 'cryptr';
import CONSTANTS from "../../common/core/config/appConfig";
const cryptr = new Cryptr(CONSTANTS.CRYPTER_KEY);
const INITIAL_STATE = {
  userData: getLocalStorage('userInfo') || {},
  userRegiser: {},
  showSignIn: 'signin',
  userType: 'buyer',
  regTemplateId: "",
  hideDrawer: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      if (action.payload && action.payload.data) {

        const userInfo = action.payload.data;
        if (userInfo.userProfile) {
          userInfo.userProfile = userInfo.userProfile.toLowerCase();
        }
        localStorage.setItem('oneTimeLogin', 'yes');
        state.userData = userInfo;
        state.hideDrawer = false;
        setLocalStorage('userInfo', userInfo);
      }
      return Object.assign({}, state);
    case LOGIN_DETAILS:
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.resourceData
      ) {



        state.userData.buyerId = action.payload.data.resourceData.buyerId;
        state.userData.supplierId = action.payload.data.resourceData.supplierId;
        state.userData.companyName = action.payload.data.resourceData.companyName;
        state.userData.companyProfileURL = action.payload.data.resourceData.companyProfileURL;
        state.userData.contactNo = action.payload.data.resourceData.contactNo;
        state.userData.email = action.payload.data.resourceData.email;
        state.userData.fullname = action.payload.data.resourceData.fullName;
        state.userData.functionalClassificationExists = action.payload.data.resourceData.functionalClassificationExists;
        state.userData.scope = action.payload.data.resourceData.scope;
        state.userData.userProfile = action.payload.data.resourceData.userProfile;
        state.userData.userRole = action.payload.data.resourceData.userRole;
        state.userData.userType = action.payload.data.resourceData.userType;
        state.userData.addressDetail = action.payload.data.resourceData.addressDetail;
        state.userData.admin = action.payload.data.resourceData.admin;
        state.userData.isAdmin = action.payload.data.resourceData.isAdmin;
        state.userData.plantAndZonalOfficesExists = action.payload.data.resourceData.plantAndZonalOfficesExists;
        state.userData.companyFile = action.payload.data.resourceData.companyFile;
        // state.userData.registerFile = action.payload.data.resourceData.registerFile;
        // state.userData.profilePhotoURL = action.payload.data.resourceData.profilePhotoURL;

        let localStr = {
          access_token: getLocalStorage('userInfo').access_token,
          buyerId: action.payload.data.resourceData.buyerId,
          supplierId: action.payload.data.resourceData.supplierId,
          companyName: action.payload.data.resourceData.companyName,
          companyProfileURL: action.payload.data.resourceData.companyProfileURL,
          contactNo: action.payload.data.resourceData.contactNo,
          email: action.payload.data.resourceData.email,
          expires_in: getLocalStorage('userInfo').expires_in,
          fullname: action.payload.data.resourceData.fullName,
          functionalClassificationExists: action.payload.data.resourceData.functionalClassificationExists,
          id: getLocalStorage('userInfo').id,
          isAdmin: getLocalStorage('userInfo').isAdmin,
          jti: getLocalStorage('userInfo').jti,
          profilePhotoURL: getLocalStorage('userInfo').profilePhotoURL,
          refresh_token: getLocalStorage('userInfo').refresh_token,
          scope: getLocalStorage('userInfo').scope,
          token_type: getLocalStorage('userInfo').token_type,
          userProfile: action.payload.data.resourceData.userProfile,
          userRole: getLocalStorage('userInfo').userRole,
          userType: getLocalStorage('userInfo').userType,
          addressDetail: action.payload.data.resourceData.addressDetail,
          admin: action.payload.data.resourceData.admin,
          plantAndZonalOfficesExists: action.payload.data.resourceData.plantAndZonalOfficesExists,
          userNDAFile: getLocalStorage('userInfo').file,
          file: getLocalStorage('userInfo').file,
          registerFile: getLocalStorage('userInfo').registerFile,
          companyFile: action.payload.data.resourceData.companyFile,
        }
        let value = JSON.stringify(localStr);
        let encodedData = cryptr.encrypt(value);
        localStorage.setItem('userInfo', encodedData);
      }
      return Object.assign({}, state);
    case USER_REGISTER:
      if (action.payload && action.payload.data) {
        const userInfo = action.payload.data;
        state.userRegiser = userInfo;
      }
      return Object.assign({}, state);

    case USER_LOGOUT:
      state.userData = {};
      state.hideDrawer = true;
      clearLocalStorage();
      return Object.assign({}, state);

    case SHOW_SIGNIN:
      state.showSignIn = action.payload;
      return Object.assign({}, state);

    case USER_TYPE:
      state.userType = action.payload;
      return Object.assign({}, state);

    case USER_COMPANY_LOGO:
      if (
        action.payload
      ) {
        state.companyProfileURL = action.payload;
      }
      return Object.assign({}, state);

    case PROFILE_PHOTO:
      if (
        action.payload
      ) {
        state.userData.profilePhotoURL = action.payload;
        let localStr = {
          access_token: getLocalStorage('userInfo').access_token,
          buyerId: getLocalStorage('userInfo').buyerId,
          companyName: getLocalStorage('userInfo').companyName,
          contactNo: getLocalStorage('userInfo').contactNo,
          email: getLocalStorage('userInfo').email,
          expires_in: getLocalStorage('userInfo').expires_in,
          fullname: getLocalStorage('userInfo').fullname,
          id: getLocalStorage('userInfo').id,
          isAdmin: getLocalStorage('userInfo').isAdmin,
          jti: getLocalStorage('userInfo').jti,
          companyProfileURL: getLocalStorage('userInfo').companyProfileURL,
          profilePhotoURL: action.payload,
          userNDAFile: getLocalStorage('userInfo').file,
          file: getLocalStorage('userInfo').file,
          registerFile: getLocalStorage('userInfo').registerFile,
          refresh_token: getLocalStorage('userInfo').refresh_token,
          scope: getLocalStorage('userInfo').scope,
          token_type: getLocalStorage('userInfo').token_type,
          userProfile: getLocalStorage('userInfo').userProfile,
          userRole: getLocalStorage('userInfo').userRole,
          userType: getLocalStorage('userInfo').userType,
          addressDetail: getLocalStorage('userInfo').addressDetail,
        }
        let value = JSON.stringify(localStr);
        let encodedData = cryptr.encrypt(value);
        localStorage.setItem('userInfo', encodedData);
        return Object.assign({}, state);
      }
    // case UPDATE_USER_PROFILE:
    //   if (action.payload) {
    //     state.userData.fullname = 'hiiii';
    //     return Object.assign({}, state);
    //   }


    case UPDATE_USER_PROFILE:
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.resourceData
      ) {
        state.userData.fullname = action.payload.data.resourceData.firstName + " " +
          action.payload.data.resourceData.lastName;
        let localStr = {
          access_token: getLocalStorage('userInfo').access_token,
          buyerId: getLocalStorage('userInfo').buyerId,
          companyName: getLocalStorage('userInfo').companyName,
          companyProfileURL: getLocalStorage('userInfo').companyProfileURL,
          contactNo: getLocalStorage('userInfo').contactNo,
          email: getLocalStorage('userInfo').email,
          expires_in: getLocalStorage('userInfo').expires_in,
          fullname: action.payload.data.resourceData.firstName + " " +
            action.payload.data.resourceData.lastName,
          id: getLocalStorage('userInfo').id,
          isAdmin: getLocalStorage('userInfo').isAdmin,
          jti: getLocalStorage('userInfo').jti,
          profilePhotoURL: getLocalStorage('userInfo').profilePhotoURL,
          refresh_token: getLocalStorage('userInfo').refresh_token,
          scope: getLocalStorage('userInfo').scope,
          token_type: getLocalStorage('userInfo').token_type,
          userProfile: getLocalStorage('userInfo').userProfile,
          userRole: getLocalStorage('userInfo').userRole,
          userType: getLocalStorage('userInfo').userType,
          addressDetail: getLocalStorage('userInfo').addressDetail,
        }
        let value = JSON.stringify(localStr);
        let encodedData = cryptr.encrypt(value);
        localStorage.setItem('userInfo', encodedData);

      }
      return Object.assign({}, state);
    case GET_USER_PROFILE:
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.resourceData
      ) {

        let resourceData = action.payload.data.resourceData
        state.userData.profilePhotoURL = resourceData.profilePhotoURL;
        state.userData.companyProfileURL = resourceData.companyProfileURL;
        state.userData.userNDAFile = resourceData.file;
        state.userData.file = resourceData.file;
        state.userData.registerFile = resourceData.registerFile;

        let localStr = {
          access_token: getLocalStorage('userInfo').access_token,
          buyerId: getLocalStorage('userInfo').buyerId,
          companyName: getLocalStorage('userInfo').companyName,
          contactNo: getLocalStorage('userInfo').contactNo,
          email: getLocalStorage('userInfo').email,
          expires_in: getLocalStorage('userInfo').expires_in,
          fullname: getLocalStorage('userInfo').fullname,
          id: getLocalStorage('userInfo').id,
          isAdmin: getLocalStorage('userInfo').isAdmin,
          jti: getLocalStorage('userInfo').jti,
          companyProfileURL: resourceData.companyProfileURL,
          profilePhotoURL: resourceData.profilePhotoURL,
          userNDAFile: resourceData.file,
          file: resourceData.file,
          registerFile: resourceData.registerFile,
          refresh_token: getLocalStorage('userInfo').refresh_token,
          scope: getLocalStorage('userInfo').scope,
          token_type: getLocalStorage('userInfo').token_type,
          userProfile: getLocalStorage('userInfo').userProfile,
          userRole: getLocalStorage('userInfo').userRole,
          userType: getLocalStorage('userInfo').userType,
          addressDetail: getLocalStorage('userInfo').addressDetail,
        }
        let value = JSON.stringify(localStr);
        let encodedData = cryptr.encrypt(value);
        localStorage.setItem('userInfo', encodedData);
      }
      return Object.assign({}, state);
    case GET_NAVIGATION_ITEM_SUCCESS:
      if (
        action.payload
      ) {
        state.navigationItem = action.payload;
        let value = JSON.stringify(action.payload);
        let encodedData = cryptr.encrypt(value);
        localStorage.setItem('navigationItem', encodedData);
      }
      return Object.assign({}, state);

    case SAVE_TEMPLATE_ID:
      return Object.assign({}, state, {
        regTemplateId: action.payload
      });
    default:
      return state;
  }
};
