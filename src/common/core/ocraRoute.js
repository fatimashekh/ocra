import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ZoomInAndOut } from "../commonFunctions";
import Authorization from "../authorization";
import ServiceproviderView from "../../serviceprovider";
import ErrorPage from "../../common/error/error";
import loaderImg from '../../img/loader-white.gif';
class OcraRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let _this = this;
    return [
      <ToastContainer
        autoClose={3000}
        className="custom-toaster-main-cls"
        toastClassName="custom-toaster-bg"
        transition={ZoomInAndOut}
      />,
      <div className={`loader-container ${this.props.loader ? "" : "hide"}`}>
        <div className="loader-main text-center">
          <img src={loaderImg} />
        </div>
      </div>,
      <BrowserRouter>
        <Provider store={this.props.store}>
          <Switch>
            <Redirect
              exact
              from="/"
              to={{
                pathname: "/landing"
              }}
            />
            <Route path="/signup" component={Authorization} />
            <Route path="/signin" component={Authorization} />
            <Route path="/supplier/signup" component={Authorization} />
            <ServiceproviderView {..._this.props} />
            <Route component={ErrorPage} />
          </Switch>
        </Provider>
      </BrowserRouter>
    ];
  }
}
const mapStateToProps = state => {
  return {
    loader: state.Common.loader
  };
};
export default connect(
  mapStateToProps,
  null
)(OcraRoute);
