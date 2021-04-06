import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Authorization from '../common/authorization';
import Home from './home/homeContainer';
import Landing from '../landing/landing';
import NewDashboard from './dashboard/dashboardContainer';
import ErrorPage from "../common/error/error";
import Administrator from './administrator/administrator';
import {
  actionUserLogout,
  actionLoaderHide,
  actionCheckToken
} from '../common/core/redux/actions';
class ServiceProviderView extends Component {
  constructor(props) {
    super(props);
    this.allowedPath = [
      '/signin',
      '/singup',
      '/otpVerification',
      '/signupsuccess',
      '/resetPassword'
    ];
    this.checkValidAccessOfPages = this.checkValidAccessOfPages.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.checkTokenByAPI = this.checkTokenByAPI.bind(this)
  }
  componentDidMount() {
    if (this.props.userInfo && this.props.userInfo.userData.id) {
      this.checkTokenByAPI();
      setInterval(this.checkTokenByAPI, 30000);
    }
  }

  async checkTokenByAPI() {
    let _this = this;
    let data = [];
    try {
      this.props
        .actionCheckToken(data)
        .then((response, error) => {
          if (response.payload.data.resourceData) {

          } else {
            _this.handleLogout();
          }
        })
        .catch(e => this.props.actionLoaderHide());
    } catch (error) {
      this.props.history.push('/');
    }
  }
  handleLogout() {
    try {
      const roleId = this.props.userInfo.userData.userRole;
      const userId = this.props.userInfo.userData.id;
      this.props.actionUserLogout({ roleId, userId });
    } catch (error) { }
  }
  checkValidAccessOfPages(_props) {
    let _this = this;
    if (this.allowedPath.indexOf(_props.location.pathname) === -1) {
      try {
        if (_props.userInfo.userData.userRole !== 1) { }
        _props.history.push('/signin'); //  <Redirect to='/signin' />//  _props.history.push('/signin');
      } catch (error) {
        // <Redirect to='/signin' /> //_props.history.push('/signin');
      }
    }
  }

  componentWillMount() {
    // this.checkValidAccessOfPages(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // this.checkValidAccessOfPages(nextProps);
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path={`/signin`}
          component={Authorization}
        />
        <Route
          exact
          path={`/signup`}
          component={Authorization}
        />
        <Route
          exact
          path={`/signupsuccess`}
          component={Authorization}
        />
        <Route
          exact
          path={`/otpVerification`}
          component={Authorization}
        />
        <Route
          exact
          path={`/resetPassword`}
          component={Authorization}
        />

        <Route
          exact
          path={`/landing`}
          component={Landing}
        />
        <Route exact path={`/home`} component={Home} />
        <Route
          exact
          path={`/dashboard`}
          component={NewDashboard}
        />
        <Route
          exact
          path={`/administrator`}
          component={Administrator}
        />
        <Route component={ErrorPage} />
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionUserLogout,
      actionLoaderHide,
      actionCheckToken
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
)(ServiceProviderView);
