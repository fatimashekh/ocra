import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tab, Nav, NavItem } from 'react-bootstrap';
import Header from '../common/header';
import Sprite from '../../img/sprite.svg';

import {
  actionUserLogout,
  actionLoaderHide,
  actionLoaderShow
} from '../../common/core/redux/actions';

class ServiceProviderHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey:
        (this.props.supplierParts && this.props.supplierParts.activeTab) ||
        'first'
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.tabCheck = this.tabCheck.bind(this);
  }

  componentWillMount() {
    let URL = sessionStorage.getItem('URL');
    if (URL) {
      this.props.history.push(URL);
      setTimeout(() => {
        sessionStorage.removeItem('URL');
      }, 200);
    } else {
      if (this.props.userInfo.userData.isAdmin) {
        this.props.history.push('/administrator');
      } else {
        this.props.history.push('/dashboard');
      }
    }
  }

  handleLogout() {
    try {
      let _this = this;
      const roleId = this.props.userInfo.userData.userRole;
      const userId = this.props.userInfo.userData.id;
      this.props.actionLoaderShow();
      this.props
        .actionUserLogout({ roleId, userId })
        .then((result, error) => {
          _this.props.actionLoaderHide();
        })
        .catch(e => _this.props.actionLoaderHide());
    } catch (error) { }
  }

  tabCheck(tab) {
    this.setState({ activeTabKey: tab });
  }

  render() {
    return (
      <div>
        <section className="">
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { actionUserLogout, actionLoaderHide, actionLoaderShow },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.User,
    supplierParts: state.supplierParts
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceProviderHome);
