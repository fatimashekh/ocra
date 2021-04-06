import {
  GET_PART_STATUS,
  GET_PART_STATUS_ERROR,
  GET_PART_STATUS_SUCCESS,
  GET_COST_ESTIMATION,
  GET_COST_ESTIMATION_SUCCESS,
  GET_COST_ESTIMATION_ERROR,
  GET_RFP,
  GET_RFP_SUCCESS,
  GET_RFP_ERROR,
  GET_RFQ,
  GET_RFQ_SUCCESS,
  GET_RFQ_ERROR,
  GET_RFQ_PROTO,
  GET_RFQ_PROTO_SUCCESS,
  GET_RFQ_PROTO_ERROR,
  GET_PPAP,
  GET_PPAP_SUCCESS,
  GET_PPAP_ERROR,
  GET_PPAP_PROTO,
  GET_PPAP_PROTO_SUCCESS,
  GET_PPAP_PROTO_ERROR,
  GET_INVENTORY,
  GET_INVENTORY_SUCCESS,
  GET_INVENTORY_ERROR,
  GET_INVENTORY_PROTO,
  GET_INVENTORY_PROTO_SUCCESS,
  GET_INVENTORY_PROTO_ERROR,
  GET_SA,
  GET_SA_SUCCESS,
  GET_SA_ERROR,
  GET_SA_PROTO,
  GET_SA_PROTO_SUCCESS,
  GET_SA_PROTO_ERROR,
  GET_LINE_CHART_DATA_SUCCESS,
  GET_LINE_CHART_DATA_ERROR,
  GET_ASSIGN_BUYER,
  GET_ASSIGN_BUYER_SUCCESS,
  GET_ASSIGN_BUYER_ERROR,
  GET_DASHBOARD_FILTER,
  GET_DASHBOARD_FILTER_SUCCESS,
  GET_ACTION_OVERVIEW,
  GET_ACTION_OVERVIEW_SUCCESS,
  GET_ACTION_OVERVIEW_ERROR,
  SAVE_DB_FILTER
} from "./types";

