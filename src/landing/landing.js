import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy';
import * as R from 'ramda';
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
   
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    
  }

  
  render() {

    let _this = this
    return (
      <div class="signin_chatdata loginDesing">
        <div className="flex justify-flex-end  mr-30 m-t-30 supplierLogin">
        </div>
        <div className="centeredBox">

         Home Page

          </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {

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