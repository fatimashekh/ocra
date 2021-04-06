import axios from 'axios';
import ApiJson from './apiConfigJson';
import AppConfig from '../config/appConfig';
import JSEncrypt from 'jsencrypt'
import {
  showErrorToast,
  showSuccessToast,
  getLocalStorage,
  showWarningToast
} from '../../commonFunctions';
import CONSTANTS from "../config/appConfig";
let { customConstant } = CONSTANTS;

let apiFailCounter = 0;
let pub_key = customConstant.publicKeyRSA;

//Set default URL of API
axios.defaults.baseURL = AppConfig.API_URL_JAVA;
axios.interceptors.request.use(
  function (config) {
    let userInfo = getLocalStorage('userInfo');
    if (userInfo) {
      // if (userInfo.access_token) {
      //   let access_token = userInfo.access_token;
      //   config.headers.Authorization = `Bearer ${access_token}`;
      //   config.headers['jti-access-token'] = userInfo.jti + "." + userInfo.id;
      // }
      if (userInfo.access_token) {
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(pub_key)
        let jtiAccessToken = userInfo.jti + "." + userInfo.id;
        let access_token = userInfo.access_token;
        config.headers.Authorization = `Bearer ${access_token}`;
        config.headers['jti-access-token'] = encrypt.encrypt(jtiAccessToken);
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const prepareDataObject = (_data_, paramObj) => {
  for (let key in _data_) {
    if (paramObj[key] || paramObj[key] === false) {
      _data_[key] = paramObj[key];
    } else {
      if (typeof _data_[key] !== 'object') _data_[key] = '';
    }
  }
  return _data_;
};

const injectParamsToUrl = (_url_, paramObj) => {
  var url = _url_;
  for (let key in paramObj) {
    url = url.replace(':' + key, paramObj[key]);
  }
  return url;
};

const handleErrorByStatus = error => {
  switch (error.status) {
    case 400:
      try {
        const message = error.data.error_description;
        showErrorToast(message);
      } catch (error) { }
      try {
        const message = error.data.responseMessage;
        showErrorToast(message);
      } catch (error) { }
      try {
        const message = error.responseMessage;
        showErrorToast(message);
      } catch (error) { }
      break;
    case 406:
      try {
        const message = error.data.error_description;
        showWarningToast(message);
      } catch (error) { }
      try {
        const message = error.data.responseMessage;
        showWarningToast(message);
      } catch (error) { }
      try {
        const message = error.responseMessage;
        showWarningToast(message);
      } catch (error) { }
      break;
    case 500:
      try {
        const message = error.data.message;
        showErrorToast(message);
      } catch (error) { }
      break;
    case 504:
      try {
        const message = error.data.error_description;
        showErrorToast(message);
      } catch (error) { }
      try {
        const message = error.data.responseMessage;
        showErrorToast(message);
      } catch (error) { }
      try {
        const message = error.responseMessage;
        showErrorToast(message);
      } catch (error) { }
      break;

    default:
      break;
  }
};

const ocraApiService = (apiKeyName, data) => {
  let apiDetails = ApiJson[apiKeyName];

  if (!apiDetails) {
    throw new Error(
      'Api configuration not found in api-json, please check api-json.js'
    );
  }

  let requestObject = Object.assign({}, apiDetails);
  if (typeof data === 'object' && data.length && data.length >= 0 || (apiKeyName === 'buyerLogin')) {
    requestObject.data = data;
  } else {
    requestObject.data = prepareDataObject(requestObject.data, data);
  }

  requestObject.url = injectParamsToUrl(requestObject.url, data);
  return axios(requestObject)
    .then(function (result) {
      apiFailCounter = 0;
      if (result.data && result.data.status === 200) {
        if (result.data.responseMessage) {
          const message = result.data.responseMessage;
          if (requestObject.showResultMessage === true)
            showSuccessToast(message);
        }
      } else {
        if (requestObject.showErrorMessage === true)
          handleErrorByStatus(result.data);
      }
      return result;
    })
    .catch(function (error) {
      if (error && error.response) {
        if (requestObject.showErrorMessage === true)
          handleErrorByStatus(error.response);
      }

      if (
        error.config.maxContentLength - 1 &&
        error.toString().indexOf('Network Error') > -1
      ) {
        apiFailCounter++;
        if (apiFailCounter >= 3) {
          localStorage.clear();
          window.open(window.location.origin, '_self');
        }
      }
      return error.response;
    });
};

export default ocraApiService;
