import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { actionLoaderHide, actionLoaderShow } from '../../../common/core/redux/actions';
import * as actions from "../../actionReducer/buyerAction";
import Menubar from "./menuBar";

const mapDispatchToProps = dispatch => {
    const buyerActions = Object.assign({}, { actionLoaderHide, actionLoaderShow }, actions);
    return bindActionCreators(buyerActions, dispatch);
};

const mapStateToProps = state => {
    return {
        roleId: state.User.userData.userRole,
        userId: state.User.userData.id,
        navigationItem: state.BuyerData.saveNavigationItem
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menubar));
