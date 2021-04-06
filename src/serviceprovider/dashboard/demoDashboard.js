import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ActionOverview from "./demoActionOverview";
import { Link } from 'react-router-dom';
import Header from "../common/header";
import SideBar from "../common/sideBar";
import { Radio, Checkbox, Popover } from 'antd';
import DataVisual from "../../common/components/dataVisual/demoDataVisual";
import Spinner from "../../common/components/spinner";
import { isEmpty, cloneDeep, uniq } from "lodash";
import LineChart from "../../common/components/charts/lineChart";
import { PowerFilter, CaretDownIcon } from "../../common/components/powerFilter";
import DashboardPage from "../../buyer/parts/dashboard";
import { showErrorToast, convertToTimeStamp, setLocalStorage, getLocalStorage, capitalizeVariableNames } from '../../common/commonFunctions';
import * as TYPE from "./types";
import {SyncOutlined} from '@ant-design/icons';
import * as moment from "moment";
// import Comments from '../../common/components/comments';
// import CircularStatic from '../../common/components/circularProgress';

class DemoDashboard extends Component {
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
      reqText: "For actions from others",
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
    let selFilters = this.state.selFilters;
    let listOfIds = !isEmpty(selFilters) && selFilters.program && selFilters.program !== null ? selFilters.program.filter(fil => fil.checked).map(prog => prog.value) : [];
    let commodityIds = !isEmpty(selFilters) && selFilters.commodity && selFilters.commodity !== null ? selFilters.commodity.filter(fil => fil.checked).map(comm => comm.value) : [];
    let buyerIds = !isEmpty(selFilters) && selFilters.buyer && selFilters.buyer !== null ? selFilters.buyer.filter(fil => fil.checked).map(buy => buy.value) : [];
    let supplierIds = !isEmpty(selFilters) && selFilters.supplier && selFilters.supplier !== null ? selFilters.supplier.filter(fil => fil.checked).map(sup => sup.value) : [];
    let deliveryAddressIds = !isEmpty(selFilters) && selFilters.deliveryAddress && selFilters.deliveryAddress !== null ? selFilters.deliveryAddress.filter(fil => fil.checked).map(del => del.value) : [];
    let bomIds = !isEmpty(selFilters) && selFilters.bomList && selFilters.bomList !== null ? selFilters.bomList.filter(fil => fil.checked).map(del => del.value) : [];
    let buildPhases = !isEmpty(selFilters) && selFilters.buildPhase && selFilters.buildPhase !== null ? selFilters.buildPhase.filter(fil => fil.checked).map(del => del.value) : [];
    let typeOfPart = !isEmpty(selFilters) && selFilters.partType && selFilters.partType !== null ? selFilters.partType.filter(fil => fil.checked).map(del => del.value) : [];
    let params = { userId: this.state.userId, roleId: this.state.roleId };
    params.listOfIds = listOfIds;
    params.commodityIds = commodityIds;
    params.listOfIds = listOfIds;
    params.commodityIds = commodityIds;
    params.buyerIds = buyerIds;
    params.supplierIds = supplierIds;
    params.deliveryAddressIds = deliveryAddressIds;
    params.bomIds = bomIds;
    params.buildPhases = buildPhases;
    params.typeOfPart = isEmpty(typeOfPart) ? "" : typeOfPart.length > 1 ? "" : typeOfPart[0];
    this.props.actionGetDashboardFilter(params)
      .then(res => {
        if (res.payload.data.status === 200)
          this.props.actionGetDashboardFilterSuccess(res.payload.data.resourceData);
      })
    this.getLineChartData('', params);
    this.widgetAPIs(params);
    onbeforeunload = e => {
      let checkChanged = Object.assign({}, this.state.selFilters)
      Object.keys(checkChanged).map(fil => {
        checkChanged[fil].map(obj => {
          if (obj.changed) {
            obj.checked = !obj.checked;
            delete obj.changed
          }
        });
      });
      setLocalStorage("filters", this.state.selFilters);
    }
  }

  componentWillUnmount() {
    localStorage.removeItem("filters");
    this.props.actionSaveDBFilter(this.state.selFilters);
  }

  captureError = (type, msg) => {
    this.props.actionGetError(type);
    showErrorToast(msg)
  }

  widgetAPIs(params) {
    this.setState({ isRequestActionOverview: true });
    this.props.actionGetActionOverview(params).then(res => {
      if (res.payload.data.status === 200) {
        this.props.actionGetActionOverviewSuccess(res.payload.data.resourceData.overviewData);
        this.setState({lastUpdatedTimestamp: res.payload.data.resourceData.lastUpdatedTimestamp, syncSpin: true})
        this.props.actionUpdateActionOverview(params).then(res => {
          if (res.payload.data.status === 200) {
            this.props.actionGetActionOverviewSuccess(res.payload.data.resourceData.overviewData);
            this.setState({lastUpdatedTimestamp: res.payload.data.resourceData.lastUpdatedTimestamp,syncSpin: false});
          }
        });
      }
      else
        this.captureError(TYPE.GET_ACTION_OVERVIEW_ERROR, res.payload.data.responseMessage);
      this.setState({ isRequestActionOverview: false });
    });
    this.props.actionGetPartStatus(params).then(res => {
      if (res.payload.data.status === 200)
        this.props.actionGetPartStatusSuccess(res.payload.data.resourceData);
      else
        this.captureError(TYPE.GET_PART_STATUS_ERROR, res.payload.data.responseMessage);
    });
    this.props.actionGetRFQ(params).then(res => {
      if (res.payload.data.status === 200)
        this.props.actionGetRFQSuccess(res.payload.data.resourceData);
      else
        this.captureError(TYPE.GET_RFQ_ERROR, res.payload.data.responseMessage);
    });

    this.props.actionGetPPAP(params).then(res => {
      if (res.payload.data.status === 200)
        this.props.actionGetPPAPSuccess(res.payload.data.resourceData);
      else
        this.captureError(TYPE.GET_PPAP_ERROR, res.payload.data.responseMessage);
    });
    this.props.actionGetInventory(params).then(res => {
      if (res.payload.data.status === 200)
        this.props.actionGetInventorySuccess(res.payload.data.resourceData);
      else
        this.captureError(TYPE.GET_INVENTORY_ERROR, res.payload.data.responseMessage);
    });
    this.props.actionGetRFQProto(params).then(res => {
      if (res.payload.data.status === 200)
        this.props.actionGetRFQProtoSuccess(res.payload.data.resourceData);
      else
        this.captureError(TYPE.GET_RFQ_PROTO_ERROR, res.payload.data.responseMessage);
    });
    this.props.actionGetSAProto(params).then(res => {
      if (res.payload.data.status === 200)
        this.props.actionGetSAProtoSuccess(res.payload.data.resourceData);
      else
        this.captureError(TYPE.GET_SA_PROTO_ERROR, res.payload.data.responseMessage);
    });
    this.props.actionGetPPAPProto(params).then(res => {
      if (res.payload.data.status === 200)
        this.props.actionGetPPAPProtoSuccess(res.payload.data.resourceData);
      else
        this.captureError(TYPE.GET_PPAP_PROTO_ERROR, res.payload.data.responseMessage);
    });
    this.props.actionGetInventoryProto(params).then(res => {
      if (res.payload.data.resourceData) {
        this.setState({
          buildPhaseId: res.payload.data.resourceData.buildPhase,
          projectId: res.payload.data.resourceData.projectId
        })
      }
      if (res.payload.data.status === 200)
        this.props.actionGetInventoryProtoSuccess(res.payload.data.resourceData);
      else
        this.captureError(TYPE.GET_INVENTORY_PROTO_ERROR, res.payload.data.responseMessage);
    });
    this.props.actionGetCostEstimation(params).then(res => {
      if (res.payload.data.status === 200)
        this.props.actionGetCostEstimationSuccess(res.payload.data.resourceData);
      else
        this.captureError(TYPE.GET_COST_ESTIMATION_ERROR, res.payload.data.responseMessage);
    });
    this.props.actionGetRFP(params).then(res => {
      if (res.payload.data.status === 200)
        this.props.actionGetRFPSuccess(res.payload.data.resourceData);
      else
        this.captureError(TYPE.GET_RFP_ERROR, res.payload.data.responseMessage);
    });
    this.props.actionGetAssignBuyerData(params).then(res => {
      if (res.payload.data.status === 200)
        this.props.actionGetAssignBuyerDataSuccess(res.payload.data.resourceData);
      else
        this.captureError(TYPE.GET_ASSIGN_BUYER_ERROR, res.payload.data.responseMessage);
    });
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

  updateActionOverview = () => {
    let params = { userId: this.state.userId, roleId: this.state.roleId };
    // this.widgetAPIs(params);
    this.setState({syncSpin: true})
    this.props.actionUpdateActionOverview(params).then(res => {
      if (res.payload.data.status === 200) {
        this.props.actionGetActionOverviewSuccess(res.payload.data.resourceData.overviewData);
        this.setState({lastUpdatedTimestamp: res.payload.data.resourceData.lastUpdatedTimestamp, syncSpin: false});
      }
    });
  }

  clearSelectedFilters = () => {
    this.setState({ selFilters: {}, selFiltersCard: {}, resetClicked: true }, () => {
      this.selectedFilters();
    });
    localStorage.removeItem("filters");
  }

  showCharts = e => {
    this.setState({ chartView: e.target.value === "chart" ? true : false });
  }

  getTimeStampDate = (param) => {
    if (param && param !== this.state.monthDate) {
      let timeStamp = convertToTimeStamp(param);
      this.setState({ monthDate: param, selectedDate: timeStamp }, () => {
        this.getLineChartData(timeStamp, this.state.requestParam);
      })
    }
  }

  selectedFilters = (filters) => {
    let resetClicked = this.state.resetClicked;
    if (!resetClicked && isEmpty(filters)) {
      showErrorToast("Please select option to apply filter");
      return;
    }
    this.setState({
      partStatus: [], costEstimate: [], rfp: [], assignBuyer: [], lineChartData: {}, rfq: [], sa: [], ppap: [], inventory: [], saProto: [],
      rfqProto: [], ppapProto: [], inventoryProto: [], resetClicked: false
    });
    let params = { userId: this.state.userId, roleId: this.state.roleId };
    let listOfIds = !isEmpty(filters) && filters.program && filters.program !== null ? filters.program.filter(fil => fil.checked).map(prog => prog.value) : [];
    let commodityIds = !isEmpty(filters) && filters.commodity && filters.commodity !== null ? filters.commodity.filter(fil => fil.checked).map(comm => comm.value) : [];
    let buyerIds = !isEmpty(filters) && filters.buyer && filters.buyer !== null ? filters.buyer.filter(fil => fil.checked).map(buy => buy.value) : [];
    let supplierIds = !isEmpty(filters) && filters.supplier && filters.supplier !== null ? filters.supplier.filter(fil => fil.checked).map(sup => sup.value) : [];
    let deliveryAddressIds = !isEmpty(filters) && filters.deliveryAddress && filters.deliveryAddress !== null ? filters.deliveryAddress.filter(fil => fil.checked).map(del => del.value) : [];
    let bomIds = !isEmpty(filters) && filters.bomList && filters.bomList !== null ? filters.bomList.filter(fil => fil.checked).map(del => del.value) : [];
    let buildPhases = !isEmpty(filters) && filters.buildPhase && filters.buildPhase !== null ? filters.buildPhase.filter(fil => fil.checked).map(del => del.value) : [];
    let typeOfPart = !isEmpty(filters) && filters.partType && filters.partType !== null ? filters.partType.filter(fil => fil.checked).map(del => del.value) : [];
    params.listOfIds = listOfIds;
    params.commodityIds = commodityIds;
    params.buyerIds = buyerIds;
    params.supplierIds = supplierIds;
    params.deliveryAddressIds = deliveryAddressIds;
    params.bomIds = bomIds;
    params.buildPhases = buildPhases;
    params.typeOfPart = isEmpty(typeOfPart) ? "" : typeOfPart.length > 1 ? "" : typeOfPart[0];
    this.widgetAPIs(params);
    this.getLineChartData(this.state.selectedDate, params)
    filters && Object.keys(filters).map(obj => {
      delete filters["visible"];
      if (filters[obj] == null)
        delete filters[obj];
    });

    this.state.emptyFilters.map(obj => delete filters[obj]);
    this.setState({ selFilters: filters, requestParam: params, emptyFilters: [], selFiltersCard: filters });
  }

  onChangeSel = (e, fil) => {
    let keys = Object.keys(this.state.selFilters);
    let selFilters = this.state.selFilters;
    let values = [];
    keys.map(obj => {
      if (obj === fil) {
        let selOpt = this.state.selFilters[obj];
        selOpt.map((opt, i) => {
          if (i == e.target.id) {
            if (obj.checked !== e.target.checked)
              opt.changed = true;
            opt.checked = e.target.checked;
          }
          return opt;
        });
        values = selOpt;
      }
    });
    selFilters[fil] = values;
    this.setState({ selFilters, selFiltersCard: selFilters });
  };

  handleApply = (selFilters, fil) => {
    let newFil = selFilters;
    let changedFil = newFil[fil].filter(obj => obj.checked);
    newFil[fil] = changedFil;
    let filterKeys = Object.keys(newFil);
    filterKeys.map(key => {
      let filterVal = newFil[key];
      if (filterVal.length === 0) {
        delete newFil[key];
      }
    })
    this.selectedFilters(newFil);
    this.handleVisibleChange(false, fil);
  }

  renderMultiple = (options, fil) => {
    let checkBox = options.map((opt, i) => {
      return <Checkbox id={i} checked={opt.checked} onChange={(e) => this.onChangeSel(e, fil)}>{opt.label}</Checkbox>
    })
    return (<div className="sel-check">
      {checkBox}
      <button className="btn blue-borbtn" onClick={() => this.handleCancelVisible(false, fil)}>Cancel</button>
      <button className="btn blue-btn" onClick={() => this.handleApply(this.state.selFilters, fil)}>Apply</button>
    </div>);
  }

  handleVisibleChange = (visible, fil) => {
    let visibleKey = `${fil}visible`;
    this.setState({ [visibleKey]: visible });
  }

  handleCancelVisible = (visible, fil) => {
    let checkChanged = Object.assign({}, this.state.selFilters);
    checkChanged[fil].map(obj => {
      if (obj.changed) {
        obj.checked = !obj.checked;
        delete obj.changed
      }
    });
    let visibleKey = `${fil}visible`;
    this.setState({ [visibleKey]: visible, selFilters: checkChanged });
  }

  getProgramId = (options, type) => {
    let emptyFilters = [...this.state.emptyFilters];
    if (options == null)
      emptyFilters.push(type);
    else
      emptyFilters = emptyFilters.filter(obj => obj !== type);
    let params = { userId: this.state.userId, roleId: this.state.roleId };
    let listOfIds = [...this.state.programIds];
    let buildPhases = [];
    if (type == "program") {
      listOfIds = options == null ? [] : listOfIds.concat(options.map(obj => obj.value));
      params.listOfIds = listOfIds;
    }
    else if (type == "buildPhase") {
      buildPhases = options == null ? [] : options.map(obj => obj.value);
      let initIds = this.state.selFilters && this.state.selFilters["program"] && this.state.selFilters["program"].map(obj => obj.value);
      params.listOfIds = isEmpty(listOfIds) ? initIds : listOfIds;
    }
    params.buildPhases = buildPhases;
    if (type == "program" || type == "buildPhase") {
      // if(type == "program" && options == null)
      // emptyFilters.push("buildPhase");
      this.props.actionGetDashboardFilter(params)
        .then(res => {
          if (res.payload.data.status === 200) {
            let data = res.payload.data.resourceData;
            // if(data["buildPhase"] == undefined)
            // emptyFilters.push("buildPhase");
            this.props.actionGetDashboardFilterSuccess(res.payload.data.resourceData);
          }
        });
    }
    this.setState({ programIds: listOfIds, emptyFilters: uniq(emptyFilters), selFiltersCard: { ...this.state.selFiltersCard } });
  }

  isShowResetButton = (currentFilters) => {
    if (!isEmpty(currentFilters)) {
      return true;
    }
    return false;
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
      <div className="page-container page-sidebar-fixed dashboard_wrap demoDashboardChanges">
        <Header {...this.props} />
        <SideBar {...this.props} />
        <div className="content-section p-lr-0">
          <div className="layout-gray">
            <div className="layout-gray">
              <div className="container-fluid card-body set-gutter ac-link">
                <div>
                  <h5 className="pageTitle my-4">Action Overview
                    {isUpdatedThere ?
                      <small className="text-grey m-l-15 lb-btn pull-right">
                      <SyncOutlined spin={syncSpin} className="p-r-5 cursor-pointer" onClick={this.updateActionOverview} />
                        {syncSpin? <i>Updating Tasks</i>: 'Updated at : '+lastUpdateTime}
                      </small>
                      : ''}
                  </h5>
                </div>
                {!isEmpty(actionOverview) ?
                  <Row>
                    {actionOverview.myApproval ? <Col md={4} lg={2}><ActionOverview props={this.props} task={'myTask'} processRequest={'approvals'} data={actionOverview.myApproval} status="Pending" title="Approvals assigned" showLastlogin={true} /></Col> : null}
                    {actionOverview.myTask ? <Col md={4} lg={2}><ActionOverview props={this.props} task={'myTask'} processRequest={'task'} data={actionOverview.myTask} status="Pending" title="Tasks assigned" showLastlogin={true} /></Col> : null}
                    {actionOverview.myRequest ? <Col md={4} lg={2} ><ActionOverview props={this.props} task={'myTask'} processRequest={'requests'} data={actionOverview.myRequest} status="My requests pending" title="" showLastlogin={false} reqText={this.state.reqText} /></Col> : null}
                    {actionOverview.myParts ? <Col md={4} lg={2}><ActionOverview props={this.props} task={'myTask'} processRequest={'parts'} data={actionOverview.myParts} status="Pending" title="Parts assigned" showLastlogin={true} unShowUnaddress={true} /></Col> : null}
                    {actionOverview.teamApproval ? <Col md={4} lg={2} ><ActionOverview props={this.props} task={'teamTask'} processRequest={'approvals'} data={actionOverview.teamApproval} status="Pending" title="Approvals assigned (team)" team={true} showLastlogin={true} /></Col> : null}
                    {actionOverview.teamTask ? <Col md={4} lg={2}><ActionOverview props={this.props} task={'teamTask'} processRequest={'task'} data={actionOverview.teamTask} status="Pending" title="Tasks assigned (team)" team={true} showLastlogin={true} /></Col> : null}
                    {actionOverview.teamRequest ? <Col md={4} lg={2} ><ActionOverview props={this.props} task={'teamTask'} processRequest={'requests'} data={actionOverview.teamRequest} status="Team requests pending" title="" team={true} showLastlogin={false} reqText={this.state.reqText} /></Col> : null}
                    {actionOverview.teamParts ? <Col md={4} lg={2}><ActionOverview props={this.props} task={'teamTask'} processRequest={'parts'} data={actionOverview.teamParts} status="Pending" title="Parts assigned (team)" team={true} showLastlogin={true} unShowUnaddress={true} /></Col> : null}
                  </Row>
                  : !isRequestActionOverview ? null : <Spinner tip={"Refreshing Data"}/>}
              </div>
              <div className="my-3 p-lr-15 flex align-center">
                <Radio.Group defaultValue="chart" buttonStyle="solid" onChange={this.showCharts}>
                  <Radio.Button value="chart">Chart</Radio.Button>
                  <Radio.Button value="list">Table</Radio.Button>
                </Radio.Group>
                <PowerFilter options={this.state.filters} selectedFilters={this.selectedFilters} values={this.state.selFilters} getOption={this.getProgramId} height="250px" reset={false}  menuPos="absolute"/>

                <span className="sel-list m-l-15 flex-1">
                  {!isEmpty(this.state.selFiltersCard) && Object.keys(this.state.selFiltersCard).map((fil, i) => {
                    if (this.state.selFiltersCard[fil] && this.state.selFilters[fil] !== null && !isEmpty(this.state.selFiltersCard[fil]) && fil !== "visible") {
                      return (
                        <span className="sel-list-data p-l-r-10 p-b-t-7 d-inline m-b-5" id={fil} key={fil}>
                          {this.state.selFiltersCard[fil].length > 1 ?
                            <span className="cursor-pointer">{capitalizeVariableNames(fil)}: <Popover
                              id={fil}
                              content={this.renderMultiple(this.state.selFiltersCard[fil], fil)}
                              placement="bottom"
                              trigger="click"
                              visible={this.state[`${fil}visible`]}
                              onVisibleChange={(visible) => this.handleVisibleChange(visible, fil)}
                            >
                              <span className="db-bold-blue">
                                Multiple
                                <CaretDownIcon />
                              </span>
                            </Popover>
                            </span> :
                            <span>{capitalizeVariableNames(fil)}: <span className="db-bold-blue">{this.state.selFiltersCard[fil][0].label}</span></span>}
                        </span>
                      )
                    }
                  })}
                  {(this.isShowResetButton(this.state.selFilters)) ?
                    <small className="text-blue m-l-15 cursor-pointer lb-btn" onClick={this.clearSelectedFilters}>Reset</small>
                    : null}
                </span>
              </div>
            </div>

            <div className="container-fluid">
              <div className="">
                {this.state.chartView ?
                  <div className="set-gutter-c charts-section">
                    <Row className="row-one">
                      <Col md={3}>
                        {isEmpty(this.state.partStatus) ? <Spinner /> :
                          <DataVisual
                            componentData={this.state.partStatus}
                            action="complete"
                            title="Part Status"
                            identifier="partStatus"
                            isChart={true}
                            isProgress={false}
                            isRFP={false}
                            chartStatus="Created"

                          />}
                      </Col>
                      <Col md={3}>
                        {isEmpty(this.state.costEstimate) ? <Spinner /> :
                          <DataVisual
                            componentData={this.state.costEstimate}
                            action="complete"
                            title="Cost Estimation"
                            identifier="costEst"
                            isChart={false}
                            isProgress={true}
                            barStatus={["Requested", "Completed", "Submitted", "Completed"]}
                            isRFP={false}
                            chartStatus="Completed"
                          />}
                      </Col>
                      <Col md={3}>
                        {isEmpty(this.state.rfp) ? <Spinner /> :
                          <DataVisual
                            componentData={this.state.rfp}
                            action="pending"
                            title="RFP"
                            identifier="rfp"
                            isChart={false}
                            isProgress={true}
                            barStatus={["Created", "", "Assigned"]}
                            isRFP={true}
                            chartStatus="Created"
                          />}
                      </Col>
                      <Col md={3}>
                        {isEmpty(this.state.assignBuyer) ? <Spinner /> :
                          <DataVisual
                            componentData={this.state.assignBuyer}
                            action="pending"
                            title="Assign Buyer"
                            identifier="assignBuyer"
                            isChart={false}
                            isProgress={true}
                            barStatus={["Assigned to Buyers", "", "Assigned", ""]}
                            isRFP={false}
                            chartStatus="Assigned"
                          />}
                      </Col>
                    </Row>

                    <div className="my-4">
                      <h5 className="chart-diff">Production Parts</h5>
                    </div>

                    <Row className="row-two">
                      <Col md={3}>
                        {isEmpty(this.state.rfq) ? <Spinner /> :
                          <DataVisual
                            componentData={this.state.rfq}
                            action="complete"
                            title="RFQ"
                            identifier="prodRFQ"
                            isChart={true}
                            isProgress={true}
                            barStatus={["", "Sent", "", "Sent"]}
                            isRFP={false}
                            chartStatus="Sent"
                            chartTitle="Quotations Received"
                          />}
                      </Col>
                      <Col md={3}>
                        {isEmpty(this.state.sa) ? <Spinner /> :
                          <DataVisual
                            componentData={this.state.sa}
                            action="complete"
                            title="Sourcing Approval"
                            identifier="prodSA"
                            isChart={true}
                            isProgress={true}
                            barStatus={["", "Approved", "", "Approved"]}
                            isRFP={false}
                            chartStatus="PO Released"
                            chartTitle="Purchase Orders"
                          />}
                      </Col>
                      <Col md={3}>
                        {isEmpty(this.state.ppap) ? <Spinner /> :
                          <DataVisual
                            componentData={this.state.ppap}
                            action="complete"
                            title="PPAP"
                            identifier="prodPPAP"
                            isChart={true}
                            isProgress={false}
                            isRFP={false}
                            chartStatus="(Incl. Deviation)"
                          />}
                      </Col>
                      <Col md={3}>
                        {isEmpty(this.state.inventory) ? <Spinner /> :
                          <DataVisual
                            componentData={this.state.inventory}
                            action="complete"
                            title="Inventory"
                            identifier="prodInv"
                            isChart={true}
                            isProgress={false}
                            isRFP={false}
                            chartStatus="Available"
                          />}
                      </Col>
                    </Row>

                    <div className="my-4">
                      <h5 className="chart-diff">Proto Parts</h5>
                    </div>

                    <Row className="row-three">
                      <Col md={3}>
                        {isEmpty(this.state.rfqProto) ? <Spinner /> :
                          <DataVisual
                            componentData={this.state.rfqProto}
                            action="complete"
                            title="RFQ"
                            identifier="protoRFQ"
                            isChart={true}
                            isProgress={true}
                            barStatus={["", "Sent", "", "Sent"]}
                            isRFP={false}
                            chartStatus="Sent"
                            chartTitle="Quotations Received"
                          />}
                      </Col>
                      <Col md={3}>
                        {isEmpty(this.state.saProto) ? <Spinner /> :
                          <DataVisual
                            componentData={this.state.saProto}
                            action="complete"
                            title="Sourcing Approval"
                            identifier="protoSA"
                            isChart={true}
                            isProgress={true}
                            barStatus={["", "Approved", "", "Approved"]}
                            isRFP={false}
                            chartStatus="PO Released"
                            chartTitle="Quotations Received"
                          />}
                      </Col>
                      <Col md={3}>
                        {isEmpty(this.state.ppapProto) ? <Spinner /> :
                          <DataVisual
                            componentData={this.state.ppapProto}
                            action="complete"
                            title="PPAP"
                            identifier="protoPPAP"
                            isChart={true}
                            isProgress={false}
                            isRFP={false}
                            chartStatus="(Incl. Deviation)"
                          />}
                      </Col>
                      <Col md={3}>
                        {isEmpty(this.state.inventoryProto) ? <Spinner /> :
                          <DataVisual
                            componentData={this.state.inventoryProto}
                            action="complete"
                            title="Inventory"
                            identifier="protoInv"
                            isChart={true}
                            isProgress={false}
                            isRFP={false}
                            chartStatus="Available"
                          />}
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        {isEmpty(this.state.lineChartData) ? <Spinner /> :
                          <LineChart
                            dataList={this.state.lineChartData}
                            getTimeStampDate={this.getTimeStampDate}
                          />
                        }
                      </Col>
                    </Row>

                  </div> :
                  <div className="my-4">
                    <DashboardPage
                      requestParams={requestParam}
                    />
                  </div>
                }
              </div>
            </div >
          </div >
        </div >
      </div >

    )
  }
}
export default DemoDashboard;
