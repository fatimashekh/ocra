import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { actionLoaderHide, actionLoaderShow, actionGetnavigationId,actionGetnavigationTabId } from '../../../common/core/redux/actions';
import * as actions from "../../home/homeAction";
import Bookmark from "./bookmark";

const mapDispatchToProps = dispatch => {
  const homeActions = Object.assign({}, { actionLoaderHide, actionLoaderShow, actionGetnavigationId,actionGetnavigationTabId }, actions);
  return bindActionCreators(homeActions, dispatch);
};

const mapStateToProps = state => {
  return {
      roleId: state.User.userData.userRole,
      userId: state.User.userData.id,
      menuFilter: state.home.menuFilter,
      bookmark: state.home.bookmark,
      selectedOpt: state.home.selectedOpt
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Bookmark));
