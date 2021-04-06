import { post, get } from "axios";
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
  GET_LINE_CHART_DATA,
  GET_ASSIGN_BUYER,
  GET_ASSIGN_BUYER_SUCCESS,
  GET_ASSIGN_BUYER_ERROR,
  GET_DASHBOARD_FILTER,
  GET_DASHBOARD_FILTER_SUCCESS,
  GET_ACTION_OVERVIEW,
  GET_ACTION_OVERVIEW_SUCCESS,
  SAVE_DB_FILTER
} from "./types";
import ocraApiService from "../../common/core/api/apiService";

export const actionGetPartStatus = data => {
  const request = ocraApiService("getPartStatusWidget", data);
  return {
    type: GET_PART_STATUS,
    payload: request
  };
};


export const actionGetPartStatusSuccess = data => {
  return {
    type: GET_PART_STATUS_SUCCESS,
    payload: data
  };
};

export const actionGetError = errorType => {
  return {
    type: errorType
  };
};


export const actionGetCostEstimation = data => {
  const request = ocraApiService("getCostEstimation", data);
  return {
    type: GET_COST_ESTIMATION,
    payload: request
  };
};

export const actionGetCostEstimationSuccess = data => {
  return {
    type: GET_COST_ESTIMATION_SUCCESS,
    payload: data
  };
};

export const actionGetRFP = data => {
  const request = ocraApiService("getRFPWidget", data);
  return {
    type: GET_RFP,
    payload: request
  };
};


export const actionGetRFPSuccess = data => {
  return {
    type: GET_RFP_SUCCESS,
    payload: data
  };
};

export const actionGetRFQ = data => {
  let typeOfPart =  data.typeOfPart === "" ? "production" :  data.typeOfPart; 
  let postdata = Object.assign({}, data, {typeOfPart: typeOfPart});
  postdata.partType = "production";
  const request = ocraApiService("getRFQWidget", postdata);
  return {
    type: GET_RFQ,
    payload: request
  };
};


export const actionGetRFQSuccess = data => {
  return {
    type: GET_RFQ_SUCCESS,
    payload: data
  };
};

export const actionGetRFQProto = data => {
  let typeOfPart =  data.typeOfPart === "" ? "proto" :  data.typeOfPart;
  let postdata = Object.assign({}, data, {typeOfPart: typeOfPart});
  postdata.partType = "proto";
  const request = ocraApiService("getRFQWidgetProto", postdata);
  return {
    type: GET_RFQ_PROTO,
    payload: request
  };
};


export const actionGetRFQProtoSuccess = data => {
  return {
    type: GET_RFQ_PROTO_SUCCESS,
    payload: data
  };
};

export const actionGetPPAPSuccess = data => {
  return {
    type: GET_PPAP_SUCCESS,
    payload: data
  };
};

export const actionGetPPAPProto = data => {
  let typeOfPart =  data.typeOfPart === "" ? "proto" :  data.typeOfPart;
  let postdata = Object.assign({}, data, {typeOfPart: typeOfPart});
  const request = ocraApiService("getPPAPWidgetProto", postdata);
  return {
    type: GET_PPAP_PROTO,
    payload: request
  };
};


export const actionGetPPAPProtoSuccess = data => {
  return {
    type: GET_PPAP_PROTO_SUCCESS,
    payload: data
  };
};


export const actionGetInventorySuccess = data => {
  return {
    type: GET_INVENTORY_SUCCESS,
    payload: data
  };
};

export const actionGetInventoryProto = data => {
  let typeOfPart =  data.typeOfPart === "" ? "proto" :  data.typeOfPart;
  let postdata = Object.assign({}, data, {typeOfPart: typeOfPart}); 

  const request = ocraApiService("getInventoryWidgetProto", postdata);
  return {
    type: GET_INVENTORY_PROTO,
    payload: request
  };
};


export const actionGetInventoryProtoSuccess = data => {
  return {
    type: GET_INVENTORY_PROTO_SUCCESS,
    payload: data
  };
};


export const actionGetSASuccess = data => {
  return {
    type: GET_SA_SUCCESS,
    payload: data
  };
};

export const actionGetSAProto = data => {
  let typeOfPart =  data.typeOfPart === "" ? "proto" :  data.typeOfPart;
  let postdata = Object.assign({}, data, {typeOfPart: typeOfPart}); 
  postdata.partType = "proto";
  const request = ocraApiService("getSAWidgetProto", postdata);
  return {
    type: GET_SA_PROTO,
    payload: request
  };
};


export const actionGetSAProtoSuccess = data => {
  return {
    type: GET_SA_PROTO_SUCCESS,
    payload: data
  };
};

export const actionGetLineChartData = data => {
  const request = ocraApiService("getLineChartData", data);
  return {
    type: GET_LINE_CHART_DATA,
    payload: request
  };
};


export const actionGetLineChartDataSuccess = data => {
  return {
    type: GET_LINE_CHART_DATA_SUCCESS,
    payload: data
  };
};

export const actionGetAssignBuyerData = data => {
  const request = ocraApiService("getAssignedBuyerWidget", data);
  return {
    type: GET_ASSIGN_BUYER,
    payload: request
  };
};

export const actionGetAssignBuyerDataSuccess = data => {
  return {
    type: GET_ASSIGN_BUYER_SUCCESS,
    payload: data
  };
};

export const actionGetDashboardFilter = data => {
  const request = ocraApiService("getDashboardFilterData", data);
  return {
    type: GET_DASHBOARD_FILTER,
    payload: request
  };
};

export const actionGetDashboardFilterSuccess = data => {
  return {
    type: GET_DASHBOARD_FILTER_SUCCESS,
    payload: data
  };
}

export const actionGetActionOverview = data => {
  const request = ocraApiService("getActionOverview", data);
  return {
    type: GET_ACTION_OVERVIEW,
    payload: request
  };
};

export const actionUpdateActionOverview = data => {
  const request = ocraApiService("updateActionOverview", data);
  return {
    type: GET_ACTION_OVERVIEW,
    payload: request
  };
};

export const actionGetActionOverviewSuccess = data => {
  return {
    type: GET_ACTION_OVERVIEW_SUCCESS,
    payload: data
  };
};

export const actionSaveDBFilter = data => {
  return {
    type: SAVE_DB_FILTER,
    payload: data
  };
};



