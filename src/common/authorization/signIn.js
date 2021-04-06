import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel, Modal } from 'react-bootstrap';
import {
  actionUserSessionlogout,
  actionUserLogout,
  actionUserProfileImage,
  actionGetLoginDetails,
} from '../../common/core/redux/actions';
import * as qs from "query-string";
import Sprite from '../../img/sprite.svg';
import Logo from '../../img/logo.png';
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy';
import classnames from 'classnames';
import CONSTANTS from '../core/config/appConfig';
import lockImage from '../../img/lock.png';
import { renderMessage, showErrorToast, showSuccessToast } from '../commonFunctions';
import { ToastContainer } from 'react-toastify';
import { ZoomInAndOut, getLocalStorage } from '../../common/commonFunctions';
import * as R from 'ramda';
import JSEncrypt from 'jsencrypt';

let { validationMessages, customConstant } = CONSTANTS;
let { regExpressions } = CONSTANTS;
// Public key for encrypt
let pub_key = customConstant.publicKeyRSA;
class SignIn extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      userName: '',
      password: '',
      roleId: 2,
      typePass: 'password',
      showLoggedUser: false,
      isResetPassPage: false,
    };

    this.userType = '';
    this.roleIdObj = {
      buyer: 1,
      supplier: 2
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLoggedUser = this.handleLoggedUser.bind(this);
    this.state = {
      show: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegisterNavigation = this.handleRegisterNavigation.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.getValidatorData = this.getValidatorData.bind(this);
    this.validateData = this.validateData.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.eyeClick = this.eyeClick.bind(this);
    this.closeHandleLoggedUser = this.closeHandleLoggedUser.bind(this);

    this.validatorTypes = strategy.createSchema(
      {
        userName: 'required|email',
        password: ['required', 'regex:' + regExpressions.passwordPattern]
      },
      {
        'required.userName': validationMessages.email.required,
        'email.userName': validationMessages.email.invalid,
        'required.password': validationMessages.password.required,
        'regex.password': validationMessages.password.passwordPattern
      }
    );
  }

  componentWillMount() {
    this.setState({ typePass: 'password' });

    if (this.props.userInfo.userData.id && this.props.userInfo.userData.userRole == 1) {
      this.props.history.push({ pathname: '/home' })
    }
    if (this.props.userInfo.userData.id && this.props.userInfo.userData.userRole == 2) {
      this.props.history.push({ pathname: '/supplier/home' })
    }

    if (this.props.userInfo.userData.id && this.props.userInfo.userData.userRole == 3) {
      this.props.history.push({ pathname: '/support/companyApproval' })
    }
  }

  componentDidMount() {
    const parsed = qs.parse(window.location.search);
    if (parsed && parsed.x !== undefined && parsed.x && parsed.y !== undefined && parsed.y) {
      let accessToken = parsed.x;
      let rId = parsed.y;
      this.handleLogout(accessToken, rId);
    }
  }

  handleLogout(accessToken, roleId) {
    try {
      let _this = this;
      this.props
        .actionUserSessionlogout({ roleId, accessToken })
        .then((result, error) => {
          this.props.history.push({ pathname: '/signin' })
        })
        .catch(e => console.log(e));
    } catch (error) { }
  }


  handleClose() {
    this.props.clearValidations();
    this.setState({ show: false, email: '' });
  }

  handleShow() {
    this.setState({ show: true, email: '' });
  }

  getValidatorData = () => {
    return this.state;
  };

  getClasses = field => {
    return classnames({
      error: !this.props.isValid(field)
    });
  };

  getValidationState(stateName) {
    if (
      this.props.getValidationMessages(stateName) == '' &&
      this.state[stateName] == ''
    )
      return null;
    else if (
      this.props.getValidationMessages(stateName) == '' &&
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
      this.state[stateName] == ''
    )
      return 'error';
  }

  handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;
    if (name == 'userName') {
      value = value.trim();
    }

    this.setState({
      [name]: value
    });
  }

  handleLogin(e) {
    let uid = getLocalStorage('userInfo') && getLocalStorage('userInfo').id ? getLocalStorage('userInfo').id : '';
    let rid = getLocalStorage('userInfo') && getLocalStorage('userInfo').userRole ? getLocalStorage('userInfo').userRole : ''
    if (uid && (rid == 1 || rid == 2 || rid == 3)) {
      this.userLoggedIn();
    } else {

      const userName = this.state.userName;
      // const password = btoa(this.state.password);
      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(pub_key)
      const password = encrypt.encrypt(this.state.password);

      const roleId = this.props.userInfo.userType === 'buyer' ? 1 : 2;
      let baseURL = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
      //converted to Base64
      let buff = new Buffer(baseURL);
      const hostName = buff.toString('base64');
      let TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let TZBuff = new Buffer(TZ);
      const timeZone = TZBuff.toString('base64');

      let _this = this;

      this.props
        .actionUserLogin({ userName, password, roleId, hostName, timeZone })
        .then((result, error) => {
          if (result.payload.data.error == 'unverifed_user') {
            showErrorToast(result.payload.data.error_description);
          } else if (result.payload.data.error == 'invalid_token') {
            showErrorToast(result.payload.data.error_description);
          } else {
            if (result.payload.status === 200) {
              _this.props
                .actionUserProfileImage({ userId: this.props.userInfo.userData.id })
                .then((result, error) => {

                })
                .catch(e => _this.props.actionLoaderHide());
              _this.props
                .actionGetLoginDetails({ userId: this.props.userInfo.userData.id })
                .then((result, error) => {
                  let orgId = this.props.userInfo.userData.userRole === 1 ? "buyerId" : "supplierId";
                })
                .catch(e => _this.props.actionLoaderHide());
            }

          }

        })
        .catch(e => _this.props.actionLoaderHide());
    }
  }

  handleRegisterNavigation() {

    let path = this.props.location.pathname;

    try {
      switch (path) {
        case '/signin':
          this.props.history.push('/signup');
          break;
        case '/supplier/signin':
          this.props.history.push('/supplier/signup');
          break;
        default:
          break;
      }
    } catch (error) { }
  }

  validateData = (e, actionType) => {
    this.setState({ isResetPassPage: true });
    this.applyValidation(actionType);
    e.preventDefault();
    let _this = this;
    this.props.validate(function (error) {
      if (!error) {
        if (actionType === 'forgotPassword') _this.handleForgotPassword();
        else _this.handleLogin(e);
      }
    });
  };

  applyValidation(actionType) {
    let _this = this;

    let fieldObject = {};
    let errorMessage = {};
    if (actionType === 'forgotPassword') {
      fieldObject = {
        email: 'required|email'
      };
      errorMessage = {
        'required.email': validationMessages.email.required,
        'email.email': validationMessages.email.invalid
      };
    } else {
      fieldObject = {
        userName: 'required|email',
        password: 'required'
      };
      errorMessage = {
        'required.userName': validationMessages.email.required,
        'email.userName': validationMessages.email.invalid,
        'required.password': validationMessages.password.required,
      };
    }
    this.validatorTypes = strategy.createInactiveSchema(
      fieldObject,
      errorMessage
    );
  }

  handleForgotPassword(e) {
    const email = this.state.email;
    const roleId = this.props.userInfo.userType === 'buyer' ? 1 : 2;
    let _this = this;

    this.props
      .actionForgotPassword({ email, roleId })
      .then((result, error) => {
        if (result.payload.data.status === 200) {
          this.setState({ show: false });
        }
      })
      .catch(e => _this.props.actionLoaderHide());
  }
  eyeClick() {
    let typePass = this.state.typePass;
    this.setState({ typePass: !typePass });
  }


  userLoggedIn = (e) => {
    this.setState({ showLoggedUser: true }, () => { })
  }

  closeHandleLoggedUser() {
    this.setState({ showLoggedUser: false }, () => { })
  }

  handleLoggedUser() {
    this.handleUserLogout()
    this.setState({ showLoggedUser: false }, () => { })
  }

  handleUserLogout = () => {
    let _this = this;
    let uid = getLocalStorage('userInfo') && getLocalStorage('userInfo').id ? getLocalStorage('userInfo').id : '';
    let rid = getLocalStorage('userInfo') && getLocalStorage('userInfo').userRole ? getLocalStorage('userInfo').userRole : '';
    if (uid && rid) {
      let data = {
        userId: uid,
        roleId: rid,
      }
      this.props.actionLoaderShow();
      this.props
        .actionUserLogout(data)
        .then((result, error) => {
          this.props.history.push('/signin');
          _this.props.actionLoaderHide();
        })
        .catch(e => _this.props.actionLoaderHide());
    }
  }

  render() {

    let _this = this
    return (
      <div class="signin_chatdata loginDesing">
        <div className="flex justify-flex-end  mr-30 m-t-30 supplierLogin">
        </div>
        <div className="centeredBox">
          {!this.state.isResetPassPage && this.props.location.state && this.props.location.state.isResetPassPage ? '' :
            <ToastContainer
              autoClose={3000}
              className="custom-toaster-main-cls"
              toastClassName="custom-toaster-bg"
              transition={ZoomInAndOut}
              closeOnClick="true"
            />}

          <div className="logo-area text-center">
            <img src={Logo} alt="" />
          </div>

          <form>
            <FormGroup
              className="group"
            >
              <span className="ico-in">
                <svg>
                  <use xlinkHref={`${Sprite}#userIco`} />
                </svg>
              </span>
              <FormControl
                type="text"
                autoComplete="off"
                value={this.state.userName}
                onChange={this.handleChange}
                onBlur={this.props.handleValidation('userName')}
                name="userName"
                required
                minLength={customConstant.inputMinLength}
                maxLength={customConstant.inputTextLength}
              />
              <FormControl.Feedback />
              <span className="highlight" />
              <span className="bar" />
              {renderMessage(this.props.getValidationMessages('userName'))}
              <ControlLabel>Email</ControlLabel>
            </FormGroup>
            <FormGroup
              className="group m-b-0"
            >
              <span className="ico-in">
                <svg>
                  <use xlinkHref={`${Sprite}#lockIco`} />
                </svg>
              </span>
              <FormControl
                type={this.state.typePass ? 'password' : 'text'}
                value={this.state.password}
                onChange={this.handleChange}
                name="password"
                autoComplete="off"
                required
                maxLength={80}
                minLength={1}
              />
              <FormControl.Feedback />
              <span className="highlight" />
              <span className="bar" />
              {renderMessage(this.props.getValidationMessages('password'))}
              <ControlLabel>Password</ControlLabel>
              {this.state.typePass ? (
                <span
                  className="ico-in eye-set cursor-pointer eyeright"
                  onClick={this.eyeClick}
                >
                  <svg>
                    <use xlinkHref={`${Sprite}#eyeCancelIco`} />
                  </svg>
                </span>
              ) : (
                  <span
                    className="ico-in eye-set cursor-pointer eyeright"
                    onClick={this.eyeClick}
                  >
                    <svg>
                      <use xlinkHref={`${Sprite}#eyeIco`} />
                    </svg>
                  </span>
                )}

            </FormGroup>
            <p className="fg-pwd text-color">
              <span className="cursor-pointer" onClick={this.handleShow}>
                Forgot Password?
            </span>
            </p>
            <button
              className="btn btn-primary btn-block btn-md"
              onClick={event => this.validateData(event, 'login')}
            >
              Login
          </button>
          </form>
          <div className="flex align-center brk">
            <hr />
            <span className="m-dot"> </span>
            <hr />
          </div>
          <p className="create-acc text-center">
            Create an account{' '}
            <a onClick={this.handleRegisterNavigation} className="cursor-pointer">
              REGISTER
          </a>
          </p>

          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            className="custom-popUp forgotpwdPop"
          >
            <img src={lockImage} className="lock-img" />

            <Modal.Body>
              <div className="p-20">
                <h4 className="fw-800 text-center">Forgot Password?</h4>
                <p className="text-center">
                  Reset your password by filling in your e-mail address. You will
                  then receive an email with a link that will let you enter a new
                  password.
              </p>
                <div className="p-lr-40">
                  <FormGroup className="group m-t-40 ">
                    <span className="ico-in">
                      <svg>
                        <use xlinkHref={`${Sprite}#envelopIco`} />
                      </svg>
                    </span>
                    <FormControl
                      type="text"
                      autoComplete="off"
                      value={this.state.email}
                      onChange={this.handleChange}
                      onBlur={this.props.handleValidation('email')}
                      name="email"
                      required
                      minLength={customConstant.inputMinLength}
                      maxLength={customConstant.inputTextLength}
                    />

                    <FormControl.Feedback />
                    <span className="highlight" />
                    <span className="bar" />
                    {renderMessage(this.props.getValidationMessages('email'))}
                    <ControlLabel>Email</ControlLabel>
                  </FormGroup>
                </div>

                <div className="flex align-center justify-space-between">
                  <button
                    className="btn btn-link text-uppercase sm-btn fw-600"
                    onClick={this.handleClose}
                  >
                    back to login
                </button>
                  <button
                    className="btn btn-default text-uppercase sm-btn"
                    onClick={event => this.validateData(event, 'forgotPassword')}
                  >
                    Reset my password
                </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            show={this.state.showLoggedUser}
            onHide={this.closeHandleLoggedUser}
            className="custom-popUp confirmation-box"
            bsSize="small"
          >
            <Modal.Body>
              <div className="">
                <h5 className="text-center">
                  User already logged in into same browser. Are you sure you want to logout ?
              </h5>

                <div className="text-center">
                  <button
                    className="btn btn-solid-blue sm-btn"
                    onClick={() => {
                      this.handleLoggedUser();
                    }}
                  >
                    Yes
                </button>
                  <button
                    className="btn btn-outline-blue sm-btn"
                    onClick={() => {
                      this.closeHandleLoggedUser();
                    }}
                  >
                    No
                </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionUserSessionlogout,
      actionUserLogout,
      actionUserProfileImage,
      actionGetLoginDetails,
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.User,
    supplierParts: state.supplierParts,
    buyerId: R.pathOr('', ['User', 'userData', 'buyerId'], state),
  };
};

SignIn = validation(strategy)(SignIn);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);