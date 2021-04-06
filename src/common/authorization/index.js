import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SignIn from "./signIn";
import SignUp from "./signUp";
import SignUpSuccess from "./singUpSuccess";
import OTPVerification from "./otpVerfication";
import ResetPassword from "./resetPassword";
import {
  actionShowSignIn,
  actionUserLogin,
  actionChangeUserType,
  actionUserRegister,
  actionOtpVerification,
  actionLoaderHide,
  actionLoaderShow,
  actionForgotPassword,
  actionResetPassword
} from "../core/redux/actions";
function ShowHideSignUpIn(props) {
  if (props.key == 0) return <SignUp />;
  return <SignIn />;
}

class Authorizaton extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: "",
      roleId: 2,
      type: "",
      page: ""
    };
    // this.state.type = "";
    // this.state.page = "";
    this.checkPageNavigation = this.checkPageNavigation.bind(this);
  }

  checkPageNavigation(_props) {
    // let _props = this.props;
    let path = _props.location.pathname;
    try {
      //Navigate user to home page by roleId
      switch (path) {
        case "/signin":
          if (_props.userInfo.userType !== "buyer")
            _props.actionChangeUserType("buyer");
          if (_props.userInfo.showSignIn !== "signin")
            _props.actionShowSignIn("signin");
          break;
        case "/signup":
          if (_props.userInfo.userType !== "buyer")
            _props.actionChangeUserType("buyer");
          if (_props.userInfo.showSignIn !== "signup")
            _props.actionShowSignIn("signup");
          break;
        case "/supplier/signin":
          if (_props.userInfo.userType !== "supplier")
            _props.actionChangeUserType("supplier");
          if (_props.userInfo.showSignIn !== "signin")
            _props.actionShowSignIn("signin");
          break;
        case "/supplier/signup":
          if (_props.userInfo.userType !== "supplier")
            _props.actionChangeUserType("supplier");
          if (_props.userInfo.showSignIn !== "signup")
            _props.actionShowSignIn("signup");
          break;
        //Success screen show hide
        case "/supplier/signupsuccess":
          if (_props.userInfo.userType !== "supplier")
            _props.actionChangeUserType("supplier");
          if (_props.userInfo.showSignIn !== "success")
            _props.actionShowSignIn("success");
          break;
        case "/signupsuccess":
          if (_props.userInfo.userType !== "buyer")
            _props.actionChangeUserType("buyer");
          if (_props.userInfo.showSignIn !== "success")
            _props.actionShowSignIn("success");
          break;
        //OTP verification screens show hide
        case "/supplier/otpVerification":
          if (_props.userInfo.userType !== "supplier")
            _props.actionChangeUserType("supplier");
          if (_props.userInfo.showSignIn !== "otpverification")
            _props.actionShowSignIn("otpverification");
          break;
        case "/otpVerification":
          if (_props.userInfo.userType !== "buyer")
            _props.actionChangeUserType("buyer");
          if (_props.userInfo.showSignIn !== "otpverification")
            _props.actionShowSignIn("otpverification");
          break;
        //Forgot Password screens show hide
        case "/resetPassword":
          if (_props.userInfo.userType !== "buyer")
            _props.actionChangeUserType("buyer");
          if (_props.userInfo.showSignIn !== "resetPassword")
            _props.actionShowSignIn("resetPassword");
          break;
        case "/supplier/resetPassword":
          if (_props.userInfo.userType !== "supplier")
            _props.actionChangeUserType("supplier");
          if (_props.userInfo.showSignIn !== "resetPassword")
            _props.actionShowSignIn("resetPassword");
          break;

        default:
          break;
      }
    } catch (error) { }
  }

  componentDidMount() {
    this.checkPageNavigation(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkPageNavigation(nextProps);
    try {
      //Navigate user to home page by roleId
      switch (nextProps.userInfo.userData.userRole) {
        case 1:
          this.props.history.push("/home");
          break;
        case 2:
          this.props.history.push("/supplier/home");
        default:
          break;
      }
    } catch (error) { }
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return null;
  }

  render() {
    return (
      <div>
        <div className="wrapper-hero overflowHidden">
          <div className="colWrap full-height">
            <div>
              <div className="side-content">
                <h6 className="copyright">Copyright ORCA 2020</h6>
              </div>
            </div>
            <div className="r-col clear-fix">
              <div className="flex flex-column custom-tab">
                <div
                  className="formContent"
                  style={{
                    display:
                      this.props.userInfo.showSignIn == "signin"
                        ? "block"
                        : "none"
                  }}
                >
                  <SignIn {...this.props} />
                </div>
                <div
                  className="formContent"
                  style={{
                    display:
                      this.props.userInfo.showSignIn == "signup"
                        ? "block"
                        : "none"
                  }}
                >
                  <SignUp {...this.props} />
                </div>
                <div
                  className="formContent"
                  style={{
                    display:
                      this.props.userInfo.showSignIn == "success"
                        ? "block"
                        : "none"
                  }}
                >
                  <SignUpSuccess {...this.props} />
                </div>
                <div
                  className="formContent"
                  style={{
                    display:
                      this.props.userInfo.showSignIn == "otpverification"
                        ? "block"
                        : "none",
                    height: "100%"
                  }}
                >
                  <OTPVerification {...this.props} />
                </div>
                <div
                  className="formContent"
                  style={{
                    display:
                      this.props.userInfo.showSignIn == "resetPassword"
                        ? "block"
                        : "none"
                  }}
                >
                  <ResetPassword {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionShowSignIn,
      actionUserLogin,
      actionChangeUserType,
      actionUserRegister,
      actionOtpVerification,
      actionLoaderHide,
      actionLoaderShow,
      actionForgotPassword,
      actionResetPassword
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.User
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authorizaton);
