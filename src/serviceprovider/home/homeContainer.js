import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionLoaderHide, actionLoaderShow } from '../../common/core/redux/actions';
import * as actions from "./homeAction";
import Home from "./home";

const mapDispatchToProps = dispatch => {
  const homeActions = Object.assign({}, { actionLoaderHide, actionLoaderShow }, actions);
  return bindActionCreators(homeActions, dispatch);
};

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
