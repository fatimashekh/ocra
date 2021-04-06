import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../common/header';
import {
  actionUserLogout
} from '../../common/core/redux/actions';
import EditUserCommon from '../../common/users/editUser';

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
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
      <div className="page-container page-sidebar-fixed">
        <Header {...this.props} />
        <EditUserCommon {...this.props} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionUserLogout
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.User,
    supplierUsers: state.supplierUsers
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
