import React from 'react';
import { toast } from 'react-toastify';
import Transition from 'react-transition-group/Transition';
import 'react-toastify/dist/ReactToastify.css';
import crypto from 'crypto';
import CONSTANTS from './core/config/appConfig';
import Cryptr from 'cryptr';
import moment from 'moment';
import ocraApiService from './core/api/apiService';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import iconSuccess from  '../img/icon-success.svg'
import iconWarning from  '../img/icon-warning.svg'
import iconDangerous from  '../img/icon-dangerous.svg'
import { getFeatureStatus } from '../common/featureToggle/utils';
let { customConstant } = CONSTANTS;
const cryptr = new Cryptr(CONSTANTS.CRYPTER_KEY);
let toastId = '';
//used to encryption of localstorage data
export const encryptedData = data => {
  return cryptr.encrypt(data);
};

//used to decrypt localstorage data
export const decryptedData = data => {
  return cryptr.decrypt(data);
};

// used to set localstorage item
export const setLocalStorage = (key, value) => {
  value = JSON.stringify(value);
  const encodedData = encryptedData(value);
  localStorage.setItem(key, encodedData);
};

// used to get localstorage item
export const getLocalStorage = key => {
  let data = localStorage.getItem(key);
  if (data) {
    data = JSON.parse(decryptedData(data));
    return data;
  }
  return null;
};
// used to get table Loader item
export const tableLoader = key => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const tableLoading = {
      spinning: true,
      indicator: <Spin indicator={antIcon} />,
    }

  return tableLoading;
};
// used to remove localstorage item
export const removeLocalStorage = key => {
  localStorage.removeItem(key);
};

// used to clear localstorage
export const clearLocalStorage = () => {
  localStorage.clear();
};

export const msgSuccess = (msg) => {
  return <div className="flex align-center">
          <img src={iconSuccess} />
    <span className="p-l-10">{msg}</span>
    </div>
}
export const msgError = (msg) => {
  return <div className="flex align-center">
    <img src={iconDangerous} />
    <span className="p-l-10">{msg}</span>
  </div>
}
export const msgWarning = (msg) => {
  return <div className="flex align-center">
    <img src={iconWarning} />
    <span className="p-l-10">{msg}</span>
    </div>
}

export const showErrorToast = (errorMessage, event) => {
  if (errorMessage !== undefined && errorMessage) {
    if (!toast.isActive(toastId)) {
      toastId = toast.error(msgError(errorMessage), {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        onClose: function () {
          toastId = ''
        }
      });
    }
  }
};

// toastr messages for success
export const showSuccessToast = message => {
  if (message !== undefined && message) {
    if (!toast.isActive(toastId)) {
      toastId = toast.success(msgSuccess(message), {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        onClose: function () {
          toastId = ''
        }
      });
    }
  }
};
export const showWarningToast = message => {
  if (message !== undefined && message) {
    if (!toast.isActive(toastId)) {
      toastId = toast.warning(msgWarning(message), {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        onClose: function () {
          toastId = ''
        }
      });
    }
  }
};

// used zoomin and zoomout of toastr messages
export const ZoomInAndOut = ({ children, position, ...props }) => (
  <Transition
    {...props}
    timeout={200}
    onEnter={node => node.classList.add('zoomIn', 'animate')}
    onExit={node => {
      node.classList.remove('zoomIn', 'animate');
      node.classList.add('zoomOut', 'animate');
    }}
  >
    {children}
  </Transition>
);

// used to render validation message
export const renderMessage = message => {
  return <span className="error">{message}</span>;
};

