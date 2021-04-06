import {
  USER_LOGIN,
  USER_LOGOUT,
  GET_STUDENT_PERSONAL_INFO,
  USER_REGISTER,
  SHOW_SIGNIN,
  USER_TYPE,
  USER_FORGOT_PASSWORD,
  RESET_PASSWORD,
  USER_COMPANY_LOGO,
  PROFILE_PHOTO,
  UPDATE_USER_PROFILE,
  GET_USER_PROFILE,
  LOGIN_DETAILS,
  GET_NAVIGATION_ITEM_SUCCESS,
  SAVE_TEMPLATE_ID
} from './types';

import ocraApiService from '../../common/core/api/apiService';

export const actionUserLogin = data => {
  const userDetails = {
    grant_type: 'password',
    username: data.userName,
    password: data.password,
    roleId: data.roleId,
    host: data.hostName,
    tz: data.timeZone
  }
  var encodedBody = [];
  for (var property in userDetails) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(userDetails[property]);
    encodedBody.push(encodedKey + "=" + encodedValue);
  }
  encodedBody = encodedBody.join("&");
  const request = ocraApiService('buyerLogin', encodedBody);
  return {
    type: USER_LOGIN,
    payload: request
  };
};
export const actionGetLoginDetails = data => {
  const request = ocraApiService('getLoginDetails', data);
  return {
    type: LOGIN_DETAILS,
    payload: request
  };
};
export const actionUserRegister = data => {
  const request = ocraApiService('register', data);
  return {
    type: USER_REGISTER,
    payload: request
  };
};

export const actionUserLogout = data => {
  localStorage.removeItem("filters");
  const request = ocraApiService('logout', data);
  return {
    type: USER_LOGOUT,
    payload: request
  };
};

export const actionOtpVerification = data => {
  const request = ocraApiService('otpVerification', data);
  return {
    type: GET_STUDENT_PERSONAL_INFO,
    payload: request
  };
};

/**
 * To show hide signup and signin page
 * @param {Boolean } data  true to show sigin page and false to show signup page
 */
export const actionShowSignIn = data => {
  return {
    type: SHOW_SIGNIN,
    payload: data
  };
};

export const actionChangeUserType = data => {
  return {
    type: USER_TYPE,
    payload: data
  };
};

export const actionForgotPassword = data => {
  const request = ocraApiService('forgotPassword', data);
  return {
    type: USER_FORGOT_PASSWORD,
    payload: request
  };
};

export const actionResetPassword = data => {
  const request = ocraApiService('resetPassword', data);
  return {
    type: RESET_PASSWORD,
    payload: request
  };
};

export const actionChangeUserCompanyLogo = data => {
  return {
    type: USER_COMPANY_LOGO,
    payload: data
  };
};

export const actionChangeUserProfileLogo = data => {
  return {
    type: PROFILE_PHOTO,
    payload: data
  };
};

export const actionUpdateUserProfile = data => {
  const request = ocraApiService('updateUserProfile', data);
  return {
    type: UPDATE_USER_PROFILE,
    payload: request
  };
};

export const actionUserProfileImage = data => {
  const request = ocraApiService('getProfileImage', data);
  return {
    type: GET_USER_PROFILE,
    payload: request
  };
}; 

export const actionSaveRegTemplate = data => {
  return {
    type: SAVE_TEMPLATE_ID,
    payload: data
  };
};

export const actionGetNavigationItemSuccess = data => {
  return {
    type: GET_NAVIGATION_ITEM_SUCCESS,
    payload: data
  };
};

