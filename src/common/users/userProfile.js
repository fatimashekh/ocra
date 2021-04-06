import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel, Modal
} from 'react-bootstrap';
import validation from 'react-validation-mixin';
import { ToastContainer, toast } from "react-toastify";
import strategy, { validator } from 'react-validatorjs-strategy';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';
import Sprite from '../../img/sprite.svg';
import userImage from '../../img/userprofile.svg';
import SideBarSupplier from '../../supplier/common/sideBar';
import FooterSupplier from '../../supplier/common/footer';
import PhoneInput from "react-phone-number-input/native";
import {
  actionUserLogout,
  actionUpdateUserProfile,
  actionLoaderHide,
  actionLoaderShow,
  actionTabClick,
  actionGetUserDetails,
  actionSendOtpForUPdate,
  actionUploadDoc,
  actionDeleteDoc,
  actionChangeUserProfileLogo,
  actionChangeUserCompanyLogo
} from '../../common/core/redux/actions';
import CONSTANTS from '../../common/core/config/appConfig';
import {
  renderMessage, showErrorToast, showSuccessToast, imageSize, checkForSpecialChar,
  getLocalStorage, documentExtension, fileExtensionProfile, ZoomInAndOut, specialCharacter
} from '../../common/commonFunctions';
import ImageCropper from './imageCropper';
import customConstant from '../../common/core/constants/customConstant';
import Cryptr from 'cryptr';
import ShowDocument from "../../common/components/showDocument/showDocument";
const cryptr = new Cryptr(CONSTANTS.CRYPTER_KEY);
let { validationMessages, permissionConstant } = CONSTANTS;
class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      userDetails: [],
      tabKey: 'userProfile',
      email: '',
      firstName: '',
      lastName: '',
      mobile: '',
      userProfile: '',
      emailOtpSend: false,
      mobileOtpSend: false,
      mobileVerified: true,
      emailVerified: true,
      mobileOTP: '',
      emailOTP: '',
      updatedMobile: '',
      profileImageURL: '',
      companyLogoURL: '',
      countryCode: "IN",
      deleteConformationModal: false
    };

    this.applyValidation = this.applyValidation.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.activeTabKeyAction = this.activeTabKeyAction.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVerifyOtp = this.handleVerifyOtp.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleGetData = this.handleGetData.bind(this);
    this.handleNdaDocUpload = this.handleNdaDocUpload.bind(this);
    this.handleDeleteNdaDoc = this.handleDeleteNdaDoc.bind(this);
    this.handleCloseConformation = this.handleCloseConformation.bind(this);
  }

  applyValidation() {
    let fieldObject = {};
    let errorMessage = {};

    fieldObject['firstName'] = 'required';
    fieldObject['lastName'] = 'required';
    fieldObject['email'] = 'required|email';
    fieldObject['mobile'] = 'required';
    fieldObject['emailOTP'] = 'max:6';
    fieldObject['mobileOTP'] = 'max:6';
    fieldObject["mobile"] = "required|min:10|max:17";
    errorMessage['required.firstName'] = validationMessages.firstName.required;
    errorMessage['required.lastName'] = validationMessages.lastName.required;
    errorMessage['required.email'] = validationMessages.email.required;
    errorMessage['email.email'] = validationMessages.email.invalid;
    errorMessage['required.mobile'] = validationMessages.mobile.required;
    errorMessage['max.emailOTP'] = 'Please enter correct otp';
    errorMessage['max.mobileOTP'] = 'Please enter correct otp';
    errorMessage["min.mobile"] = validationMessages.mobile.min;
    errorMessage["max.mobile"] = validationMessages.mobile.max;
    this.validatorTypes = strategy.createInactiveSchema(
      fieldObject,
      errorMessage
    );
  }

  componentWillMount() {

    let _this = this;
    let data = {
      userId: _this.props.userInfo.userData.id,
      roleId: _this.props.userInfo.userData.userRole
    };
    this.props.actionLoaderShow()
    this.props
      .actionGetUserDetails(data)
      .then((result, error) => {
        this.setState({
          userDetails: result.payload.data.resourceData,
          firstName: result.payload.data.resourceData.firstName,
          lastName: result.payload.data.resourceData.lastName,
          email: result.payload.data.resourceData.email,
          mobile: result.payload.data.resourceData.mobile,
          updatedMobile: result.payload.data.resourceData.mobile,
          globalPurchasingCode:
            result.payload.data.resourceData.globalPurchasingCode,
          mobileVerified: result.payload.data.resourceData.mobileVerified,
          emailVerified: result.payload.data.resourceData.emailVerified,
          profileImageURL: result.payload.data.resourceData.profileImageURL,
          companyLogoUrl: result.payload.data.resourceData.companyLogoUrl,
          profileImageURL:
            result.payload.data.resourceData.profileImageURL,
          companyLogoURL:
            result.payload.data.resourceData.companyLogoURL,
          nonDisclosureAgreement: result.payload.data.resourceData.nonDisclosureAgreement
        });
        this.props.actionLoaderHide()
      })
      .catch(e => _this.props.actionLoaderHide());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profilePhotoURL: nextProps.userInfo.userData.profilePhotoURL
    });
  }

  getClasses = field => {
    return classnames({
      error: !this.props.isValid(field)
    });
  };

  getValidatorData = () => {
    return this.state;
  };

  getValidationState(stateName) {
    if (
      this.props.getValidationMessages(stateName) === '' &&
      this.state[stateName] == ''
    )
      return null;
    else if (
      this.props.getValidationMessages(stateName) === '' &&
      this.state[stateName] !== ''
    )
      return 'success';
    else if (
      this.props.getValidationMessages(stateName) !== '' &&
      this.state[stateName] !== ''
    )
      return 'error';
    else if (
      this.props.getValidationMessages(stateName) !== '' &&
      this.state[stateName] === ''
    )
      return 'error';
  }

  navigateTo(data) {
    this.props.actionTabClick(data);
  }

  activeTabKeyAction(tabKey) {
    if (tabKey === 'first')
      this.context.router.history.push({
        pathname: 'home',
        state: { path: 'first' }
      });
    if (
      this.context.router.location &&
      this.context.router.location.pathname === '/userProfile'
    ) {
      if (tabKey === 'second') this.context.router.history.push('home');
    }
    if (tabKey === 'third')
      this.context.router.history.push({
        pathname: 'home',
        state: { path: 'third' }
      });
    this.setState({ tabKey: tabKey });
  }

  static contextTypes = {
    router: PropTypes.object
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleLogout() {
    try {
      const roleId = this.props.userInfo.userData.userRole;
      const userId = this.props.userInfo.userData.id;
      this.props.actionUserLogout({ roleId, userId });
    } catch (error) { }
  }
  handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;
    if (name == 'firstName' || name == 'lastName' || name == 'globalPurchasingCode') {
      if (value) value = specialCharacter(value);
      else value = value;
    }
    this.setState({
      [name]: value
    });
  }

  handleVerifyOtp(e, key) {
    let roleId = this.props.userInfo.userData.userRole;
    let userId = this.props.userInfo.userData.id;
    let email = this.props.userInfo.userData.email;
    let _this = this;
    let data = {
      userId,
      roleId,
      email,
      key
    };

    _this.props.actionLoaderShow();
    this.props
      .actionSendOtpForUPdate(data)
      .then((result, error) => {
        _this.props.actionLoaderHide();
        if (key === 'email')
          _this.setState({
            emailOtpSend: true
          });
        if (key === 'mobile') {
          this.setState({
            mobileOtpSend: true
          });
        }
      })
      .catch(e => _this.props.actionLoaderHide());
  }
  validateData = e => {
    this.applyValidation();
    let _this = this;
    e.preventDefault();
    this.props.validate(function (error) {
      if (!error) {
        _this.handleSubmit(e);
      }
    });
  };

  handleSubmit(e) {
    let roleId = this.props.userInfo.userData.userRole;
    let userId = this.props.userInfo.userData.id;
    let _this = this;
    let nonDisclosure = this.state.nonDisclosureAgreement;
    let mediaURL = this.state.profileImageURL;
    if (this.state.profileImageURL) {
      mediaURL = this.state.profileImageURL;
    }
    let companyURL = this.state.companyLogo;
    if (this.state.companyLogo) {
      companyURL = this.state.companyLogo;
    }
    if (nonDisclosure && nonDisclosure.mediaURL) {
      nonDisclosure.mediaURL = '' // As Per As Server side con
    }
    let globalPurchasingCode = this.state.globalPurchasingCode;
    if (this.state.globalPurchasingCode === undefined ||
      this.state.globalPurchasingCode === '') {
      globalPurchasingCode = '' //this.state.purchaseRequestNumber;
    }

    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      mobile: this.state.mobile,
      mobileOTP: this.state.mobileOTP,
      emailOTP: this.state.emailOTP,
      userId,
      roleId,
      email: this.state.email,
      globalPurchasingCode: globalPurchasingCode,
      nonDisclosureAgreement: nonDisclosure
    };

    this.props
      .actionUpdateUserProfile(data)
      .then((result, error) => {
        _this.props.actionLoaderHide();
        showSuccessToast("Profile updated successfully");
        this.setState({
          userDetails: result.payload.data.resourceData,
          firstName: result.payload.data.resourceData.firstName,
          lastName: result.payload.data.resourceData.lastName,
          email: result.payload.data.resourceData.email,
          mobile: result.payload.data.resourceData.mobile,
          updatedMobile: result.payload.data.resourceData.mobile,
          //userProfile: result.payload.data.resourceData.userProfile,
          mobileVerified: result.payload.data.resourceData.mobileVerified,
          emailVerified: result.payload.data.resourceData.emailVerified,
          profileImageURL:
            result.payload.data.resourceData.profileImageURL,
          companyLogoURL:
            result.payload.data.resourceData.companyLogoURL,
          emailOTP: '',
          emailOTP: '',
          globalPurchasingCode:
            result.payload.data.resourceData.globalPurchasingCode,
          nonDisclosureAgreement: result.payload.data.resourceData.nonDisclosureAgreement
        });
      })
      .catch(e => _this.props.actionLoaderHide());

    // this.state.contactArray;
  }

  handleImageChange = (action, event) => {
    this.setState({ imageSource: '' });
    const file = event.target.files[0];
    let mediaExtension = '';
    let errorMsg = [];
    let showError = '';
    if (file.name)
      mediaExtension = file.name.split(".").pop(-1);
    if (file && fileExtensionProfile(mediaExtension)) {
      const fileName = file.name;
      const fileType = file.type;
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = event => {
        this.setState({
          imageSource: event.target.result,
          imageName: fileName,
          imageType: fileType,
          action: action
        });
      };
    } else {
      errorMsg.push(validationMessages.part.formatWrong);
    }

    if (errorMsg && errorMsg.length > 0) {
      let unique = [...new Set(errorMsg)];
      showError = unique.join(',\r\n');
      showErrorToast(showError);
    }
  };

  uploadImageToAzure(file) {
    let userId = this.state.userId;
    let type = this.state.action;
    let sasToken = this.state.sasToken;

    if (file !== '') {
      type === 1
        ? this.setState({ loader1: true, profileImage: '' })
        : this.setState({ loader2: true, coverImage: '' });

    }
  }
  _crop() {
    // image in dataUrl
  }

  handleGetData(imageSource, type) {
    let roleId = this.props.userInfo.userData.userRole;
    let userId = this.props.userInfo.userData.id;
    if (type === 1 && imageSource != '') {
      let profileImageURLWithF = imageSource.id;
      var profileImageId = profileImageURLWithF;

      let data = {
        userId,
        roleId,
        profileImageId
      };
      this.handleSubmitImages(data, type);

    } else if (type === 2 && imageSource != '') {
      let profileImageURLWithF = imageSource.id;
      var companyLogoId = profileImageURLWithF;
      let data = {
        userId,
        roleId,
        companyLogoId
      };
      this.handleSubmitImages(data, type);

    }
  }


  handleSubmitImages(data, action) {
    let _this = this;
    this.props
      .actionUpdateUserProfile(data)
      .then((result, error) => {
        _this.props.actionLoaderHide();
        if (action === 1) {
          this.setState({
            profileImageURL:
              result.payload.data.resourceData.profileImageURL,
            profileImageURL: result.payload.data.resourceData.profileImageURL
          });

          if (result.payload.data.resourceData && result.payload.data.resourceData.profileImageURL) {
            this.props
              .actionChangeUserProfileLogo(result.payload.data.resourceData.profileImageURL)
              .then((result, error) => {
              })
              .catch(e => _this.props.actionLoaderHide());
          }
          //this.history.push.
        } else if (action === 2) {
          this.setState({
            companyLogoURL:
              result.payload.data.resourceData.companyLogoURL,
            companyLogoURL: result.payload.data.resourceData.companyLogoURL
          }, () => {

          });
          //  this.props.handleCheckData(this.state.companyLogoURL, 2);
          let dataCompany = {
            companyProfileURL:
              result.payload.data.resourceData.profileImageURL
          };
          this.props
            .actionChangeUserCompanyLogo(dataCompany)
            .then((result, error) => { })
            .catch(e => _this.props.actionLoaderHide());
        }
      })
      .catch(e => _this.props.actionLoaderHide());
  }


  handleNdaDocUpload(event) {
    let _this = this;
    let mediaExtension = '';
    let errorMsg = [];
    let showError = '';
    let fileObject = event.target.files[0];
    if (fileObject.name)
      mediaExtension = fileObject.name.split(".").pop(-1);
    let nameString = fileObject.name.split('.')[0];
    if (fileObject && documentExtension(mediaExtension) &&
      !checkForSpecialChar(nameString) && imageSize(fileObject.size)) {
      const formData = new FormData();
      formData.set('mFile', fileObject);
      formData.append('thumbnailHeight', 100);
      formData.append('thumbnailWidth', 100);
      formData.append('isCreateThumbnail', true);
      formData.append('fileKey', fileObject.name);
      formData.append('filePath', fileObject.name);
      this.props.actionLoaderShow();
      this.props
        .actionUploadDoc(formData)
        .then((result, error) => {
          let response = result.payload.data.resourceData;
          if (result.payload.data.status == 400) {
            showErrorToast(result.payload.data.responseMessage)
          }
          var reqObject = {};
          let mediaExtension = response.fileName.split('.').pop(-1);
          reqObject['mediaName'] = response.fileName;
          reqObject['mediaURL'] = response.fileByteArray;
          reqObject['mediaSize'] = response.fileSize;
          reqObject['mediaExtension'] = mediaExtension;
          reqObject['mediaType'] = response.contentType;
          reqObject['id'] = response.id;
          _this.setState({ nonDisclosureAgreement: reqObject });
          _this.props.actionLoaderHide();
        })

        .catch(e => {
          _this.props.actionLoaderHide();
        });
    }
    else {
      errorMsg.push(validationMessages.part.formatWrong);
    }
    if (errorMsg && errorMsg.length > 0) {
      let unique = [...new Set(errorMsg)];
      showError = unique.join(',\r\n');
      showErrorToast(showError);
    }
  }
  deleteConfirmation(event, index) {
    this.setState({
      deleteConformationModal: true,
    });
  }

  handleCloseConformation(event) {
    this.setState({
      deleteConformationModal: false
    });
  }

  handleDeleteNdaDoc() {
    let _this = this;
    let fileId = '';
    this.handleCloseConformation();
    fileId = this.state.nonDisclosureAgreement.id;
    _this.props
      .actionDeleteDoc(fileId)
      .then((result, error) => {
        _this.props.actionLoaderShow();
        this.deleteNDADocument();
        this.setState({ nonDisclosureAgreement: {} });
        _this.props.actionLoaderHide();
      })
      .catch(e => {
        _this.props.actionLoaderHide();
      });
  }
  openDocument(event, data) {
    window.open(data);
  }

  deleteNDADocument(e) {
    let roleId = this.props.userInfo.userData.userRole;
    let userId = this.props.userInfo.userData.id;
    let _this = this;
    let data = {
      nonDisclosureAgreement: {
        mediaName: this.state.nonDisclosureAgreement.mediaName,
        mediaURL: this.state.nonDisclosureAgreement.mediaURL,
        mediaSize: this.state.nonDisclosureAgreement.mediaSize,
        mediaExtension: this.state.nonDisclosureAgreement.mediaExtension,
        mediaType: this.state.nonDisclosureAgreement.mediaType,
        id: this.state.nonDisclosureAgreement.id,
        isDeleted: true
      },
      isDeleted: true,
      roleId,
      userId
    };

    this.props
      .actionUpdateUserProfile(data)
      .then((result, error) => {
        if (result.payload.data.status == 200) {
          this.setState({
            userDetails: result.payload.data.resourceData,
            firstName: result.payload.data.resourceData.firstName,
            lastName: result.payload.data.resourceData.lastName,
            email: result.payload.data.resourceData.email,
            mobile: result.payload.data.resourceData.mobile,
            updatedMobile: result.payload.data.resourceData.mobile,
            mobileVerified: result.payload.data.resourceData.mobileVerified,
            emailVerified: result.payload.data.resourceData.emailVerified,
            profileImageURL:
              result.payload.data.resourceData.profileImageURL,
            companyLogoURL:
              result.payload.data.resourceData.companyLogoURL,
            emailOTP: '',
            emailOTP: '',
            globalPurchasingCode:
              result.payload.data.resourceData.globalPurchasingCode,
            nonDisclosureAgreement: {}
          });
        }
        _this.props.actionLoaderHide();
      })
      .catch(e => _this.props.actionLoaderHide());
  }
  actionOnUpload(event) {
    toast.dismiss();
  }
  render() {
    return (
      <div>
        <ToastContainer
          autoClose={5000}
          className="custom-toaster-main-cls"
          toastClassName="custom-toaster-bg"
          transition={ZoomInAndOut}
        />
        {this.state.imageSource ? (
          <ImageCropper
            imageSource={this.state.imageSource}
            imageName={this.state.imageName}
            imageType={this.state.imageType}
            aspectRatio={this.state.action === 1 ? 16 / 9 : 16 / 9}
            modalSize={this.state.action === 1 ? 'large' : 'large'}
            cropBoxWidth={this.state.action === 1 ? '900' : '900'}
            cropBoxHeight={this.state.action === 1 ? '900' : '900'}
            action={this.state.action}
            handleCheckData={this.handleGetData}
          />
        ) : null}

        {this.props.userInfo.userData.userRole === 2 ? (
          <div>
            <SideBarSupplier activeTabKeyAction={this.activeTabKeyAction} />
          </div>
        ) : ''}
        {this.state.tabKey === 'userProfile' ? (
          <div>
            <div className={this.props.userInfo.userData.userRole === 1 ? "content-section" : "content-body flex"}>
              <div className={this.props.userInfo.userData.userRole === 1 ? "" : "content"}>
                <div className="userMain">
                  <div className={this.props.userInfo.userData.userRole === 1 ? "" : "container-fluid"}>
                    <div className="userWrapper flex align-center justify-space-between profiletop">
                      <h4>
                        Welcome {this.state.firstName} {this.state.lastName} to
                        your profile
                      </h4>
                      <div>
                        <div className="upload-btn cursor-pointer sm-upload">
                          <FormControl
                            id="formControlsFile"
                            type="file"
                            autoComplete="off"
                            label="File"
                            onChange={this.handleImageChange.bind(this, 1)}
                            onClick={(event) => {
                              event.target.value = null;
                              this.actionOnUpload(event);
                            }}
                            accept={
                              customConstant.acceptedFormat.profileImageAcceptFormatType
                            }
                          />

                          <div className="uAvtar">
                            <img
                              src={
                                this.state.profileImageURL
                                  ? this.state.profileImageURL
                                  : userImage
                              }
                            />
                          </div>
                          <h4 className="m-b-0 m-t-5">Edit Picture</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <section className="uInfoContainer style-form1 profileWrapp user_profile">
                  {!this.props.userInfo.userData.isAdmin ? (
                    <h4 className="hero-title m-b-50">
                      Please contact admin to update profile.
                    </h4>
                  ) : null}

                  <Row className="show-grid">
                    <Col md={6} className="">
                      <FormGroup className="group">
                        <span className="ico-in">
                          <svg>
                            <use xlinkHref={`${Sprite}#userIco`} />
                          </svg>
                        </span>
                        <FormControl
                          type="text"
                          name="firstName"
                          autoComplete="off"
                          required
                          value={this.state.firstName}
                          onChange={this.handleChange}
                          disabled={!this.props.userInfo.userData.isAdmin}
                          minLength={customConstant.inputMinLength}
                          maxLength={customConstant.inputTextLength}
                        />
                        <FormControl.Feedback />
                        <span className="highlight" />
                        <span className="bar" />
                        <ControlLabel>First Name</ControlLabel>
                        {renderMessage(
                          this.props.getValidationMessages('firstName')
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6} className="">
                      <FormGroup className="group">
                        <span className="ico-in">
                          <svg>
                            <use xlinkHref={`${Sprite}#mobileIco`} />
                          </svg>
                        </span>
                        <FormControl
                          type="text"
                          name="lastName"
                          autoComplete="off"
                          required
                          value={this.state.lastName}
                          onChange={this.handleChange}
                          disabled={!this.props.userInfo.userData.isAdmin}
                          minLength={customConstant.inputMinLength}
                          maxLength={customConstant.inputTextLength}
                        />
                        <FormControl.Feedback />
                        <span className="highlight" />
                        <span className="bar" />
                        <ControlLabel>Last Name</ControlLabel>
                        {renderMessage(
                          this.props.getValidationMessages('lastName')
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="show-grid">
                    <Col md={6} className="">
                      <FormGroup className="group mobile-input mbgp mobile_space">
                        <span className="ico-in">
                          <svg>
                            <use xlinkHref={`${Sprite}#mobileIco`} />
                          </svg>
                        </span>

                        <PhoneInput
                          className="form-control br-0 boxShnone"
                          placeholder="Mobile Number"
                          disabled={!this.props.userInfo.userData.isAdmin}
                          value={
                            this.state.mobile
                          }
                          onChange={value =>
                            this.handleChange(
                              {
                                target: { name: "mobile", value }
                              },
                              "mobile"
                            )
                          }
                          name="mobile"
                          country={this.state.countryCode}
                        />

                        {renderMessage(
                          this.props.getValidationMessages('mobile')
                        )}
                        <ControlLabel>Mobile Number</ControlLabel>
                      </FormGroup>
                    </Col>



                    <Col md={6} className="">
                      {this.props.userInfo.userData.isAdmin ?
                        <FormGroup className="group">
                          <span className="ico-in">
                            <svg>
                              <use xlinkHref={`${Sprite}#envelopIco`} />
                            </svg>
                          </span>

                          <FormControl
                            type="text"
                            autoComplete="off"
                            name="email"
                            required
                            value={this.state.email}
                            onChange={this.handleChange}
                            disabled={!this.props.userInfo.userData.isAdmin}
                            minLength={customConstant.inputMinLength}
                            maxLength={customConstant.inputTextLength}
                          />
                          <FormControl.Feedback />
                          <span className="highlight" />
                          <span className="bar" />
                          <ControlLabel>Email</ControlLabel>

                          {this.state.emailVerified ? (
                            ''
                          ) : (
                              <p
                                className="verify cursor-pointer"
                                onClick={e => this.handleVerifyOtp(e, 'email')}
                              >
                                Verify
                              </p>
                            )}
                          {!this.state.emailVerified &&
                            this.state.emailOtpSend ? (
                              <input
                                type="text"
                                className="e-otp"
                                placeholder="Enter OTP"
                                name="emailOTP"
                                value={this.state.emailOTP}
                                onChange={this.handleChange}
                                max="6"
                              />
                            ) : (
                              ''
                            )}
                          {renderMessage(
                            this.props.getValidationMessages('email')
                          )}
                          {renderMessage(
                            this.props.getValidationMessages('emailOTP')
                          )}
                        </FormGroup> :
                        <FormGroup className="group">
                          <span className="ico-in">
                            <svg>
                              <use xlinkHref={`${Sprite}#envelopIco`} />
                            </svg>
                          </span>

                          <FormControl
                            type="text"
                            autoComplete="off"
                            name="email"
                            required
                            value={this.state.email}
                            onChange={this.handleChange}
                            disabled={!this.props.userInfo.userData.isAdmin}
                            minLength={customConstant.inputMinLength}
                            maxLength={customConstant.inputTextLength}
                          />
                          <FormControl.Feedback />
                          <span className="highlight" />
                          <span className="bar" />
                          <ControlLabel>Email</ControlLabel>
                        </FormGroup>
                      }
                    </Col>

                  </Row>

                  <Row>
                    {this.props.userInfo.userData.userRole === 1 ? (
                      <Col md={6}>
                        <FormGroup className="group">
                          <span className="ico-in">
                            <svg>
                              <use xlinkHref={`${Sprite}#userIco`} />
                            </svg>
                          </span>
                          <FormControl
                            type="text"
                            name="globalPurchasingCode"
                            autoComplete="off"
                            value={
                              this.state.globalPurchasingCode
                                ? this.state.globalPurchasingCode
                                : ''
                            }
                            onChange={this.handleChange}
                            disabled={!this.props.userInfo.userData.isAdmin}
                            minLength={customConstant.inputMinLength}
                            maxLength={customConstant.inputTextLength}
                            required
                          />
                          <FormControl.Feedback />
                          <span className="highlight" />
                          <span className="bar" />
                          <ControlLabel>Global Purchasing code</ControlLabel>
                        </FormGroup>
                      </Col>
                    ) : ''}
                    <Col md={6}>
                      <div>
                        <div className="profile-chng">
                          <div className="upload-btn cursor-pointer sm-upload once-upload btn-block">
                            <label className="upload-label">Uplaod NDA</label>
                            {this.state.nonDisclosureAgreement && this.state.nonDisclosureAgreement.mediaType ? (
                              <ul className="upload-list b-btm">
                                <li className="flex justify-space-between align-center">
                                  <ShowDocument
                                    width="25"
                                    height="25"
                                    mediaResponse={this.state.nonDisclosureAgreement}
                                    imageIsShow={false} />
                                  {this.props.userInfo.userData && this.props.userInfo.userData.isAdmin && this.props.userInfo.userData.isAdmin ? (
                                    <span
                                      className="ico-delete cursor-pointer"
                                      onClick={event =>
                                        this.deleteConfirmation(event)
                                      }
                                    >
                                      <svg>
                                        <use xlinkHref={`${Sprite}#deleteIco`} />
                                      </svg>
                                    </span>
                                  ) : ''}
                                </li>
                              </ul>
                            ) : (
                                <FormGroup className="mb-0">
                                  <div className={this.props.userInfo.userData.isAdmin ?
                                    "upload-btn sm-upload text-center cursor-pointer text-uppercase ven-up" :
                                    "upload-btn sm-upload text-center disabled text-uppercase ven-up"}
                                  >
                                    <FormControl
                                      id="formControlsFile"
                                      type="file"
                                      autoComplete="off"
                                      label="File"
                                      onClick={(event) => {
                                        event.target.value = null;
                                        this.actionOnUpload(event)
                                      }}
                                      accept={customConstant.acceptedFormat.documentAcceptFormatType}
                                      disabled={
                                        !this.props.userInfo.userData.isAdmin
                                      }
                                      onChange={event => {
                                        this.handleNdaDocUpload(event);
                                      }}
                                    />
                                    <span className="ico-upload">
                                      <svg>
                                        <use xlinkHref={`${Sprite}#upload1Ico`} />
                                      </svg>
                                    </span>

                                  </div>
                                  {this.state.ndaError ? (
                                    <span className="error">
                                      {validationMessages.vendor.nda.required}
                                    </span>
                                  ) : null}

                                </FormGroup>
                              )}
                          </div>
                          <span className="greyclr msg-sm m-b-20">Supported File Format: {customConstant.acceptedFormat.documentAcceptFormat}</span>

                        </div>
                      </div>
                    </Col>

                    <Col md={7} mdOffset={2}>
                      {' '}
                      {this.props.userInfo.userData.isAdmin ? (
                        <div className="editLogo m-b-30 text-center">

                          <div className="gray-card editLogoBox text-center">
                            <div className="upload-btn cursor-pointer sm-upload">
                              <FormControl
                                id="formControlsFile"
                                type="file"
                                label="File"
                                autoComplete="off"
                                onChange={this.handleImageChange.bind(this, 2)}
                                accept={
                                  customConstant.acceptedFormat.profileImageAcceptFormatType
                                }
                                onClick={(event) => {
                                  event.target.value = null;
                                  this.actionOnUpload(event);
                                }}
                              />
                              <div className="logoImg">
                                {this.state.companyLogoURL ? (
                                  <img
                                    src={
                                      this.state.companyLogoURL
                                        ? this.state.companyLogoURL
                                        : userImage
                                    }
                                  />
                                ) : (
                                    <span className="pic-Icon">
                                      <svg>
                                        <use xlinkHref={`${Sprite}#editPicIco`} />
                                      </svg>
                                    </span>
                                  )}
                              </div>
                              <p className="m-b-0">Company Logo</p>
                            </div>
                          </div>
                          <span className="greyclr msg-sm">Supported File Format: {customConstant.acceptedFormat.profileImageAcceptFormat}</span>
                        </div>
                      ) : (
                          ''
                        )}
                    </Col>
                  </Row>

                  <div className="text-center m-t-20 m-b-20">
                    <button
                      className="btn yellow-bg-btn m-b-20"
                      onClick={e => this.validateData(e)}
                      disabled={!this.props.userInfo.userData.isAdmin}
                    >
                      Save
                    </button>

                  </div>
                </section>
              </div>
              {this.props.userInfo.userData.userRole === 2 ? (
                <FooterSupplier
                  pageTitle={permissionConstant.footer_title.user_profile}
                />
              ) : ''}
            </div>
            {/* ) : null} */}
          </div>
        ) : null}

        <Modal
          show={this.state.deleteConformationModal}
          onHide={this.handleCloseConformation}
          className="custom-popUp confirmation-box"
          bsSize="small"
        >
          <Modal.Body>
            <div className="">
              <h5 className="text-center">
                Are you sure you want to delete this?
              </h5>
              <div className="text-center">
                <button
                  className="btn btn-solid-blue sm-btn"
                  onClick={event => this.handleDeleteNdaDoc(event)}
                >
                  OK
                </button>
                <button
                  className="btn btn-outline-blue sm-btn"
                  onClick={this.handleCloseConformation}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionUserLogout,
      actionUpdateUserProfile,
      actionLoaderHide,
      actionLoaderShow,
      actionTabClick,
      actionGetUserDetails,
      actionSendOtpForUPdate,
      actionUploadDoc,
      actionDeleteDoc,
      actionChangeUserProfileLogo,
      actionChangeUserCompanyLogo
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.User
  };
};

userProfile = validation(strategy)(userProfile);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userProfile);
