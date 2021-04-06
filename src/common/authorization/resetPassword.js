import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";
import Sprite from "../../img/sprite.svg";
import Logo from "../../img/logo.png";
import validation from "react-validation-mixin";
import strategy from "react-validatorjs-strategy";
import classnames from "classnames";
import CONSTANTS from "../core/config/appConfig";
import lockImage from "../../img/lock.png";
import {
  renderMessage,
  showErrorToast,
  showSuccessToast,
} from "../commonFunctions";
import JSEncrypt from 'jsencrypt';

let { validationMessages, customConstant } = CONSTANTS;
let { regExpressions } = CONSTANTS;
// Public key for encrypt
let pub_key = customConstant.publicKeyRSA;
class ResetPassword extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      password: "",
      confirmPassword: "",
      roleId: 2,
      typeConfPass: "password",
      typeNewPass: "password"
    };

    this.userType = "";
    this.roleIdObj = {
      buyer: 1,
      supplier: 2
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.handleRegisterNavigation = this.handleRegisterNavigation.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.getValidatorData = this.getValidatorData.bind(this);
    this.validateData = this.validateData.bind(this);
    this.eyeNewClick = this.eyeNewClick.bind(this);
    this.eyeConfClick = this.eyeConfClick.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.validatorTypes = strategy.createSchema(
      {
        password: ["required", "regex:" + regExpressions.passwordPattern],
        confirmPassword: ["required", "regex:" + regExpressions.passwordPattern]
      },
      {
        "required.password": validationMessages.password.required,
        "regex.password": validationMessages.password.passwordPattern,
        "required.confirmPassword": validationMessages.password.required,
        "regex.confirmPassword": validationMessages.password.passwordPattern
      }
    );
  }
  componentWillMount() {
    this.setState({ typeConfPass: "password", typeNewPass: "password" });
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
      this.props.getValidationMessages(stateName) == "" &&
      this.state[stateName] == ""
    )
      return null;
    else if (
      this.props.getValidationMessages(stateName) == "" &&
      this.state[stateName] !== ""
    )
      return "success";
    else if (
      this.props.getValidationMessages(stateName) !== "" &&
      this.state[stateName] !== ""
    )
      return "error";
    else if (
      this.props.getValidationMessages(stateName) !== "" &&
      this.state[stateName] == ""
    )
      return "error";
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleResetPassword(e) {
    if (this.state.password === this.state.confirmPassword) {
      let token = "";
      if (this.props.location.search) {
        token = this.props.location.search.substring(
          this.props.location.search.indexOf("=") + 1
        );
      }
      const path = this.props.location.pathname;
      //const password = btoa(this.state.password);
      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(pub_key)
      const password = encrypt.encrypt(this.state.password);
      const roleId = path === "/resetPassword" ? 1 : 2;
      let _this = this;
      let data = {
        password: password,
        roleId: roleId,
        token: token
      };
      this.props
        .actionResetPassword(data)
        .then((result, error) => {
          if (result.payload.data.status == 200) {

            this.props.history.push({
              pathname: 'signin',
              state: { isResetPassPage: true }
            });

          } else if (result.payload.data.status == 422) {
            showErrorToast(result.payload.data.responseMessage);
          } else if (result.payload.data.status == 400) {
            showErrorToast(result.payload.data.responseMessage);
          } else if (result.payload.data.status == 500) {
            showErrorToast(result.payload.data.responseMessage);
          } else {
            showErrorToast("Somthing went wrong. ");
          }

        })
        .catch(e => _this.props.actionLoaderHide());
    } else {
      showErrorToast("Your password and Re-enter new password do not match.");

    }
  }

  handleRegisterNavigation() {
    let path = this.props.location.pathname;
    try {
      switch (path) {
        case "/signin":
          this.props.history.push("/signup");
          break;
        case "/supplier/signin":
          this.props.history.push("/supplier/signup");
          break;
        default:
          break;
      }
    } catch (error) { }
  }

  validateData = e => {
    e.preventDefault();
    let _this = this;
    this.props.validate(function (error) {
      if (!error) {
        _this.handleResetPassword(e);
      }
    });
  };
  eyeNewClick() {
    let typeNewPass = this.state.typeNewPass;
    this.setState({ typeNewPass: !typeNewPass });
  }
  eyeConfClick() {
    let typeConfPass = this.state.typeConfPass;
    this.setState({ typeConfPass: !typeConfPass });
  }

  handleBackButton() {
    this.props.history.push("/signin");
  }


  render() {
    return (
      <div>

        <div className="flex justify-space-between m-b-30 m-t-20 m-l-30">
          <div>
            <span
              className="ico-return pull-left cursor-pointer"
              onClick={this.handleBackButton}
              title="Go Back to login" >
              <svg>
                <use xlinkHref={`${Sprite}#backArrowIco`} />
              </svg>
            </span>
          </div>

          <div className="logo-area m-b-0 m-t-0">
            <img src={Logo} alt="" />
          </div>
          <div> </div>
        </div>


        <div className="centeredBox flex justify-center align-center flex-column">

          <h5 className="hero-heading text-center m-b-20">Password Recovery</h5>
          <form className="m-t-30 w-350">
            <FormGroup
              className="group"
            >
              <span className="ico-in">
                <svg>
                  <use xlinkHref={`${Sprite}#lockIco`} />
                </svg>
              </span>
              <FormControl
                type={this.state.typeNewPass ? "password" : "text"}
                value={this.state.password}
                onChange={this.handleChange}
                onBlur={this.props.handleValidation("password")}
                name="password"
                required
              />
              <FormControl.Feedback />
              <span className="highlight" />
              <span className="bar" />
              {renderMessage(this.props.getValidationMessages("password"))}
              <ControlLabel>New password</ControlLabel>
              {this.state.typeNewPass ? (
                <span
                  className="ico-in eye-set cursor-pointer eyeright"
                  onClick={this.eyeNewClick}
                >
                  <svg>
                    <use xlinkHref={`${Sprite}#eyeCancelIco`} />
                  </svg>
                </span>
              ) : (
                  <span
                    className="ico-in eye-set cursor-pointer eyeright"
                    onClick={this.eyeNewClick}
                  >
                    <svg>
                      <use xlinkHref={`${Sprite}#eyeIco`} />
                    </svg>
                  </span>
                )}
            </FormGroup>
            <FormGroup
              className="group"
            >
              <span className="ico-in">
                <svg>
                  <use xlinkHref={`${Sprite}#lockIco`} />
                </svg>
              </span>
              <FormControl
                type={this.state.typeConfPass ? "password" : "text"}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                onBlur={this.props.handleValidation("confirmPassword")}
                name="confirmPassword"
                required
              />
              <FormControl.Feedback />
              <span className="highlight" />
              <span className="bar" />
              {renderMessage(this.props.getValidationMessages("confirmPassword"))}
              <ControlLabel>Re-enter new password</ControlLabel>
              {this.state.typeConfPass ? (
                <span
                  className="ico-in eye-set cursor-pointer eyeright"
                  onClick={this.eyeConfClick}
                >
                  <svg>
                    <use xlinkHref={`${Sprite}#eyeCancelIco`} />
                  </svg>
                </span>
              ) : (
                  <span
                    className="ico-in eye-set cursor-pointer eyeright"
                    onClick={this.eyeConfClick}
                  >
                    <svg>
                      <use xlinkHref={`${Sprite}#eyeIco`} />
                    </svg>
                  </span>
                )}
            </FormGroup>
            <button
              className="btn btn-primary btn-block btn-md"
              onClick={event => this.validateData(event, "login")}
            >
              Submit
          </button>
          </form>
          <div className="flex align-center brk">
            <hr />
            <span className="m-dot"> </span>
            <hr />
          </div>
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
                  Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                  cursus magna,
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
                      value={this.state.email}
                      onChange={this.handleChange}
                      onBlur={this.props.handleValidation("email")}
                      name="email"
                      required
                      minLength={customConstant.inputMinLength}
                      maxLength={customConstant.inputTextLength}
                    />

                    <FormControl.Feedback />
                    <span className="highlight" />
                    <span className="bar" />
                    {renderMessage(this.props.getValidationMessages("email"))}
                    <ControlLabel>Email</ControlLabel>
                  </FormGroup>
                </div>

                <div className="flex align-center justify-space-between">
                  <button
                    className="btn btn-link sm-btn fw-600"
                    onClick={this.handleClose}
                  >
                    back to login
                </button>
                  <button
                    className="btn btn-default sm-btn"
                    onClick={event => this.validateData(event, "forgotPassword")}
                  >
                    Reset my password
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
ResetPassword = validation(strategy)(ResetPassword);
export default ResetPassword;