// used for password encryptions
export const encrypt = text => {
  let iv = crypto.randomBytes(CONSTANTS.IV_LENGTH);
  let cipher = crypto.createCipheriv(
    'aes-256-cbc',
    new Buffer(CONSTANTS.ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

// used to get apiurl for different servers
export const getAPIURL = () => {
  let returnUrl = '';
  switch (window.location.hostname) {
    case '104.42.51.157':
      returnUrl = '104.42.51.157';
      break;

    case '103.76.253.131':
      returnUrl = '103.76.253.131';
      break;

    default:
      returnUrl = '103.76.253.131';
      break;
  }
  return returnUrl;
};

// used to convert timestamp to date
export const timeStampToDate = timestamp => {
  timestamp = timestamp.toString();
  timestamp = timestamp.slice(0, -3);
  timestamp = parseInt(timestamp);
  let momentDate = moment.unix(timestamp);
  return momentDate;
};

// used to convert date to timestamp
export const convertToTimeStamp = momentObject => {
  return moment(momentObject).valueOf();
  //return moment(momentObject).format('x');
  //return moment(momentObject);
};

export const convertToDate = momentObject => {
  return moment(momentObject).format(customConstant.acceptedFormat.dateFormatWithMonthName);
  //return moment(momentObject).format('x');
  //return moment(momentObject);
};

// used to top Position
export const topPosition = message => {
  return window.scrollTo(0, 0);
};

// used to convert timestamp to date
export const removeUnderScore = name => {
  name = name ? name.replace(/_/g, ' ') : '';
  return name;
};
// used to convert timestamp to date
export const twoDecimalPlaces = value => {
  value = value && value !== undefined ? Number.parseFloat(value).toFixed(3) : value;
  return value;
};

export const createBudgetNumber = () => {
  let value = "BUD" + moment().format("sshhmm");
  return value;
};
export const createAccountNumber = () => {
  let value = "acc" + moment().format("sshhmm");
  return value;
};
export const createIndirectPurchaseNumber = () => {
  let value = 'INP' + '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  return value;
};
export const createSpotPONumber = () => {
  let value = ('SB' + '#' + ((Math.random() * 0xffffff) << 0).toString(16)).toUpperCase();
  return value;
};
export const createStandardPONumber = () => {
  let value = ('PO' + '#' + ((Math.random() * 0xffffff) << 0).toString(16)).toUpperCase()
  return value;
};
export const currencyList = () => {
  let value = ["EUR", "INR", "USD",]
  return value;
};
export const currencyListWithObj = () => {
  let value = [
    { id: 'EUR', value: 'EUR' },
    { id: 'INR', value: 'INR' },
    { id: 'USD', value: 'USD' }]
  return value;
};
export const protoProduction = () => {
  let value = [{ id: 'proto', value: 'Proto' }, { id: 'production', value: 'production' }]
  return value;
};
export const unitList = () => {
  let value = ["k", "mill "]
  return value;
};
export const approvalList = () => {
  let value = ["approved", "waiting_for_approval", "send_back", "save_as_draft"]
  return value;
};

export const capitalizeFirstLetter = (string) => {
  let value = string;
  if (string)
    value = string.charAt(0).toUpperCase() + string.slice(1);
  return value
}

export const onlyCharacters = (string) => {
  let value = string;
  if (string)
    value = string.replace(/[\/\\^`!+()$~%=.'":*?<>{}]/g, '');
  //value = string.replace(!/^[a-zA-Z]*$/g, '');
  return value
}

export const onlyNumber = (string) => {
  let value = string;
  if (string)
    value = string.replace(/[^0-9]/g, '');
  return value
}

export const alphaNumeric = (string) => {
  let value = string;
  if (string)
    value = string.replace(/[^a-z0-9]+/gi, "");
  return value
}


export const specialCharacterForPO = (string) => {
  let value = string;
  if (string)
    value = string.replace(/[\/\\^`!+()@$~=.'":*?<>{}]/g, '');
  return value
}

export const specialCharacter = (string) => {
  let value = string;
  if (string)
    value = string.replace(/[\/\\^`!+()@$~%=.'":*?<>{}]/g, '');
  return value
}

export const specialCharacterForm = (string) => {
  let value = string;
  if (string)
    value = string.replace(/[\/\\^`!+()$~%='":*?<>{}]/g, '');
  return value
}

export const checkForSpecialChar = (string) => {
  var specialChars = "<>@!#$%^&*()+[]{}?:;|'\"\\,./~`-= ";
  if (string) {
    for (let i = 0; i < specialChars.length; i++) {
      if (string.indexOf(specialChars[i]) > -1) {
        return true
      }
    }
  }
  return false;
}

export const specialCharacterTwo = (string) => {
  let value = string;
  if (string)
    value = string.replace(/[\/\\^`!+$~%='":*?<>{}]/g, '');
  return value
}
// used to string in samll letters	
export const toLowerCase = str => {
  if (str)
    return str.toLowerCase();
  else
    return '';
};

export const specialCharacterExist = (string) => {
  let value = string;
  if (string)
    if (string.match(/[\/\\^`!+()$~%=.'":*?<>{}]/g))
      return false
  return true
}
export const specialCharacterForUserRole = (string) => {
  let value = string;
  if (string)
    value = string.replace(/[\/\\^`!+()$@#_~%=.'":*?<>{}[]/g, '');
  return value
}
export const imageSize = (string) => {
  if (string > 26214400) // 25 mb for bytes.
  {
    return false;
  }
  return true
}
export const pictureSize = (string) => {
  if (string > 1000000) // 1 mb for bytes. Image Size Validation
  {
    return false;
  }
  return true
}
export const floatValidation = (string, isInteger) => {
  let value = string;
  if (string) {
    var regexp = isInteger ? 
    /^[+-]?\d+(\.\d{1,3})?$/ : /^\d+(\.\d{1,3})?$/;
    value = regexp.test(value) ? true : false;
    return value
  }
  return false
}
export const checkValidNumberAccordingToRequirement = (value) => {
  if (floatValidation(value)) {
    value = value
  } else {
    value = ''
  }
  let afterDecimalPoint = 3
  let afterDecimal
  if (value) {
    afterDecimal = value.toString().split(".")[1];
    if ((Math.floor(value) !== value) && value.toString().indexOf('.') != -1) {
      afterDecimalPoint = value.toString().split(".")[1].length || 0;
      afterDecimalPoint = afterDecimalPoint > 3 ? 3 : afterDecimalPoint
    }
    if (afterDecimal == 0) {
      value = parseFloat(value).toFixed(afterDecimalPoint);
    } else if (isFloat(value)) {
      value = parseFloat(value).toFixed(afterDecimalPoint);
    }
    else if (isInteger(value)) {
      value = value;
    }
    else {
      value = value
    }
  }

  if (value) {
    let valueWithLength = value.toString().length
    if (valueWithLength > 10) {
      value = '';
    }
  }
  return value
}

export const checkValidNumberwithNegativeValue = (value) => {
  var numStr = /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/;
  if (value !== '' && value !== undefined) {
    if (numStr.test(value.toString()))
      value = value
    else
      value = ''
  } else {
    value = ''
  }
  let afterDecimalPoint = 3
  let afterDecimal
  if (value) {
    afterDecimal = value.toString().split(".")[1];
    if ((Math.floor(value) !== value) && value.toString().indexOf('.') != -1) {
      afterDecimalPoint = value.toString().split(".")[1].length || 0;
      afterDecimalPoint = afterDecimalPoint > 3 ? 3 : afterDecimalPoint
    }
    if (afterDecimal === 0) {
      value = parseFloat(value).toFixed(afterDecimalPoint);
    } else if (afterDecimal && isFloat(value)) {
      value = parseFloat(value).toFixed(afterDecimalPoint);
    }
    else if (isInteger(value)) {
      value = value;
    }
    else {
      value = value
    }
  }

  if (value) {
    let valueWithLength = value.toString().length
    if (valueWithLength > 10) {
      value = value.slice(0, 10);
    }
  }
  return value
}

export const numberValidation = (event) => {
  if (event.shiftKey) {
    return true
  } else if (event.keyCode == 69 || event.keyCode == 43 || event.keyCode == 45 || event.keyCode == 109 || event.keyCode == 107 || event.keyCode == 187
    || event.keyCode == 110 || event.which == 110 || event.keyCode == 189 || event.which == 187 || event.which == 189 || event.which == 69 || event.which == 'E' || event.which == 109 || event.which == 45
    || event.which == 107) {
    return true
  } else {
    return false
  }
}
export const isFloat = (number) => {
  // if (!/^["|']{0,1}[-]{0,1}\d{0,}(\.{0,1}\d+)["|']{0,1}$/.test(number)) return false;
  // return number - parseInt(number) ? true : false;
  if (!isNaN(number) && number.toString().indexOf('.') != -1) {
    return true
  }
  return false
}

export const isInteger = (number) => {
  if (!/^["|']{0,1}[-]{0,1}\d{0,}(\.{0,1}\d+)["|']{0,1}$/.test(number)) return false;
  return !(number - parseInt(number));
}
export const numberValidationWithDecimal = (event) => {
  if (event.shiftKey) {
    return true
  } else if (event.keyCode == 69 || event.keyCode == 43 || event.keyCode == 45 || event.keyCode == 109 || event.keyCode == 107 || event.keyCode == 187
    || event.keyCode == 189 || event.which == 187 || event.which == 189 || event.which == 69 || event.which == 'E' || event.which == 109 || event.which == 45
    || event.which == 107) {
    return true
  } else {
    return false
  }
}

export const isEmptyObject = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export const profileExtension = (value) => {
  let acceptFormat = ["png", "jpeg", 'jpg']
  if (value && acceptFormat.includes(value.toLowerCase()))
    return true;
  else
    return false;
}
export const fileExtension = (value) => {
  let acceptFormat = ["png", "jpeg", 'jpg', 'tif', 'tiff']
  if (value && acceptFormat.includes(value.toLowerCase()))
    return true;
  else
    return false;
}
export const fileExtensionProfile = (value) => {
  let acceptFormat = ["png", "jpeg", 'jpg']
  if (value && acceptFormat.includes(value.toLowerCase()))
    return true;
  else
    return false;
}
export const fileExtensionForPart = (value) => {
  let acceptFormat = ["png", "jpeg", 'jpg', 'tif', 'tiff', 'pdf']
  if (value && acceptFormat.includes(value.toLowerCase()))
    return true;
  else
    return false;
}

export const fileExtensionForAllFormate = (value) => {
  let acceptFormat = ["png", "jpeg", 'jpg', 'tif', 'tiff', "pdf", "doc", 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf', 'msg', 'docx']
  if (value && acceptFormat.includes(value.toLowerCase()))
    return true;
  else
    return false;
}

export const documentExtension = (value) => {
  let acceptFormat = ["pdf", "doc", 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf', 'msg', 'docx']
  if (value && acceptFormat.includes(value.toLowerCase()))
    return true;
  else
    return false;
}
export const xlsFileExtension = (value) => {
  let acceptFormat = ["xls", 'xlsx']
  if (value && acceptFormat.includes(value.toLowerCase()))
    return true;
  else
    return false;
}
export const checkMaxDateWithCurrentDate = (value) => {
  let date1 = Date.parse(new Date());
  let date2 = Date.parse(value);
  if (moment().format(customConstant.acceptedFormat.dateFormatWithMonthName) == moment(value, customConstant.acceptedFormat.dateFormatWithMonth).format(customConstant.acceptedFormat.dateFormatWithMonthName)) {
    return true;
  }
  else if (date2 >= date1) {
    if (checkValidDate(value)) {
      return true;
    } else
      return false;
  }
  else
    return false;
}
export const checkValidDate = (value) => {
  if (moment(value, customConstant.acceptedFormat.dateFormatWithMonth).isValid())
    return true;
  else
    return false;
}
export const getGeoValueByKey = (keyName, mapObject) => {
  if (mapObject[keyName]) return mapObject[keyName];
  if (mapObject.location && mapObject.location[keyName])
    return mapObject.location[keyName];
  if (mapObject.gmaps && mapObject.gmaps.address_components) {
    for (
      let index = 0;
      index < mapObject.gmaps.address_components.length;
      index++
    ) {
      const element = mapObject.gmaps.address_components[index];
      if (element.types && element.types.indexOf(keyName) !== -1)
        return element.long_name;
    }
  }
  return "";
}
export const getIPAddress = onNewIP => {
  //compatibility for firefox and chrome
  var myPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;
  var pc = new myPeerConnection({
    iceServers: []
  }),
    noop = function () { },
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

  function iterateIP(ip) {
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  }

  //create a bogus data channel
  pc.createDataChannel('');

  // create offer and set local description
  pc.createOffer()
    .then(function (sdp) {
      sdp.sdp.split('\n').forEach(function (line) {
        if (line.indexOf('candidate') < 0) return;
        line.match(ipRegex).forEach(iterateIP);
      });

      pc.setLocalDescription(sdp, noop, noop);
    })
    .catch(function (reason) {
      // An error occurred, so handle the failure to connect
    });

  //listen for candidate events
  pc.onicecandidate = function (ice) {
    if (
      !ice ||
      !ice.candidate ||
      !ice.candidate.candidate ||
      !ice.candidate.candidate.match(ipRegex)
    )
      return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };

};

export const capitalizeVariableNames = name => {
  let regexPat = name.replace(/([A-Z])/g, " $1");
  let result = regexPat.charAt(0).toUpperCase() + regexPat.slice(1);
  return result;
}

export const validateEmail = (value) => {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(value) == false)
    return false;
  else
    return true;
}

export const validMobileNumber = (number) => {
  let value = number;
  if (number) {
    value = number.replace(/[\/\\!@#$%^&*()_=[{}:;'",<.>a-zA-Z!| ]/g, '');
  }
  let numberLen = value && value.length > 5 ? value : '';
  return numberLen;
} 


/**
 * 
 * @param {Object} partOrBomsData 
 * grid table recoed/datasorces
 * @param {Number} batchSize 
 * this batch size value will determine 
 * how many parts need to send per API call
 * @param {Object} props 
 * from where you calling this api that component 
 * props will use here as property
 * @param {String} propertyName 
 * this propertyname is use to fetch part/bom
 * number from {partOrBomsData} this object
 * this property name is changing on bom screen
 * and part screen that'y we need to send the name
 * of that property which has assigned the number of
 * part/bom
 * @param {Function} callBackToUpdateState 
 * this is call back function will send updated 
 * {partOrBomsData} array of object as property
 * we can utilize this updated array of object as 
 * per requirments
 */
export function makeBatchApiCallsForRevision(partOrBomsData,batchSize,props,propertyName,callBackToUpdateState,multipleIds){
if(getFeatureStatus('revision','revisionAlert')) {
    let ids = [];

    let updatePartsOrBomRecord = (partsOrBoms, filteredBomsOrPart, showLoading)=>{

      let filterRevisionBoms = partsOrBoms;
      let selectBom={};
      if(Array.isArray(filteredBomsOrPart)){
          for(let bom of filteredBomsOrPart){
            selectBom[bom]='';
          }
      }else
        selectBom = filteredBomsOrPart;

      for(let singleBom of Object.entries(selectBom)){
        for(let i = 0; i< filterRevisionBoms.length; i++){
          if(singleBom[0] === filterRevisionBoms[i][propertyName]){
            if(showLoading){
              filterRevisionBoms[i].showLoader = true;
            }else{
              filterRevisionBoms[i].newRevision = singleBom[1];
              filterRevisionBoms[i].showLoader = false;
            }
          }
        }
      }
      callBackToUpdateState(filterRevisionBoms);
    }
    
    let processApiCalls = (listOfBomsOrPart, index, batch)=>{
                
      if(index <= listOfBomsOrPart.length-1){
  
        if(listOfBomsOrPart.length <= batch){
          for(let partOrBom of listOfBomsOrPart){
            if(partOrBom.isPlmUpload)
              ids.push(partOrBom[propertyName]);
          }
          if(ids.length){
            updatePartsOrBomRecord(listOfBomsOrPart,ids,true);
            makeCall(ids,props)
            .then(res=>{
              if(res && res.data && res.status === 200)
                updatePartsOrBomRecord(listOfBomsOrPart,res.data)
              ids = [];
            })
            .catch(error=>{
              //showErrorToast(error);
              updatePartsOrBomRecord(listOfBomsOrPart,ids);
              ids = [];
            });
        }
        }else if(((index+1)%batch) === 0){
          if(listOfBomsOrPart[index].isPlmUpload)
            ids.push(listOfBomsOrPart[index][propertyName]);

          if(ids.length){
            updatePartsOrBomRecord(listOfBomsOrPart,ids,true);
            makeCall(ids,props)
            .then(res=>{
              if(res && res.data && res.status === 200)
                updatePartsOrBomRecord(listOfBomsOrPart,res.data)
              ids = [];
              processApiCalls(listOfBomsOrPart, index+1, batch);
            })
            .catch(error=>{
              //showErrorToast(error);
              updatePartsOrBomRecord(listOfBomsOrPart,ids);
              ids = [];
            });
          }

        }else{
          if(listOfBomsOrPart[index].isPlmUpload)
              ids.push(listOfBomsOrPart[index][propertyName]);
          processApiCalls(listOfBomsOrPart, index+1, batch);
        }

      }
      if(listOfBomsOrPart.length-1 === index){
        if(ids.length > 0){
          updatePartsOrBomRecord(listOfBomsOrPart,ids,true);
          makeCall(ids,props)
          .then(res=>{
            if(res && res.data && res.status === 200)
              updatePartsOrBomRecord(listOfBomsOrPart,res.data)
          })
          .catch(error=>{
            //showErrorToast(error);
            updatePartsOrBomRecord(listOfBomsOrPart,ids);
          });
        }
      }
    
    } 
    processApiCalls(partOrBomsData,0,batchSize);
  }
}

let makeCall = (partsIds,props)=>{
  let orgId = props.userInfo.userData.buyerId
  let data = Object.assign({},{
                                  ids:partsIds,
                                  orgId
                                });
  return ocraApiService('getRevisions',data);
}

export function updateNewRevision(partOrBomsData,props,callBackToUpdateState,batchSize,fieldName, hasPartResponse) {
if(getFeatureStatus('revision','revisionAlert')) {
  let multipleIds = {};
  let singleIds = {};
  let index=0;
  let data = partOrBomsData;

  for (let docs of data) {
    if(docs.isPlmUpload || (docs.partResponse && docs.partResponse.isPlmUpload)) {
    docs.showLoader = true;
    if(!hasPartResponse) {
    docs.revision = fieldName==="partNumberOrItemCode" ? docs.partNumberOrItemCode === "Multiple" ? "Multiple" : docs.partNumberOrItemCode.split(".")[1] : docs.partRevisionNumber;

      if (docs.partNumberOrItemCode !== "Multiple") {
        singleIds[index] = fieldName==="partNumberOrItemCode" ? docs.partNumberOrItemCode.split(".")[0] : docs[fieldName];
      } else if (docs.partNumberOrItemCode && docs.partNumberOrItemCode === "Multiple" && docs.partNumberRevisions) {
        let partIds = [];
        docs.partNumberRevisions.forEach(element => {
          partIds.push(element.split(".")[0]);
        });
        multipleIds[index] = partIds;
      }
    } else {
      singleIds[index] = docs.partResponse.partNumber;
    }
  }
   index++;
}

  callBackToUpdateState(data);

  let partNumberList = new Set();
  for(let key in singleIds) {
    partNumberList.add(singleIds[key]);
  }
  for(let key in multipleIds) {
    partNumberList = new Set([...partNumberList,...new Set(multipleIds[key])]);
  }

  partNumberList = Array.from(partNumberList);
  let total = partNumberList.length;
  let ids = [];
  for (let i = 0; i < partNumberList.length; i++) {
    ids.push(partNumberList[i]);
    if (ids.length == batchSize || (total <= batchSize && ids.length == total)) {
     makeCall(ids,props).then(res => {
       if(res && res.data && res.status === 200) {
            updateState(res.data,true);
        } else {
            throw "error";
        }
      }).catch((err)=> {
            updateState(ids, false);
      });
      if (total > batchSize) {
        total -= batchSize;
      }
      ids = [];
    }
  }
  let updateState = (data, success) =>{
    if(success) {
    for(let key in singleIds) {
      if(singleIds[key] in data && partOrBomsData[key].revision !== data[singleIds[key]]) {
        partOrBomsData[key].newRevision = data[singleIds[key]]
      }
      partOrBomsData[key].showLoader = false;
    }
    for(let key in multipleIds) {
      multipleIds[key].forEach(element=>{
        if(element in data) {
        partOrBomsData[key].newRevision = "0B"
        partOrBomsData[key].showLoader = false;
        }
      });
    }
    } else {
            for(let key in singleIds) {
             if(data.includes(singleIds[key]))
              partOrBomsData[key].showLoader = false;
            }
    }
    callBackToUpdateState(partOrBomsData);
  }
  }
}