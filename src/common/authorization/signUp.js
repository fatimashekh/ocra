import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Row,
  Col,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import validation from "react-validation-mixin";
import strategy, { validator } from "react-validatorjs-strategy";
import classnames from "classnames";
import "react-phone-number-input/rrui.css";
import "react-phone-number-input/style.css";
import Sprite from "../../img/sprite.svg";
import Logo from "../../img/logo.png";
import CONSTANTS from "../core/config/appConfig";
import { renderMessage, showErrorToast, specialCharacterTwo, specialCharacter } from "../commonFunctions";
import { ZoomInAndOut, } from '../../common/commonFunctions';
import { ToastContainer } from 'react-toastify'
let { validationMessages, customConstant } = CONSTANTS;
class SignUp extends Component {
  constructor(props) {
    super(props);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let email = urlParams.get('email')
    this.contactPersonObject = {
      fullName: "",
      firstName: "",
      lastName: "",
      password: "",
      mobile: "",
      email: email ? email : '',
      accessToken: "",
      isEnabled: false,
      profileImageURL: "",
      isPrimaryUser: false,
      emailOTP: 0,
      mobileOTP: 0,
      creatorUserId: "",
      roleId: 0,
      createdTimestamp: 0,
      lastUpdatedTimestamp: 0,
      userType: "",
      listOfBuyerApproval: [""],
      locationError: ''
    };
    this.state = {
      companyName: "",
      name: "",
      primaryName: "",
      primaryContact: "",
      primaryDesignation: "",
      primaryEmail: "",
      error: "",
      creatAccountBtnDisabled: true,
      acceptTermsCondition: false,
      contactPersonArray: [{ ...this.contactPersonObject }],
      countryCode: "IN",
      maxContactPerson: 5,
    };

    this.acceptTermsCondition = this.acceptTermsCondition.bind(this);
    this.addNewContactPerson = this.addNewContactPerson.bind(this);
    this.removeContactPerson = this.removeContactPerson.bind(this);
    this.applyValidation = this.applyValidation.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeOfContant = this.handleChangeOfContant.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.validateData = this.validateData.bind(this);
    this.applyValidation();
  }
  componentDidMount() {
    for (let index = 0; index < this.state.maxContactPerson; index++) {
      this.setState({
        ["mobile" + index]: "",
        ["fullName" + index]: "",
        ["email" + index]: "",
      });
    }
  }

  acceptTermsCondition() {
    this.setState(
      (prevState, props) => ({
        acceptTermsCondition: !prevState.acceptTermsCondition
      }),
      () => {
        this.props.validate("acceptTermsCondition");
      }
    );
  }
  removeContactPerson() {
    let addMoreContactList = this.state.contactPersonArray;
    if (addMoreContactList.length > 1) {
      addMoreContactList.pop();
      this.setState({ contactPersonArray: addMoreContactList });
    }
  }

  addNewContactPerson() {
    let addMoreContactList = this.state.contactPersonArray;
    let lengthArr = addMoreContactList.length - 1;
    if (
      addMoreContactList[lengthArr]["fullName"] === undefined ||
      addMoreContactList[lengthArr]["fullName"] === "" ||
      addMoreContactList[lengthArr]["mobile"] === undefined ||
      addMoreContactList[lengthArr]["mobile"] === "" ||
      addMoreContactList[lengthArr]["email"] === undefined ||
      addMoreContactList[lengthArr]["email"] === "" ||
      addMoreContactList[lengthArr]["userType"] === undefined
    ) {
      showErrorToast("Please enter contact detail first.");
      // showErrorToast("Please enter all primary contact detail first.");
      return false;
    }
    if (this.state.contactPersonArray.length < this.state.maxContactPerson) {
      this.setState(
        (prevState, props) => ({
          contactPersonArray: [
            ...prevState.contactPersonArray,
            JSON.parse(JSON.stringify(this.contactPersonObject))
          ]
        }),
        () => this.applyValidation()
      );
    }
  }