const INITIAL_STATE = {
  partStatus: { chartData: [{ label: "", value: 1, status: "#bdbdbd", noData: true }] },
  costEstimate: {
    "progressData":
      [{
        "total": 0,
        "assigned": 0,
        "unAssigned": 0,
        "action": "pending",
      },
      {
        "total": 0,
        "assigned": 0,
        "unAssigned": 0,
        "action": "complete",
      }]
  },
  rfp: {
    rfpData: { prodPart: 0, protoPart: 0, make: 0, buy: 0, makeBuy: 0 },
    "progressData":
      [{
        "total": 0,
        "assigned": 0,
        "unAssigned": 0,
        "action": "pending",
      }]
  },
  rfq: {
    chartData: [{ label: "", value: 1, status: "#bdbdbd", noData: true }],
    "progressData":
      [{
        "total": 0,
        "assigned": 0,
        "unAssigned": 0,
        "action": "completed",
      }]
  },
  rfqProto: {
    chartData: [{ label: "", value: 1, status: "#bdbdbd", noData: true }],
    "progressData":
      [{
        "total": 0,
        "assigned": 0,
        "unAssigned": 0,
        "action": "completed",
      }]
  },
  ppap: { chartData: [{ label: "", value: 1, status: "#bdbdbd", noData: true }] },
  ppapProto: { chartData: [{ label: "", value: 1, status: "#bdbdbd", noData: true }] },
  inventory: { chartData: [{ label: "", value: 1, status: "#bdbdbd", noData: true }] },
  inventoryProto: { chartData: [{ label: "", value: 1, status: "#bdbdbd", noData: true }] },
  saProto: {
    chartData: [{ label: "", value: 1, status: "#bdbdbd", noData: true }],
    "progressData":
      [{
        "total": 0,
        "assigned": 0,
        "unAssigned": 0,
        "action": "completed",
      }]
  },
  sa: {
    chartData: [{ label: "", value: 1, status: "#bdbdbd", noData: true }],
    "progressData":
      [{
        "total": 0,
        "assigned": 0,
        "unAssigned": 0,
        "action": "completed",
      }]
  },
  assignBuyer: {
    "progressData":
      [{
        "total": 0,
        "assigned": 0,
        "unAssigned": 0,
        "action": "pending",
      }]
    },
  dashBoardFilter: [],
  actionOverview: {},
  saveFilter: [],
  chartData: { chartData: [{ label: "", value: 1, status: "#bdbdbd", noData: true }] },
  progressData: {
    "progressData":
      [{
        "total": 0,
        "assigned": 0,
        "unAssigned": 0,
        "action": "pending",
      },
      {
        "total": 0,
        "assigned": 0,
        "unAssigned": 0,
        "action": "complete",
      }]
  },
  rfpData: {
    rfpData: { prodPart: 0, protoPart: 0, make: 0, buy: 0, makeBuy: 0 },
    "progressData":
      [{
        "total": 0,
        "assigned": 0,
        "unAssigned": 0,
        "action": "pending",
      }]
  },
  rfqData: {
    chartData: [{ label: "", value: 1, status: "#bdbdbd", noData: true }],
    "progressData":
      [{
        "total": 0,
        "assigned": 0,
        "unAssigned": 0,
        "action": "completed",
      }]
  },
  lineChartData: {
    projectStatus: [],
    dateWiseGraph: [],
    lineGraph: [],
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case GET_PART_STATUS:
      return Object.assign({}, state, {
        partStatus: state.chartData
      }); 

    case GET_PART_STATUS_SUCCESS:
      return Object.assign({}, state, {
        partStatus: action.payload
      });

    case GET_PART_STATUS_ERROR:
      return Object.assign({}, state, {
        partStatus: state.chartData
      });

    case GET_COST_ESTIMATION:
      return Object.assign({}, state, {
        costEstimate: state.progressData
      });

    case GET_COST_ESTIMATION_SUCCESS:
      return Object.assign({}, state, {
        costEstimate: action.payload
      });

    case GET_COST_ESTIMATION_ERROR:
      return Object.assign({}, state, {
        costEstimate: state.progressData
      });

    case GET_RFP:
      return Object.assign({}, state, {
        rfp: state.rfpData
      });

    case GET_RFP_SUCCESS:
      return Object.assign({}, state, {
        rfp: action.payload
      });

    case GET_RFP_ERROR:
      return Object.assign({}, state, {
        rfp: state.rfpData
      });

    case GET_RFQ:
      return Object.assign({}, state, {
        rfq: state.rfqData
      });

    case GET_RFQ_SUCCESS:
      return Object.assign({}, state, {
        rfq: action.payload
      });

    case GET_RFQ_ERROR:
      return Object.assign({}, state, {
        rfq: state.rfqData
      });

    case GET_RFQ_PROTO:
      return Object.assign({}, state, {
        rfqProto: state.rfqData
      });

    case GET_RFQ_PROTO_SUCCESS:
      return Object.assign({}, state, {
        rfqProto: action.payload
      });

    case GET_RFQ_PROTO_ERROR:
      return Object.assign({}, state, {
        rfqProto: state.rfqData
      });

    case GET_PPAP:
      return Object.assign({}, state, {
        ppap: state.chartData
      });

    case GET_PPAP_SUCCESS:
      return Object.assign({}, state, {
        ppap: action.payload
      });

    case GET_PPAP_ERROR:
      return Object.assign({}, state, {
        ppap: state.chartData
      });

    case GET_PPAP_PROTO:
      return Object.assign({}, state, {
        ppapProto: state.chartData
      });

    case GET_PPAP_PROTO_SUCCESS:
      return Object.assign({}, state, {
        ppapProto: action.payload
      });

    case GET_PPAP_PROTO_ERROR:
      return Object.assign({}, state, {
        ppapProto: state.chartData
      });

    case GET_INVENTORY:
      return Object.assign({}, state, {
        inventory: state.chartData
      });

    case GET_INVENTORY_SUCCESS:
      return Object.assign({}, state, {
        inventory: action.payload
      });

    case GET_INVENTORY_ERROR:
      return Object.assign({}, state, {
        inventory: state.chartData
      });

    case GET_INVENTORY_PROTO:
      return Object.assign({}, state, {
        inventoryProto: state.chartData
      });

    case GET_INVENTORY_PROTO_SUCCESS:
      return Object.assign({}, state, {
        inventoryProto: action.payload
      });

    case GET_INVENTORY_PROTO_ERROR:
      return Object.assign({}, state, {
        inventoryProto: state.chartData
      });

    case GET_SA:
      return Object.assign({}, state, {
        sa: state.rfqData
      });

    case GET_SA_SUCCESS:
      return Object.assign({}, state, {
        sa: action.payload
      });

    case GET_SA_ERROR:
      return Object.assign({}, state, {
        sa: state.rfqData
      });

    case GET_SA_PROTO:
      return Object.assign({}, state, {
        saProto: state.rfqData
      });

    case GET_SA_PROTO_SUCCESS:
      return Object.assign({}, state, {
        saProto: action.payload
      });

    case GET_SA_PROTO_ERROR:
      return Object.assign({}, state, {
        saProto: state.rfqData
      });

    case GET_LINE_CHART_DATA_SUCCESS:
      return Object.assign({}, state, {
        lineChartData: action.payload
      });

    case GET_LINE_CHART_DATA_ERROR:
      return Object.assign({}, state, {
        lineChartData: state.lineChartData
      });

    case GET_ASSIGN_BUYER:
      return Object.assign({}, state, {
        assignBuyer: state.progressData[0]
      });

    case GET_ASSIGN_BUYER_SUCCESS:
      return Object.assign({}, state, {
        assignBuyer: action.payload
      });

    case GET_ASSIGN_BUYER_ERROR:
      return Object.assign({}, state, {
        assignBuyer: state.progressData[0]
      });

    case GET_DASHBOARD_FILTER_SUCCESS:
      return Object.assign({}, state, {
        dashBoardFilter: action.payload
      });

    case GET_ACTION_OVERVIEW:
      return Object.assign({}, state, {
        actionOverview: []
      });

    case GET_ACTION_OVERVIEW_SUCCESS:
      return Object.assign({}, state, {
        actionOverview: action.payload
      });

    case GET_ACTION_OVERVIEW_ERROR:
      return Object.assign({}, state, {
        actionOverview: []
      });

    case SAVE_DB_FILTER:
      return Object.assign({}, state, {
        saveFilter: action.payload 
      });

      

    default:
      return state;
  }
};