import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../common/header';
import {
  actionGetApproverList,
  actionUserLogout,
  actionGenerateOTPToAddUser,
  actionSupplierAddUser,
  actionLoaderHide,
  actionLoaderShow
} from '../../common/core/redux/actions';
import UserProfileCommon from '../../common/users/userProfile';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    /*added for css requirement*/

    document.body.classList.remove('sideDrawerOpen');
    document.body.classList.remove('sideDrawerClose');
  }
  handleLogout() {
    try {
      const roleId = this.props.userInfo.userData.userRole;
      const userId = this.props.userInfo.userData.id;
      this.props.actionUserLogout({ roleId, userId });
    } catch (error) { }
  }

  render() {
    return (
      <div>
        <Header {...this.props} />
        <UserProfileCommon  {...this.props} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetApproverList,
      actionUserLogout,
      actionGenerateOTPToAddUser,
      actionSupplierAddUser,
      actionLoaderHide,
      actionLoaderShow
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.User,
    supplierUsers: state.supplierUsers,
    navigationId: state.BuyerData.navigationId,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
