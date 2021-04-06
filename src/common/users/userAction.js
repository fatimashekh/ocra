import {
  GET_APPROVER,
  GET_OTP_FOR_ADD_USER,
  SUPPLIER_ADD_USER,
  All_ADDED_USER,
  EDIT_USER,
  DELETE_USER,
  AFFECTED_USER,
  GET_USER_DETAILS,
  CHECK_TOKEN,
  SEND_OTP_FOR_UPDATE_PROFILE,
  GET_PROFILE,
  GET_OTP_FOR_EDIT_USER,
  GET_COMPANY_DETAILS,
  GET_COMPANY_TAX_CODE_LIST,
  GET_SUPPLIER_GST_CODE_LIST,
  GET_COMPANY_WAREHOUSE_ADDRESS_LIST,
  GET_COMPANY_ERP_WAREHOUSE_ADDRESS_LIST,
  CLEAR_OTP_FOR_ADD_USER
} from './types';
import ocraApiService from '../../common/core/api/apiService';

export const actionGetApproverList = data => {
  const request = ocraApiService('getApproverList', data);
  return {
    type: GET_APPROVER,
    payload: request
  };
};

export const actionGenerateOTPToAddUser = data => {
  const request = ocraApiService('generateOTPToAddUser', data);
  return {
    type: GET_OTP_FOR_ADD_USER,
    payload: request
  };
};

export const actionSupplierAddUser = data => {
  const request = ocraApiService('supplierAddUser', data);
  return {
    type: SUPPLIER_ADD_USER,
    payload: request
  };
};

export const actionEditProfile = data => {
  const request = ocraApiService('editProfile', data);
  return {
    type: EDIT_USER,
    payload: request
  };
};

export const actionGetAllAddedUser = data => {
  const request = ocraApiService('getAllAddedUser', data);
  return {
    type: All_ADDED_USER,
    payload: request
  };
};

export const actionDeleteUser = data => {
  const request = ocraApiService('deleteUserProfile', data);
  return {
    type: DELETE_USER,
    payload: request
  };
};

export const actionDeleteAffectedUser = data => {
  const request = ocraApiService('affectedUserCheckBeforeDelete', data);
  return {
    type: AFFECTED_USER,
    payload: request
  };
};

// export const actionUpdateUserProfile = data => {
//   const request = ocraApiService('updateUserProfile', data);
//   return {
//     type: UPDATE_USER_PROFILE,
//     payload: request
//   };
// };

export const actionSendOtpForUPdate = data => {
  const request = ocraApiService('sendOtpForUpdate', data);
  return {
    type: SEND_OTP_FOR_UPDATE_PROFILE,
    payload: request
  };
};

export const actionGetUserDetails = data => {
  const request = ocraApiService('getUserDetails', data);
  return {
    type: GET_USER_DETAILS,
    payload: request
  };
};

export const actionCheckToken = data => {
  const request = ocraApiService('checkToken');
  return {
    type: CHECK_TOKEN,
    payload: request
  };
};

export const actionGetUserProfileList = data => {
  const request = ocraApiService('getUserProfileList', data);
  return {
    type: GET_PROFILE,
    payload: request
  };
};

export const actionGenerateOTPToEditUser = data => {
  const request = ocraApiService('generateOTPToEditUser', data);
  return {
    type: GET_OTP_FOR_EDIT_USER,
    payload: request
  };
};

export const actionGetCompanyData = data => {
  const request = ocraApiService('getCompanyDetails', data);
  return {
    type: GET_COMPANY_DETAILS,
    payload: request
  };
};

export const actionGetCompanyTaxCodeList = data => {
  const request = ocraApiService('getCompanyTaxCodeList', data);
  return {
    type: GET_COMPANY_TAX_CODE_LIST,
    payload: request
  };
};

export const actionGetGSTCodeList = data => {
  const request = ocraApiService('getSupplierGstCodeList', data);
  return {
    type: GET_SUPPLIER_GST_CODE_LIST,
    payload: request
  };
};
export const actionGetSupplierTaxList = data => {
  const request = ocraApiService('getSupplierTaxList', data);
  return {
    type: GET_SUPPLIER_GST_CODE_LIST,
    payload: request
  };
};
export const actionGetCompanyERPWareHouseAddressList = data => {
  const request = ocraApiService('getCompanyERPWareHouseAddressList', data);
  return {
    type: GET_COMPANY_ERP_WAREHOUSE_ADDRESS_LIST,
    payload: request
  };
};


export const actionGetCompanyWareHouseAddressList = data => {
  const request = ocraApiService('getCompanyWareHouseAddressList', data);
  return {
    type: GET_COMPANY_WAREHOUSE_ADDRESS_LIST,
    payload: request
  };
};

export const actionGetERPPOLookUp = data => {
  const request = ocraApiService('getERPPOLookUp', data);
  return {
    type: GET_COMPANY_TAX_CODE_LIST,
    payload: request
  };
};

export const actionClearOTPToAddUser = data => {
  const request = ocraApiService('clearOTPToAddUser', data);
  return {
    type: CLEAR_OTP_FOR_ADD_USER,
    payload: request
  };
};
