import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionLoaderHide, actionLoaderShow } from '../../common/core/redux/actions';
import * as actions from "./dashboardAction";
import Dashboard from "./demoDashboard";


const mapDispatchToProps = dispatch => {
  const dashBoardActions = Object.assign({}, { actionLoaderHide, actionLoaderShow }, actions);
  return bindActionCreators(dashBoardActions, dispatch);
};

const mapStateToProps = state => {
  return {
    userInfo: state.User,
    partStatus: state.dashboard.partStatus,
    costEstimate: state.dashboard.costEstimate,
    rfp: state.dashboard.rfp,
    rfq: state.dashboard.rfq,
    rfqProto: state.dashboard.rfqProto,
    ppap: state.dashboard.ppap,
    ppapProto: state.dashboard.ppapProto,
    inventory: state.dashboard.inventory,
    inventoryProto: state.dashboard.inventoryProto,
    saProto: state.dashboard.saProto,
    sa: state.dashboard.sa,
    lineChartData: state.dashboard.lineChartData,
    assignBuyer: state.dashboard.assignBuyer,
    dashBoardFilter: state.dashboard.dashBoardFilter,
    actionOverview: state.dashboard.actionOverview,
    saveFilter: state.dashboard.saveFilter
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
