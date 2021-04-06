// used for passoword encryption
import validationMessages from '../constants/validationMessages';
import regExpressions from '../constants/regExpressions';
import customConstant from '../constants/customConstant';
import permissionConstant from '../constants/permissionConstant';
import footerConstants from '../constants/footerConstants';
import pageTitle from '../constants/pageTitle';
import featureConstant from '../constants/featureConstant';
let getAPIURL = () => {
  let returnUrl = '';
  switch (window.location.hostname) {
    case 'localhost':
      returnUrl = 'dev.zumen.in';
      break;
    default:
      returnUrl = window.location.hostname
      break;
  }
  return returnUrl;
};
let API_URL_JAVA = () => {
  let API_URL_JAVA = '';
  switch (window.location.hostname) {
    case 'localhost':
      API_URL_JAVA = 'https://' + getAPIURL()
      break;
    default:
      API_URL_JAVA = window.location.protocol + '//' + getAPIURL();
      break;
  }
  return API_URL_JAVA;
};
export default {
  IV_LENGTH: 16,
  ENCRYPTION_KEY: 'sd5b75nb7577#^%$%*&G#CGF*&%@#%*&',
  CRYPTER_KEY:'0xffffffff,0xffffffff,0xffffffff,0xffffffff,0xffffffff,0xfffffff8',
  regExpressions,
  validationMessages,
  customConstant,
  permissionConstant,
  footerConstants,
  featureConstant,
  pageTitle,
  AM_CHARTS_LICENSE_KEY: 'CH225758074',
  API_URL_JAVA: API_URL_JAVA()
};