  applyValidation(addressCount) {
    let _this = this;
    let contactPersonCount = this.state.contactPersonArray.length;
    let fieldObject = {
      companyName: ["required"],
      acceptTermsCondition: "termsCondition"
    };

    let errorMessage = {
      "required.companyName": validationMessages.companyName.required,
      "required.fullName": validationMessages.fullName.required,
      "regex.fullName": validationMessages.fullName.alphaOnly
    };

    for (let index = 0; index < contactPersonCount; index++) {
      fieldObject["mobile" + index] = "required|min:9|max:18";
      fieldObject["fullName" + index] = "required";
      fieldObject["email" + index] = "required|email";
      errorMessage["required.email" + index] =
        validationMessages.email.required;
      errorMessage["email.email" + index] = validationMessages.email.invalid;
      errorMessage["required.fullName" + index] =
        validationMessages.fullName.required;
      errorMessage["required.mobile" + index] =
        validationMessages.mobile.required;

      errorMessage["min.mobile" + index] = validationMessages.mobile.min;
      errorMessage["max.mobile" + index] = validationMessages.mobile.max;
    }

    this.validatorTypes = strategy.createInactiveSchema(
      fieldObject,
      errorMessage,
      function (validator) {
        let Validator = validator.constructor;
        Validator.registerAsync("termsCondition", function (
          acceptTermsCondition,
          attribute,
          req,
          passes
        ) {
          if (acceptTermsCondition == false)
            passes(false, validationMessages.acceptTermsCondition.required);
          else passes();
        });

        Validator.registerAsync("contactPerson", function (
          address2,
          attribute,
          req,
          passes
        ) {
          passes();

        });
      }
    );
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

  handleBackButton() {
    let path = this.props.location.pathname;
    try {
      switch (path) {
        case "/signup":
          this.props.history.push("/signin");
          break;
        case "/supplier/signup":
          this.props.history.push("/supplier/signin");
          break;
        default:
          // this.props.history.push('signin');
          break;
      }
    } catch (error) { }
  }

  handleChange(e) {
    const { name } = e.target;
    let { value } = e.target;
    if (name == 'companyName') {
      if (value) value = specialCharacterTwo(value);
      else value = value;
    }

    this.setState({ [name]: value });

  }

  handleChangeOfContant(index, e, name1) {
    const name = name1 ? name1 : e.target.name;
    let { value } = e.target;

    if (name == 'fullName') {
      if (value) value = specialCharacter(value);
      else value = value;
    }

    this.setState({
      [name + index]: value
    });

    this.setState((prevState, props) => {
      const roleId = this.props.userInfo.userType == "buyer" ? 1 : 2;
      if (name == "fullName") {
        let nameArray = value.trim().split(" ");
        prevState.contactPersonArray[index]["firstName"] = nameArray[0] || "";

        if (value) {
          let lastName = value.trim();
          let tt = lastName.substr(0, lastName.indexOf(' '));
          if (nameArray && nameArray.length > 0 && tt) {
            prevState.contactPersonArray[index]["lastName"] =
              value.split(" ").pop(-1) || "";
          }
        }
        prevState.contactPersonArray[index]["fullName"] = value || "";
      } else {
        prevState.contactPersonArray[index][name] = value || "";
      }
      prevState.contactPersonArray[index]["roleId"] = roleId;
      return {
        contactPersonArray: prevState.contactPersonArray
      };
    });
  }

  handleRegister() {
    let _this = this;
    let flag = true;
    let hostName = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    const roleId = this.props.userInfo.userType == "buyer" ? 1 : 2;
    let data = {
      companyName: this.state.companyName,
      roleId,
      companyLogoURL: "",
      listOfUserUserIds: [""],
      createdTimestamp: 0,
      lastUpdatedTimestamp: 0,
      userDetailRequests: this.state.contactPersonArray,
      hostName: hostName
    };
    if (flag) {
      this.props.actionLoaderShow();
      this.props
        .actionUserRegister(data)
        .then((result, error) => {
          _this.props.actionLoaderHide();
          if (error) return;
          if (result.payload.data.status == 200) {
            _this.props.history.push("signupsuccess");
          }
        })
        .catch(e => _this.props.actionLoaderHide());
    }
  }

  validateData = e => {
    e.preventDefault();
    let _this = this;
    this.applyValidation();
    this.props.validate(function (error) {
      if (!error) {
        _this.handleRegister(e);
      }
    });
  };

  checkExistingEmpId(event, field, existence, index) {
    
  }

  handleValidateError = e => {
    e.preventDefault();
    let _this = this;
    this.applyValidation();
    this.props.validate(function (error) {
      if (!error) { } else { }
    });
  };

  render() {
    let { userType } = this.props.userInfo;
    userType = userType.toUpperCase();
    return (
      <div className="regContainer in-space-set registration_wrap">
        <ToastContainer
          autoClose={3000}
          className="custom-toaster-main-cls"
          toastClassName="custom-toaster-bg"
          transition={ZoomInAndOut}
        />
        <div className="logo-area text-center clear-fix">
          <span
            className="ico-return pull-left cursor-pointer"
            onClick={this.handleBackButton}
            title="Go Back to login"
          >
            <svg>
              <use xlinkHref={`${Sprite}#backArrowIco`} />
            </svg>
          </span>
          <div className="flex justify-flex-end  mr-10 m-t-30">
            {this.props.userInfo.userType === "buyer" ? (
              <button
                className="btn btnoutline w-200"
                onClick={e => {
                  this.props.history.push("/supplier/signup");
                }}
              >
                Register as a SUPPLIER
              </button>
            ) : (
              <button
                className="btn btnoutline w-200"
                onClick={e => {
                  this.props.history.push("/signup");

                }} >
                Register as a BUYER
              </button>
            )}
          </div>
          <img src={Logo} alt="" />

        </div>
        <h5 className="head-main m-40">{userType} REGISTRATION</h5>

        <Row className="show-grid">
          <Col md={6} className="pr-10">
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
                value={this.state.companyName}
                onChange={this.handleChange}
                //  onBlur={this.props.handleValidation("companyName")}
                //  onBlur={this.handleValidateError}
                name="companyName"
                required
                placeholder="Name of Legal Entity"
                minLength={customConstant.inputMinLength}
                maxLength={customConstant.inputTextLength}
                onBlur={event =>
                  this.checkExistingEmpId(
                    event,
                    this.state.companyName,
                    "company"
                  )
                }
              />

              <FormControl.Feedback />
              <span className="highlight" />
              <span className="bar" />
              {renderMessage(this.props.getValidationMessages("companyName"))}
            </FormGroup>
          </Col>
          <Col md={6}>  </Col>
        </Row>

        <h5 className="head-main m-40">PRIMARY CONTACT PERSON</h5>
        {this.state.contactPersonArray.map((item, index) => {
          const display = index == 0 ? "none" : "block";
          return [
            <h5
              className="head-main m-40"
              style={{ display }}
              key={"h5" + index}
            >
              {" "}
              CONTACT PERSON
            </h5>,
            <Row className="show-grid" key={"cn" + index}>
              <Col md={6} className="pr-10">
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
                    value={this.state.contactPersonArray[index].fullName}
                    name={`fullName` + index}
                    onChange={e =>
                      this.handleChangeOfContant(index, e, "fullName")
                    }

                    onBlur={e => { this.handleValidateError(e) }}
                    required
                    placeholder="Full Name"
                    minLength={customConstant.inputMinLength}
                    maxLength={customConstant.inputTextLength}
                  />
                  <FormControl.Feedback />
                  <span className="highlight" />
                  <span className="bar" />
                  {renderMessage(
                    this.props.getValidationMessages("fullName" + index)
                  )}

                </FormGroup>
              </Col>
              <Col md={6} className="pl-10">
                <FormGroup
                  className="group mobile-input"
                >
                  <span className="ico-in">
                    <svg>
                      <use xlinkHref={`${Sprite}#mobileIco`} />
                    </svg>
                  </span>
                  <PhoneInput
                    placeholder="Mobile number"
                    value={this.state.contactPersonArray[index].mobile}
                    onChange={value =>
                      this.handleChangeOfContant(index, {
                        target: { name: "mobile", value }
                      })
                    }
                    name={`mobile` + index}
                    maxLength="15"
                    country={this.state.countryCode}
                    onBlur={event =>
                      this.checkExistingEmpId(
                        event,
                        this.state.contactPersonArray[index].mobile,
                        "mobile",
                        index
                      )
                    }
                  />
                  {renderMessage(
                    this.props.getValidationMessages("mobile" + index)
                  )}
                </FormGroup>
              </Col>
            </Row>,
            <Row className="show-grid" key={"cd" + index}>
              <Col md={6} className="pr-10">
                <FormGroup
                  className="group "
                >
                  <span className="ico-in">
                    <svg>
                      <use xlinkHref={`${Sprite}#envelopIco`} />
                    </svg>
                  </span>
                  <FormControl
                    type="text"
                    autoComplete="off"
                    value={this.state.contactPersonArray[index].email}
                    onChange={e =>
                      this.handleChangeOfContant(index, e, "email")
                    }
                    ref={element => (this.primaryEmail = element)}
                    name={`email` + index}
                    required
                    maxLength={80}
                    minLength={1}
                    placeholder="Email"
                    onBlur={event =>
                      this.checkExistingEmpId(
                        event,
                        this.state.contactPersonArray[index].email,
                        "email",
                        index
                      )
                    }
                  />

                  <FormControl.Feedback />
                  <span className="highlight" />
                  <span className="bar" />
                  {renderMessage(
                    this.props.getValidationMessages("email" + index)
                  )}
                </FormGroup>
              </Col>

              <Col md={6} className="pr-10">
              </Col>

            </Row>
          ];
        })}
        <div className="text-right m-b-10">
          {this.state.contactPersonArray.length === 5 ? null : (
            <span onClick={this.addNewContactPerson} className="cursor-pointer">
              Add more contact&nbsp;
              <span className="ico-add">
                <i class="fas fa-plus-circle color-green"></i>
                {/* <svg>
                  <use xlinkHref={`${Sprite}#plus-OIco`} />
                </svg> */}
              </span>
            </span>
          )}
          {this.state.contactPersonArray.length > 1 ? (
            <span onClick={this.removeContactPerson} className="cursor-pointer color-red">
              &nbsp;&nbsp;Remove contact&nbsp;{" "}
              {/* <span className="ico-minusgly remove_minus"> </span> */}
              <span className="remove_minus"><i class="fas fa-minus-circle"></i> </span>
            </span>
          ) : null}
        </div>

        <div className="text-center terms color-light mb-30">
          <div className="temrsmg  align-center justify-center">
            <label className="label--checkbox m-r-10">
              <input
                type="checkbox"
                className="checkbox"
                name="allchecked"
                onClick={() => this.acceptTermsCondition()}
                checked={this.state.acceptTermsCondition == true ? true : false}
              />
              <span className="mark"></span>
            </label>


            <span
              className="termsAgree m-t-mus4"
            >
              Agree to Terms & Conditions
            </span>
          </div>
          {renderMessage(
            this.props.getValidationMessages("acceptTermsCondition")
          )}
        </div>

        <div className="text-center m-b-20">
          <button
            className="btn btn-primary mw-300 btn-md"
            onClick={this.validateData}
          >
            Create Account
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {  },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.User,
    supplierParts: state.supplierParts
  };
};

SignUp = validation(strategy)(SignUp);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
