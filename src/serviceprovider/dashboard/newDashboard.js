import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ActionOverview from "./actionOverview";
import Header from "../common/header";
import SideBar from "../common/sideBar";
import { Checkbox } from 'antd';
import Spinner from "../../common/components/spinner";
import { isEmpty, uniq } from "lodash";
import { showErrorToast, convertToTimeStamp, setLocalStorage, getLocalStorage }
 from '../../common/commonFunctions';
import * as TYPE from "./types";
import {SyncOutlined} from '@ant-design/icons';
import * as moment from "moment";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequestActionOverview: false,
      requestParam: {},
      tabKey: "first",
      chartView: true,
      userId: props.userInfo.userData.id,
      roleId: props.userInfo.userData.userRole,
      partStatus: props.partStatus,
      isPartStatus: props.isPartStatus,
      costEstimate: props.costEstimate,
      rfp: props.rfp,
      rfq: props.rfq,
      rfqProto: props.rfqProto,
      ppap: props.ppap,
      ppapProto: props.ppapProto,
      inventory: props.inventory,
      inventoryProto: props.inventoryProto,
      sa: props.sa,
      saProto: props.saProto,
      assignBuyer: props.assignBuyer,
      lineChartData: {},
      monthDate: '',
      filters: props.dashBoardFilter,
      selectedDate: '',
      selFilters: getLocalStorage('filters'),
      actionOverview: {},
      lastUpdatedTimestamp: '',
      reqText: "for actions from others",
      programIds: [],
      emptyFilters: [],
      selFiltersCard: getLocalStorage('filters'),
      resetClicked: false,
      buildPhaseId: '',
      programId: '',
      syncSpin : false
    }
    props.actionLoaderShow();
    setTimeout(() => {
      props.actionLoaderHide()
    }, 1000)
  }

  getLineChartData = (param, filterData) => {
    let listOfIds = filterData && filterData.listOfIds ? filterData.listOfIds : [];
    let commodityIds = filterData && filterData.commodityIds ? filterData.commodityIds : [];
    let buyerIds = filterData && filterData.buyerIds ? filterData.buyerIds : [];
    let supplierIds = filterData && filterData.supplierIds ? filterData.supplierIds : [];
    let deliveryAddressIds = filterData && filterData.deliveryAddressIds ? filterData.deliveryAddressIds : [];
    let buildPhases = filterData && filterData.buildPhases ? filterData.buildPhases : [];
    let bomIds = filterData && filterData.bomIds ? filterData.bomIds : [];
    let typeOfPart = filterData && filterData.typeOfPart;
    let lineChartParams = {
      userId: this.state.userId, roleId: this.state.roleId, pageNumber: 1, pageSize: 5, timestamp: param, listOfIds: listOfIds,
      commodityIds: commodityIds, buyerIds: buyerIds, supplierIds: supplierIds, deliveryAddressIds: deliveryAddressIds,
      buildPhases: buildPhases, bomIds: bomIds, typeOfPart: typeOfPart
    }
    this.setState({ requestParam: filterData })
    this.props.actionGetLineChartData(lineChartParams).then(res => {
      if (res.payload.data.status === 200)
        this.props.actionGetLineChartDataSuccess(res.payload.data.resourceData);
      else
        this.captureError(TYPE.GET_LINE_CHART_DATA_ERROR, res.payload.data.responseMessage);
    });
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {
   
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashBoardFilter !== prevProps.dashBoardFilter) {
      this.setState({ filters: this.props.dashBoardFilter });
    }
    if (this.props.lineChartData !== prevProps.lineChartData) {
      this.setState({ lineChartData: this.props.lineChartData });
    }
    if (this.props.partStatus !== prevProps.partStatus || this.props.isPartStatus !== prevProps.isPartStatus) {
      this.setState({ partStatus: this.props.partStatus, isPartStatus: this.props.isPartStatus });
    }
    if (this.props.costEstimate !== prevProps.costEstimate) {
      this.setState({ costEstimate: this.props.costEstimate });
    }
    if (this.props.rfp !== prevProps.rfp) {
      this.setState({ rfp: this.props.rfp });
    }
    if (this.props.rfq !== prevProps.rfq) {
      this.setState({ rfq: this.props.rfq });
    }
    if (this.props.rfqProto !== prevProps.rfqProto) {
      this.setState({ rfqProto: this.props.rfqProto });
    }
    if (this.props.ppap !== prevProps.ppap) {
      this.setState({ ppap: this.props.ppap });
    }
    if (this.props.ppapProto !== prevProps.ppapProto) {
      this.setState({ ppapProto: this.props.ppapProto });
    }
    if (this.props.inventory !== prevProps.inventory) {
      this.setState({ inventory: this.props.inventory });
    }
    if (this.props.inventoryProto !== prevProps.inventoryProto) {
      this.setState({ inventoryProto: this.props.inventoryProto });
    }
    if (this.props.sa !== prevProps.sa) {
      this.setState({ sa: this.props.sa });
    }
    if (this.props.saProto !== prevProps.saProto) {
      this.setState({ saProto: this.props.saProto });
    }
    if (this.props.assignBuyer !== prevProps.assignBuyer) {
      this.setState({ assignBuyer: this.props.assignBuyer });
    }
    if (this.props.actionOverview !== prevProps.actionOverview) {
      this.setState({ actionOverview: this.props.actionOverview });
    }
    if (this.props.lastUpdatedTimestamp !== prevProps.lastUpdatedTimestamp) {
      this.setState({ lastUpdatedTimestamp: this.props.lastUpdatedTimestamp });
    }
  }


  render() {
    let { actionOverview, requestParam, emptyFilters, isRequestActionOverview, lastUpdatedTimestamp, syncSpin } = this.state;
    let timeUpdated = '';
    let lastUpdateTime = '';
    let isUpdatedThere = lastUpdatedTimestamp && lastUpdatedTimestamp;
    if(isUpdatedThere){
      lastUpdateTime = moment(
        isUpdatedThere
      ).format("DD MMM YY HH:mm:ss");
    }
    return (
      <div className="page-container page-sidebar-fixed dashboard_wrap dashboardUpdate">
        <Header {...this.props} />
        <SideBar {...this.props} />
        <div className="content-section p-lr-0">
          <div className="layout-gray">
            <div className="layout-gray">
              <div className="container-fluid card-body set-gutter ac-link">
                <div>
                  <h5 className="my-4 d-inline-block">Action Overview</h5>
                  {isUpdatedThere ?
                      <span className="text-color fs-12 m-l-5 lb-btn">
                      <SyncOutlined spin={syncSpin} className="p-r-5 cursor-p" onClick={this.updateActionOverview} />
                        {syncSpin? <i className="p-l-5">Updating Tasks</i>: 'Updated at : '+lastUpdateTime}
                      </span>
                      : ''}
                </div>
                {!isEmpty(actionOverview) ?
                  <Row>
                    {actionOverview.myApproval ? <Col md={4} lg={2}><ActionOverview props={this.props} task={'myTask'} processRequest={'approvals'} data={actionOverview.myApproval} status="Pending" title="Approvals assigned" showLastlogin={true} /></Col> : null}
                    {actionOverview.myTask ? <Col md={4} lg={2}><ActionOverview props={this.props} task={'myTask'} processRequest={'task'} data={actionOverview.myTask} status="Pending" title="Tasks assigned" showLastlogin={true} /></Col> : null}
                    {actionOverview.myRequest ? <Col md={4} lg={2} ><ActionOverview props={this.props} task={'myTask'} processRequest={'requests'} data={actionOverview.myRequest} status="" title="My requests pending" showLastlogin={false} reqText={this.state.reqText} /></Col> : null}
                    {actionOverview.myParts ? <Col md={4} lg={2}><ActionOverview props={this.props} task={'myTask'} processRequest={'parts'} data={actionOverview.myParts} status="Pending" title="Parts assigned" showLastlogin={true} unShowUnaddress={true} /></Col> : null}
                    {actionOverview.teamApproval ? <Col md={4} lg={2} ><ActionOverview props={this.props} task={'teamTask'} processRequest={'approvals'} data={actionOverview.teamApproval} status="Pending" title="Approvals assigned (team)" team={true} showLastlogin={true} /></Col> : null}
                    {actionOverview.teamTask ? <Col md={4} lg={2}><ActionOverview props={this.props} task={'teamTask'} processRequest={'task'} data={actionOverview.teamTask} status="Pending" title="Tasks assigned (team)" team={true} showLastlogin={true} /></Col> : null}
                    {actionOverview.teamRequest ? <Col md={4} lg={2} ><ActionOverview props={this.props} task={'teamTask'} processRequest={'requests'} data={actionOverview.teamRequest} status="" title="Team requests pending" team={true} showLastlogin={false} reqText={this.state.reqText} /></Col> : null}
                    {actionOverview.teamParts ? <Col md={4} lg={2}><ActionOverview props={this.props} task={'teamTask'} processRequest={'parts'} data={actionOverview.teamParts} status="Pending" title="Parts assigned (team)" team={true} showLastlogin={true} unShowUnaddress={true} /></Col> : null}
                  </Row>
                  : !isRequestActionOverview ? null : <Spinner tip={"Refreshing Data"}/>}
              </div>
            </div>
          </div >
        </div >
      </div >

    )
  }
}
export default Dashboard;