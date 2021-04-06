import {
  post
} from 'axios';
import AppConfig from '../../common/core/config/appConfig';
import {
  GET_PURCHASE_CATEGORY_DATA,
  GET_PROJECT_LIST_FOR_INDIRECT_PURCHASE,
  GET_PART_LIST_BY_PROJECT,
  UPLOAD_SPECIFICATION_FOR_INDIRECT,
  UPLOAD_STATEMENT_OF_WORK__FOR_INDIRECT,
  SUBMIT_INDIRECT_PURCHASE,
  CHECK_ACC_NO,
  GET_LIST_OF_INDIRECT_PURCHASE,
  GET_DELETE_OF_INDIRECT_PURCHASE,
  SAVE_PURCHASE_DATA,
  BUDGET_ONE,
  UPLOAD_BUDGET_DOCUMENT,
  CREATE_ECO,TARGET_DATE,
  GET_ECO_DROPDOWN_DATA,
  CREATE_GEOGRAPHICAL,
  GET_GEOGRAPHICAL,
  DELETE_GEOGRAPHICAL,
  GET_BUILD_PLAN_DATA,
  CREATE_BUILD_PLAN_DATA,
  GET_ECO_PART_DROPDOWN_DATA,
  GET_BOM_BUILD_PLAN_DROPDOWN_DATA,
  UPDATE_BUILD_PLAN_DATA,
  GET_APPROVER_BUILD_PLAN_DATA,
  ADD_APPROVER_BUILD_PLAN_DATA,
  ADD_COMMENT_REVISION_DATA,
  GET_REGION_SUBREGION_COUNTRY,
  CREATE_CLASSIFICATION,
  GET_ALL_PROJECT_DATA,
  CREATE_SPENDING_CATEGORY,
  GET_SPENDING_CATEGORY,
  DELETE_SPENDING_CATEGORY,
  CREATE_FUNCTIONAL_AREA,
  GET_FUNCTIONAL_AREA,
  DELETE_FUNCTIONAL_AREA,
  CREATE_PRODUCT_COST,
  GET_PRODUCT_COST,
  DELETE_PRODUCT_COST,
  CREATE_BRAND_COST,
  GET_BRAND_COST,
  DELETE_BRAND_COST,
  GET_BOM_VARIANT_DATA,
  GET_BOM_SUB_VARIANT_DATA,
  CREATE_FINANCIAL,
  GET_FINANCIAL,
  GET_PRODUCT_LINE,
  GET_MODEL_FAMILY,
  CREATE_LOCATION,
  GET_LOCATION,
  GET_PART_BY_KEYWORD,
  DELETE_PURCHASE_CATEGORY_DATA,
  GET_CLASSIFICATION,
  GET_BOM_CALCULATION_DATA,
  UPDATE_BOM_DATA,
  GET_FILTER_BOM_DATA,
  GET_SUGGESSION,
  GET_ACCOUNT_NUMBER,
  GET_SUGGESSION_FILTER_DATA,
  GET_WHERE_USED_DATA,
  GET_FIND_ALL_BOM_DATA,
  DELETE_BUDGET,
  GET_BUDGET,
  SET_BUDGET_APPROVAL,
  SAVE_BUDGET_REVISION_DATA,
  GET_SUGGESSION_USER,
  GET_PRODUCTLINE_DROPDOWN_DATA,
  GET_MODEL_FAMILY_DROPDOWN_DATA,
  GET_MODEL_DROPDOWN_DATA,
  CREATE_BOM,
  CREATE_ACTIVE_NEW_REVISION,
  GET_FREEZE,
  DELETE_PART_IMAGE,
  GET_SUGGESSION_PART_NUMBER,
  CREATE_APPROVER_GROUP,
  GET_APPROVER_GROUP,
  DELETE_APPROVER_GROUP,
  GET_BUYER_ADDRESS,
  GET_SUPPLIER_ADDRESS,
  GET_CONTRACT_TEMPLATE,
  ADD_CONTRACT_TEMPLATE,
  CREATE_CONTRACT,
  RFQPO_SUPPLIER,
  RFQPO_SUPPLIER_LIST,
  GET_ONLINE_PURCHASE_CONTRACT,
  ADD_COMMENT_CONTRACT,
  GET_CONTRACT_APPROVAL,
  GET_CREATED_CONTRACT,
  PERMISSION,
  GET_ORG_SUPPLIER,
  GET_PURCHASE_QUOATION_BUYER_RELEASE,
  CREATE_AGREEMENT,
  DIRECT_PURCHASE,
  GET_PURCHASE_AGREEMENT_FOR_ORDER,
  CREATE_PURCHASE_ORDER,
  GET_AGREEMENT_FOR_APPROVAL_PROCESS,
  SET_AGREEMENT_FOR_APPROVAL,
  GET_BLANKET_ORDER_FOR_APPROVAL,
  SPOT_BUY,
  UPLOAD_SIGNATURE,
  PURCHASE_AGREEMNET_DATA,
  STANDAR_PURCHASE,
  PURCHASE_REQUISITION_DATA,
  SET_SPOT_BUY_APPROVAL,
  SET_BLANKET_PO_RELEASE_APPROVAL,
  SET_BLANKET_PO_APPROVAL,
  SET_STANDARD_PO_APPROVAL,
  DIRECT_PO_APPROVAL,
  CHECK_DUPLIACTE_USER_PROFILE,
  DELETE_DIRECT_PURCHASE,
  CHECK_APPROVAL_SKIP,
  CRETAE_COMMODITY,
  GET_COMMODITY,
  DELETE_COMMODITY,
  UPLOAD_DOCUMENT,
  ADMIN_SETUP_TEMPLATE,
  LOCATION_DELETE,
  SUPPLIER_CODE,
  PPAP,BULK_PO_APPROVE,
  DELETE_USER_ROLE,
  CREATE_RAW_MATERIAL,
  GET_RAW_MATERIAL,
  DELETE_RAW_MATERIAL,
  UPDATE_RAW_MATERIAL,
  RESET_VERIFICATION_LINK,
  BUYER_CONTACT_PERSON,
  HISTORICALLY_DATA,
  GET_RAW_MATERIAL_DD_LIST,
  CREATE_RAWMATERIAL,
  GET_RAW_MATERIAL_BY_ID,
  UPDATE_RAW_MATERIAL_DATA,
  GET_RM_RATE_CHANGE_AGREEMENT,
  GET_RM_AGREEMENT_DATA,
  RM_AGREEMENT_APPROVAL,
  CREATE_BLANKET_RENEWAL,
  GET_BLANKET_RENEWAL,
  GET_REEVALUETERFQ,
  GET_PART_BY_RFQ_ID,
  GET_SUGGESTION_COMMODITY,
  CREATE_PROGRAM,
  GET_PROGRAM,
  DELETE_PROGRAM,
  GET_PART_AND_BUYERS,
  GET_BOM_CODE_LIST,
  CREATE_PART_BOM,
  GET_COMPONENTTYPE_LIST,
  GET_QUALITY_SIGNIFICANCE_LIST,
  PART_SEARCH_FOR_BOM,
  VENDOR_DOC,
  SEARCH_FOR_ITEM_CODE,
  SEARCH_FOR_PART_LIST,
  GET_CURRENT_RFQ_BY_PART_ID,
  GET_WAREHOUSE_DD,
  GET_WAREHOUSE_LIST,
  GET_ALL_PARTS_IN_WAREHOUSE,
  SAVE_WAREHOUSE_DATA,
  DELETE_WAREHOUSE_DATA,
  CREATE_AMENDPO,
  GET_AMENDPO,
  WAREHOUSE_DATA_WITH_REGION,
  GET_WAREHOUSE_LOCATION,
  SAVE_WAREHOUSE_LOCATION,
  GET_PRODUCT_SEGMENT_DROPDOWN_DATA,
  GET_PRODUCTLINE_SEG_DROPDOWN_DATA,
  GET_BOM,
  DELETE_BOM,
  INVENTORY_FILTER_DATA, CREATE_INVENTORY,
  GET_BOM_LINE_ITEM,
  REVERT_BOM_LINE_ITEM,
  SAVE_BOM_LINE_ITEM,
  HISTORY_BOM_DATA,
  CURRENCY_EXCHANGE,
  GET_ASSIGNED_REQUEST,
  GET_TASK_ACTION,
  SEND_DELETE_ARCHIVE_IDS,
  ADD_NAVIGATION_BOOKMARK,
  GET_NAVIGATION_ITEM,
  DELETE_NAVIGATION_BOOKMARK,
  SET_BOOKMARK_ID,
  GET_NAVIGATION_ITEM_SUCCESS,
  ENABLE_BOM_OPTION,
  GET_ENABLE_BOM_OPTION,
  SET_TAB_KEY,
  PART_CIRCULATION_LIST,
  MENU_TOGGLE,USER_SESSION_LOGOUT,
  GET_REG_APPROVAL, GET_REG_APPROVAL_SUCCESS,
  SAVE_REG_APPROVAL, SAVE_REG_APPROVAL_SUCCESS,
  DELETE_REG_APPROVAL,
  BLANK_NAVIGATION_ITEM, GET_PROJECT_PART, GET_MAPPING_COLUMNS,
  GET_BUYER_COLUMN_MAPPINGS,
  SAVE_BUYER_COLUMN_MAPPINGS, SEARCH_FOR_PART_AND_BOM_LIST, GET_PART_DEATIL_FOR_RFP,
  GET_ADDRESS_FOR_RFP, GET_EVALUATION_TEMPLATE, EVALUATION_TEMPLATE_CREATE, GET_TEMPLATE_DATA,
  APPROVE_SENDBACK_TEMPLATE, GET_EVALUATION_LIST, GET_SUPPLIER_LIST, GET_DETAIL_SUPPLIER_LIST,
  EVALUATION_LIST_UPDATE, DELETE_EVALUATION_TEMPLATE, DELETE_EVALUATION_LIST, EVALUATION_TEMPLATE_UPDATE,
  GET_EVALUATION_DATA_BYID, GET_LOOKUP_LIST, GET_SERIES_GROUP_MAP,
  GET_PURCHASE_ORDERS, SEARCH_PURCHASE_ORDER, GET_GROUP_CODE_LIST, INSPECTION_UPDATE, INSPECTION_DELETE,
  GET_ERP_FREE_STOCK_LIST,
  PROCESS_BOM_PARTS,
  COST_BOM_DATA, INSERT_LEGACY_DATA, DELETE_LEGACY_DATA,
  GET_ERP_CONNECTION_STATUS,ALL_USER_PROFILE

} from './types';

import ocraApiService from '../../common/core/api/apiService';

export const actionGetPurchaseCategoryData = data => {
  const request = ocraApiService('getPurchaseData', data);
  return {
    type: GET_PURCHASE_CATEGORY_DATA,
    payload: request
  };
};

export const actionGetProjectListForIndirectPurchase = data => {
  const request = ocraApiService(
    'getProjectListForIndirectPurchase',
    data
  );
  return {
    type: GET_PROJECT_LIST_FOR_INDIRECT_PURCHASE,
    payload: request
  };
};

export const actionGetPartListForIndirectPurchase = data => {
  const request = ocraApiService('getPartListByProject', data);
  return {
    type: GET_PART_LIST_BY_PROJECT,
    payload: request
  };
};

export const actionUploadSpecificationForIndirect = data => {
  const url = AppConfig.API_URL_JAVA + '/api/v1/file/data/save';
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  const request = post(url, data, config);
  return {
    type: UPLOAD_SPECIFICATION_FOR_INDIRECT,
    payload: request
  };
};

export const actionUploadStatementOfWorkForIndirect = data => {
  const url = AppConfig.API_URL_JAVA + '/api/v1/file/data/save';
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  const request = post(url, data, config);
  return {
    type: UPLOAD_STATEMENT_OF_WORK__FOR_INDIRECT,
    payload: request
  };
};

export const actionSubmitIndirectPurchase = data => {
  const request = ocraApiService('submitIndirectPurchase', data);
  return {
    type: SUBMIT_INDIRECT_PURCHASE,
    payload: request
  };
};

export const actionCheckAccountNo = data => {
  const request = ocraApiService('checkAccountNo', data);
  return {
    type: CHECK_ACC_NO,
    payload: request
  };
};

export const actionGetListOfIndirectPurchase = data => {
  const request = ocraApiService('getListOfIndirectPurchase', data);
  return {
    type: GET_LIST_OF_INDIRECT_PURCHASE,
    payload: request
  };
};

export const actionDeleteOfIndirectPurchase = data => {
  const request = ocraApiService('deleteOfIndirectPurchase', data);
  return {
    type: GET_DELETE_OF_INDIRECT_PURCHASE,
    payload: request
  };
};

export const actionSavePurchaseData = data => {
  const request = ocraApiService('savePurchaseData', data);
  return {
    type: SAVE_PURCHASE_DATA,
    payload: request
  };
};

export const actionGetRevisionUsers = data => {
  const request = ocraApiService('getListOfRevisionUsers', data);
  return {
    type: BUDGET_ONE,
    payload: request
  };
};

export const actionSaveBudgetOne = data => {
  const request = ocraApiService('savebudgetOneData', data);
  return {
    type: BUDGET_ONE,
    payload: request
  };
};

export const actionUploadBudgetDocumentse = data => {
  const url = AppConfig.API_URL_JAVA + '/api/v1/file/data/save';
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  const request = post(url, data, config);
  return {
    type: UPLOAD_BUDGET_DOCUMENT,
    payload: request
  };
};

export const actionCreateECO = data => {
  const request = ocraApiService('createECOData', data);
  return {
    type: CREATE_ECO,
    payload: request
  };
};

export const actionECODropDownData = data => {
  const request = ocraApiService('getECODropDownData', data);
  return {
    type: GET_ECO_DROPDOWN_DATA,
    payload: request
  };
};

export const actionSaveGeographical = data => {
  const request = ocraApiService('saveGeographicalData', data);
  return {
    type: CREATE_GEOGRAPHICAL,
    payload: request
  };
};

export const actionGetGeographical = data => {
  const request = ocraApiService('getGeographicalData', data);
  return {
    type: GET_GEOGRAPHICAL,
    payload: request
  };
};

export const actionDeleteGetGeographical = data => {
  const request = ocraApiService('deleteGeographicalData', data);
  return {
    type: DELETE_GEOGRAPHICAL,
    payload: request
  };
};

export const actionGetBuildPlanData = data => {
  const request = ocraApiService('getBuildPlanData', data);
  return {
    type: GET_BUILD_PLAN_DATA,
    payload: request
  };
};

export const actionCreateBuildPlanData = data => {
  const request = ocraApiService('createBuildPlanData', data);
  return {
    type: CREATE_BUILD_PLAN_DATA,
    payload: request
  };
};

export const actionECOPartDropDownData = data => {
  const request = ocraApiService('getECOPartDropDownData', data);
  return {
    type: GET_ECO_PART_DROPDOWN_DATA,
    payload: request
  };
};

export const actionBOMBuildPlanDropDownData = data => {
  const request = ocraApiService('getBOMBuildPlanDropDownData', data);
  return {
    type: GET_BOM_BUILD_PLAN_DROPDOWN_DATA,
    payload: request
  };
};

export const actionUpdateBuildPlanData = data => {
  const request = ocraApiService('updateBuildPlanData', data);
  return {
    type: UPDATE_BUILD_PLAN_DATA,
    payload: request
  };
};

export const actionGetApproverData = data => {
  const request = ocraApiService('getApproverData', data);
  return {
    type: GET_APPROVER_BUILD_PLAN_DATA,
    payload: request
  };
};

export const actionAddApproverUser = data => {
  const request = ocraApiService('addApproverUser', data);
  return {
    type: ADD_APPROVER_BUILD_PLAN_DATA,
    payload: request
  };
};

export const actionAddCommentRevision = data => {
  const request = ocraApiService('addCommentOfRevision', data);
  return {
    type: ADD_COMMENT_REVISION_DATA,
    payload: request
  };
};

export const actionGetRegionDetails = data => {
  const request = ocraApiService('getRegionDetails', data);
  return {
    type: GET_REGION_SUBREGION_COUNTRY,
    payload: request
  };
};

export const actionSaveClassification = data => {
  const request = ocraApiService('saveClassificationData', data);
  return {
    type: CREATE_CLASSIFICATION,
    payload: request
  };
};

export const actionGetAllProjectData = data => {
  const request = ocraApiService('getAllProjectList', data);
  return {
    type: GET_ALL_PROJECT_DATA,
    payload: request
  };
};

export const actionSaveSpendingCategory = data => {
  const request = ocraApiService('saveSpendingCategoryData', data);
  return {
    type: CREATE_SPENDING_CATEGORY,
    payload: request
  };
};

export const actionGetSpendingCategory = data => {
  const request = ocraApiService('getSpendingCategoryData', data);
  return {
    type: GET_SPENDING_CATEGORY,
    payload: request
  };
};

export const actionDeleteSpendingCategory = data => {
  const request = ocraApiService('deleteSpendingCategoryData', data);
  return {
    type: DELETE_SPENDING_CATEGORY,
    payload: request
  };
};

export const actionSaveFunctionalArea = data => {
  const request = ocraApiService('saveFunctionalAreaData', data);
  return {
    type: CREATE_FUNCTIONAL_AREA,
    payload: request
  };
};

export const actionGetFunctionalArea = data => {
  const request = ocraApiService('getFunctionalAreaData', data);
  return {
    type: GET_FUNCTIONAL_AREA,
    payload: request
  };
};

export const actionDeleteFunctionalArea = data => {
  const request = ocraApiService('deleteFunctionalAreaData', data);
  return {
    type: DELETE_FUNCTIONAL_AREA,
    payload: request
  };
};

export const actionSaveProductCost = data => {
  const request = ocraApiService('saveProductCostData', data);
  return {
    type: CREATE_PRODUCT_COST,
    payload: request
  };
};

export const actionGetProductCost = data => {
  const request = ocraApiService('getProductCostData', data);
  return {
    type: GET_PRODUCT_COST,
    payload: request
  };
};

export const actionDeleteProductCost = data => {
  const request = ocraApiService('deleteProductCostData', data);
  return {
    type: DELETE_PRODUCT_COST,
    payload: request
  };
};

export const actionSaveBrandCost = data => {
  const request = ocraApiService('saveBrandCostData', data);
  return {
    type: CREATE_BRAND_COST,
    payload: request
  };
};

export const actionGetBrandCost = data => {
  const request = ocraApiService('getBrandCostData', data);
  return {
    type: GET_BRAND_COST,
    payload: request
  };
};

export const actionDeleteBrandCost = data => {
  const request = ocraApiService('deleteBrandCostData', data);
  return {
    type: DELETE_BRAND_COST,
    payload: request
  };
};

export const actionBOMVariantData = data => {
  const request = ocraApiService('getBOMVariantData', data);
  return {
    type: GET_BOM_VARIANT_DATA,
    payload: request
  };
};

export const actionBOMSubVariantData = data => {
  const request = ocraApiService('getBOMSubVariantData', data);
  return {
    type: GET_BOM_SUB_VARIANT_DATA,
    payload: request
  };
};

export const actionSaveFinancialYear = data => {
  const request = ocraApiService('saveFinancialYearData', data);
  return {
    type: CREATE_FINANCIAL,
    payload: request
  };
};

export const actionGetFinancialYear = data => {
  const request = ocraApiService('getFinancialYearData', data);
  return {
    type: GET_FINANCIAL,
    payload: request
  };
};

export const actionGetModelFamily = data => {
  const request = ocraApiService('getModelFamilyData', data);
  return {
    type: GET_MODEL_FAMILY,
    payload: request
  };
};

export const actionGetProductData = data => {
  const request = ocraApiService('getProductLineData', data);
  return {
    type: GET_PRODUCT_LINE,
    payload: request
  };
};

export const actionSaveLocation = data => {
  const request = ocraApiService('saveLocationData', data);
  return {
    type: CREATE_LOCATION,
    payload: request
  };
};

export const actionGetLocation = data => {
  const request = ocraApiService('getLocationData', data);
  return {
    type: GET_LOCATION,
    payload: request
  };
};

export const actionSearchPartByKeyword = data => {
  const request = ocraApiService('getPartByKeyword', data);
  return {
    type: GET_PART_BY_KEYWORD,
    payload: request
  };
};

export const actionGetClassifications = data => {
  const request = ocraApiService('getClassificationsData', data);
  return {
    type: GET_CLASSIFICATION,
    payload: request
  };
};

export const actionGetDiscription = data => {
  const request = ocraApiService('getDescriptionData', data);
  return {
    type: GET_PURCHASE_CATEGORY_DATA,
    payload: request
  };
};
export const actionDeletePurchaseData = data => {
  const request = ocraApiService('deletePurchaseData', data);
  return {
    type: DELETE_PURCHASE_CATEGORY_DATA,
    payload: request
  };
};

export const actionGetBOMCalculationData = data => {
  const request = ocraApiService('getBOMCalculationData', data);
  return {
    type: GET_BOM_CALCULATION_DATA,
    payload: request
  };
};

export const actionUpdateBOMData = data => {
  const request = ocraApiService('updateBOMData', data);
  return {
    type: UPDATE_BOM_DATA,
    payload: request
  };
};

export const actionGetBOMFilterData = data => {
  const request = ocraApiService('getBOMECOFilter', data);
  return {
    type: GET_FILTER_BOM_DATA,
    payload: request
  };
};
export const actionSuggessionData = data => {
  const request = ocraApiService('getSuggessionData', data);
  return {
    type: GET_SUGGESSION,
    payload: request
  };
};
export const actionAccountNumberData = data => {
  const request = ocraApiService('getAccountNumberData', data);
  return {
    type: GET_ACCOUNT_NUMBER,
    payload: request
  };
};
export const actionGetBudgetExtraData = data => {
  const request = ocraApiService('getBudgetExtraData', data);
  return {
    type: GET_ACCOUNT_NUMBER,
    payload: request
  };
};
export const actuionGetSuggessionFilterData = data => {
  const request = ocraApiService('getSuggessionFilterData', data);
  return {
    type: GET_SUGGESSION_FILTER_DATA,
    payload: request
  };
};
export const actuionGetWhereUsedData = data => {
  const request = ocraApiService('getWhereUsedData', data);
  return {
    type: GET_WHERE_USED_DATA,
    payload: request
  };
};
export const actuionGetFindAllBOMData = data => {
  const request = ocraApiService('getFindAllBOMData', data);
  return {
    type: GET_FIND_ALL_BOM_DATA,
    payload: request
  };
};

export const actionDeleteOfBudget = data => {
  const request = ocraApiService('deleteOfBudget', data);
  return {
    type: DELETE_BUDGET,
    payload: request
  };
};
export const actionGetBudgetData = data => {
  const request = ocraApiService('getBudgetData', data);
  return {
    type: GET_BUDGET,
    payload: request
  };
};

export const actionSetBudgetApprovalData = data => {
  const request = ocraApiService('setBudgetApprovalData', data);
  return {
    type: SET_BUDGET_APPROVAL,
    payload: request
  };
};

export const actionSaveBudgetRevisionData = data => {
  const request = ocraApiService('saveBudgetRevisionData', data);
  return {
    type: SAVE_BUDGET_REVISION_DATA,
    payload: request
  };
};

export const actuionGetSuggessionFilterUserList = data => {
  const request = ocraApiService('getSuggessionUserData', data);
  return {
    type: GET_SUGGESSION_USER,
    payload: request
  };
};

export const actionProductLineDropDownData = data => {
  const request = ocraApiService('getProductLineDropDownData', data);
  return {
    type: GET_PRODUCTLINE_DROPDOWN_DATA,
    payload: request
  };
};

export const actionProductLineSegDropDownData = data => {
  const request = ocraApiService('getProductLineSegDropDownData', data);
  return {
    type: GET_PRODUCTLINE_SEG_DROPDOWN_DATA,
    payload: request
  };
};
export const actionModelFamilyDropDownData = data => {
  const request = ocraApiService('getModelFamilyDropDownData', data);
  return {
    type: GET_MODEL_FAMILY_DROPDOWN_DATA,
    payload: request
  };
};

export const actionProductSegmentDropDownData = data => {
  const request = ocraApiService('getProductSegmentDropDownData', data);
  return {
    type: GET_PRODUCT_SEGMENT_DROPDOWN_DATA,
    payload: request
  };
};

export const actionModelDropDownData = data => {
  const request = ocraApiService('getModelDropDownData', data);
  return {
    type: GET_MODEL_DROPDOWN_DATA,
    payload: request
  };
};

export const actionCreateBOM = data => {
  const request = ocraApiService('createBOM', data);
  return {
    type: CREATE_BOM,
    payload: request
  };
};

export const actionGetBOM = data => {
  const request = ocraApiService('getBOM', data);
  return {
    type: GET_BOM,
    payload: request
  };
};

export const actionGetBOMVersions = data => {
  const request = ocraApiService('getBOMLineItem', data);
  return {
    type: GET_BOM_LINE_ITEM,
    payload: request
  };
};

export const actionRevertLineItem = data => {
  const url = AppConfig.API_URL_JAVA + '/api/v1/user/bom/revertLineItem';
  const config = {
    headers: {
      'content-type': 'application/json'
    }
  };
  const request = post(url, data, config);
  return {
    type: REVERT_BOM_LINE_ITEM,
    payload: request
  };
};

export const actionSaveLineItems = data => {
  const url = AppConfig.API_URL_JAVA + '/api/v1/user/bom/saveLineItem';
  const config = {
    headers: {
      'content-type': 'application/json'
    }
  };
  const request = post(url, data, config);
  return {
    type: SAVE_BOM_LINE_ITEM,
    payload: request
  };
};

export const actionDeleteBOM = data => {
  const request = ocraApiService('deleteBOM', data);
  return {
    type: DELETE_BOM,
    payload: request
  };
};

export const actionCreateActiveNewRevision = data => {
  const request = ocraApiService('createActiveNewRevision', data);
  return {
    type: CREATE_ACTIVE_NEW_REVISION,
    payload: request
  };
};

export const actionGetFreeze = data => {
  const request = ocraApiService('getFreeze', data);
  return {
    type: GET_FREEZE,
    payload: request
  };
};

export const actionDeletePartImage = filePath => {
  const request = ocraApiService('deletePartImage', {
    filePath
  });
  return {
    type: DELETE_PART_IMAGE,
    payload: request
  };
};

export const actionGetSuggessionPartNumber = data => {
  const request = ocraApiService('getSuggessionFilterPartNumber', data);
  return {
    type: GET_SUGGESSION_PART_NUMBER,
    payload: request
  };
};

export const actionCreateApproverGroup = data => {
  const request = ocraApiService('createApproverGroup', data);
  return {
    type: CREATE_APPROVER_GROUP,
    payload: request
  };
};

export const actionGetApproverGroup = data => {
  const request = ocraApiService('getApproverGroup', data);
  return {
    type: GET_APPROVER_GROUP,
    payload: request
  };
};

export const actionDeleteApproverGroup = data => {
  const request = ocraApiService('deleteApproverGroup', data);
  return {
    type: DELETE_APPROVER_GROUP,
    payload: request
  };
};

export const actionGetBuyerCompanyInformation = data => {
  const request = ocraApiService('getRegisteredBuyerAddress', data);
  return {
    type: GET_BUYER_ADDRESS,
    payload: request
  };
};

export const actionSetProductLine = data => {
  const request = ocraApiService('addProductLine', data);
  return {
    type: GET_PRODUCT_LINE,
    payload: request
  };
};
export const actionSetModelFamily = data => {
  const request = ocraApiService('addModelFamily', data);
  return {
    type: GET_PRODUCT_LINE,
    payload: request
  };
};
export const actionSetModel = data => {
  const request = ocraApiService('addModel', data);
  return {
    type: GET_PRODUCT_LINE,
    payload: request
  };
};
export const actionGetSupplierCompanyInformation = data => {
  const request = ocraApiService('getRegisteredSupplierAddress', data);
  return {
    type: GET_SUPPLIER_ADDRESS,
    payload: request
  };
}

export const actionGetContractTemplate = data => {
  const request = ocraApiService('getContractTemplate', data);
  return {
    type: GET_CONTRACT_TEMPLATE,
    payload: request
  };
};

export const actionAddContractTemplate = data => {
  const request = ocraApiService('addContractTemplateByAdmin', data);
  return {
    type: ADD_CONTRACT_TEMPLATE,
    payload: request
  };
};

export const actionAddContractByBuyer = data => {
  const request = ocraApiService('addContractByBuyer', data);
  return {
    type: CREATE_CONTRACT,
    payload: request
  };
};


export const actionGetIndirectPurchaseBudgetData = data => {
  const request = ocraApiService('getIndirectPurchaseBudgetData', data);
  return {
    type: GET_BUDGET,
    payload: request
  };
};

export const actionGetBudgetForIndirectData = data => {
  const request = ocraApiService('getBudgetForIndirectData', data);
  return {
    type: GET_BUDGET,
    payload: request
  };
};

export const actionIndirectPurchaseApprovalData = data => {
  const request = ocraApiService('getIndirectPurchaseApproval', data);
  return {
    type: GET_LIST_OF_INDIRECT_PURCHASE,
    payload: request
  };
};
export const actionGetRFQPOSupplier = data => {
  const request = ocraApiService('getRFQPOSupplier', data);
  return {
    type: RFQPO_SUPPLIER,
    payload: request
  };
};

export const actionGetRFQPOSupplierList = data => {
  const request = ocraApiService('getRFQPOSupplierList', data);
  return {
    type: RFQPO_SUPPLIER_LIST,
    payload: request
  };
};

export const actionGetOnlinePurchaseContract = data => {
  const request = ocraApiService('getOnlinePurchaseContract', data);
  return {
    type: GET_ONLINE_PURCHASE_CONTRACT,
    payload: request
  };
};
export const actionSetIndirectPurchaseApprovalData = data => {
  const request = ocraApiService('setIndirectPurchaseApproval', data);
  return {
    type: GET_LIST_OF_INDIRECT_PURCHASE,
    payload: request
  };
};

export const actionAddCommentContract = data => {
  const request = ocraApiService('addCommentOfContract', data);
  return {
    type: ADD_COMMENT_CONTRACT,
    payload: request
  };
};

export const actionGetContractApproval = data => {
  const request = ocraApiService('getContractApproval', data);
  return {
    type: GET_CONTRACT_APPROVAL,
    payload: request
  };
};

export const actionGetAllCreatedContracts = data => {
  const request = ocraApiService('getAllCreatedContracts', data);
  return {
    type: GET_CREATED_CONTRACT,
    payload: request
  };
};

export const actionGetOrgSupplier = data => {
  const request = ocraApiService('getOrgSupplier', data);
  return {
    type: GET_ORG_SUPPLIER,
    payload: request
  };
};

export const actionGetPurchaseQuotationBuyerRelease = data => {
  const request = ocraApiService('getPurchaseQuotationBuyerRelease', data);
  return {
    type: GET_PURCHASE_QUOATION_BUYER_RELEASE,
    payload: request
  };
};

export const actioncreateAgreement = data => {
  const request = ocraApiService('createAgreement', data);
  return {
    type: CREATE_AGREEMENT,
    payload: request
  };
};
export const actionSubmitDirectPurchase = data => {
  const request = ocraApiService('setDirectPurchaseApprover', data);
  return {
    type: DIRECT_PURCHASE,
    payload: request
  };
};
export const actionGetDirectPurchaseApprover = data => {
  const request = ocraApiService('getDirectPurchaseApprover', data);
  return {
    type: DIRECT_PURCHASE,
    payload: request
  };
};
export const actionIndirectPurchaseQuotationApproval = data => {
  const request = ocraApiService('getIndirectPurchaseQuotationApproval', data);
  return {
    type: GET_PURCHASE_AGREEMENT_FOR_ORDER,
    payload: request
  };
};

export const actionGetPurchaseAgreementForOrder = data => {
  const request = ocraApiService('getPurchaseAgreementForOrder', data);
  return {
    type: GET_PURCHASE_AGREEMENT_FOR_ORDER,
    payload: request
  };
};

export const actionCreatePurchaseOrder = data => {
  const request = ocraApiService('createPurchaseOrder', data);
  return {
    type: CREATE_PURCHASE_ORDER,
    payload: request
  };
};

export const actionGetPurchaseOrder = data => {
  const request = ocraApiService('getPurchaseOrders', data);
  return {
    type: CREATE_PURCHASE_ORDER,
    payload: request
  };
};
export const actionSearchPurchaseOrder = data => {
  const request = ocraApiService('searchPurchaseOrder', data);
  return {
    type: SEARCH_PURCHASE_ORDER,
    payload: request
  };
};
export const actionGetSummaryQuotationforIND = data => {
  const request = ocraApiService('getSummaryQuotationforIND', data);
  return {
    type: GET_LIST_OF_INDIRECT_PURCHASE,
    payload: request
  };
};
export const actionCreateStandarPurchase = data => {
  const request = ocraApiService('createStandarPurchase', data);
  return {
    type: STANDAR_PURCHASE,
    payload: request
  };
};
export const actionGetStandarPurchase = data => {
  const request = ocraApiService('getStandarPurchase', data);
  return {
    type: STANDAR_PURCHASE,
    payload: request
  };
};
export const actionGetPurchaseAgreementForApprovalProcess = data => {
  const request = ocraApiService('getPurchaseAgreementForApprovalProcess', data);
  return {
    type: GET_AGREEMENT_FOR_APPROVAL_PROCESS,
    payload: request
  };
};

export const actionSetPurchaseAgreementApprovalData = data => {
  const request = ocraApiService('setPurchaseAgreementApprovalData', data);
  return {
    type: SET_AGREEMENT_FOR_APPROVAL,
    payload: request
  };
};
export const actionINPQuotationReviewData = data => {
  const request = ocraApiService('setINPQuotationReview', data);
  return {
    type: GET_LIST_OF_INDIRECT_PURCHASE,
    payload: request
  };
};
export const actionGetINPQuotationApprovalData = data => {
  const request = ocraApiService('getINPQuotationApproval', data);
  return {
    type: GET_LIST_OF_INDIRECT_PURCHASE,
    payload: request
  };
};
export const actionSetINPQuotationApprovalData = data => {
  const request = ocraApiService('setINPQuotationApproval', data);
  return {
    type: GET_LIST_OF_INDIRECT_PURCHASE,
    payload: request
  };
};

export const actionGetBlanketOrderForPoApproval = data => {
  const request = ocraApiService('getBlanketOrderForPoApproval', data);
  return {
    type: GET_BLANKET_ORDER_FOR_APPROVAL,
    payload: request
  };
};

export const actionGetAccountForSpotBuy = data => {
  const request = ocraApiService('getAccountForSpotBuy', data);
  return {
    type: SPOT_BUY,
    payload: request
  };
};
export const actionGetContactPerson = data => {
  const request = ocraApiService('getSuggessionUserData', data);
  return {
    type: SPOT_BUY,
    payload: request
  };
};
export const actionUploadSignature = data => {
  const request = ocraApiService('uploadSignature', data);
  return {
    type: UPLOAD_SIGNATURE,
    payload: request
  };
};

export const actionSetSpotBuy = data => {
  const request = ocraApiService('setSpotBuy', data);
  return {
    type: SPOT_BUY,
    payload: request
  };
};
export const actionGetIndForSpotBuy = data => {
  const request = ocraApiService('getIndForSpotBuy', data);
  return {
    type: SPOT_BUY,
    payload: request
  };
};

export const actionGetSpotBuyApproval = data => {
  const request = ocraApiService('getSpotBuyApproval', data);
  return {
    type: SPOT_BUY,
    payload: request
  };
};

export const actionGetSpotBuy = data => {
  const request = ocraApiService('getSpotBuy', data);
  return {
    type: SPOT_BUY,
    payload: request
  };
};

export const actionDeleteForSpotBuy = data => {
  const request = ocraApiService('deleteForSpotBuy', data);
  return {
    type: SPOT_BUY,
    payload: request
  };
};
export const actionGetSpotBuyById = data => {
  const request = ocraApiService('getSpotBuyById', data);
  return {
    type: SPOT_BUY,
    payload: request
  };
};

export const actionGetSpotBuyForSupplierById = data => {
  const request = ocraApiService('getSpotBuyForSupplierById', data);
  return {
    type: SPOT_BUY,
    payload: request
  };
};

export const actionGetPurchaseAgreementData = data => {
  const request = ocraApiService('purchaseAgreementData', data);
  return {
    type: PURCHASE_AGREEMNET_DATA,
    payload: request
  };
}
export const actionGetPurchaseRequisitionData = data => {
  const request = ocraApiService('getPurchaseRequisitionData', data);
  return {
    type: PURCHASE_REQUISITION_DATA,
    payload: request
  };
};

export const actionSetSpotBuyApproval = data => {
  const request = ocraApiService('setSpotBuyApproval', data);
  return {
    type: SET_SPOT_BUY_APPROVAL,
    payload: request
  };
};

export const actionSetBlanketPOApproval = data => {
  const request = ocraApiService('setBlanketPOApproval', data);
  return {
    type: SET_BLANKET_PO_APPROVAL,
    payload: request
  };
};

export const actionSetBlanketPOReleaseApproval = data => {
  const request = ocraApiService('setBlanketPOReleaseApproval', data);
  return {
    type: SET_BLANKET_PO_RELEASE_APPROVAL,
    payload: request
  };
};

export const actionSetStandardPOApproval = data => {
  const request = ocraApiService('setStandardPOApproval', data);
  return {
    type: SET_STANDARD_PO_APPROVAL,
    payload: request
  };
};
export const actionGetDirectPOApproverData = data => {
  const request = ocraApiService('getDirectPOApproverData', data);
  return {
    type: DIRECT_PO_APPROVAL,
    payload: request
  };
};

export const actionCheckDuplicateUserProfile = data => {
  const request = ocraApiService('checkDuplicateUserProfile', data);
  return {
    type: CHECK_DUPLIACTE_USER_PROFILE,
    payload: request
  };
};
export const actionCheckApprovalSkip = data => {
  const request = ocraApiService('checkApprovalSkip', data);
  return {
    type: CHECK_APPROVAL_SKIP,
    payload: request
  };
};

export const actionDeleteDirectPurchase = data => {
  const request = ocraApiService('deleteDirectPurchase', data);
  return {
    type: DELETE_DIRECT_PURCHASE,
    payload: request
  };
};

export const actionCreateCommodity = data => {
  const request = ocraApiService('createCommodity', data);
  return {
    type: CRETAE_COMMODITY,
    payload: request
  };
};

export const actionGetCommodity = data => {
  const request = ocraApiService('getCommodity', data);
  return {
    type: GET_COMMODITY,
    payload: request
  };
};

export const actionDeleteCommodity = data => {
  const request = ocraApiService('deleteCommodity', data);
  return {
    type: DELETE_COMMODITY,
    payload: request
  };
};


export const actionUploadAdminSetup = data => {
  //?userId=:userId&roleId=:roleId
  const url = AppConfig.API_URL_JAVA + '/api/v1/user/sheet/upload';
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  const request = post(url, data, config);
  return {
    type: ADMIN_SETUP_TEMPLATE,
    payload: request
  };
};

export const actionUploadSecondAdminSetup = data => {
  const url = AppConfig.API_URL_JAVA + '/api/v1/user/sheet/user/budget/upload';
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  const request = post(url, data, config);
  return {
    type: ADMIN_SETUP_TEMPLATE,
    payload: request
  };
};

export const actionUploadDocument = data => {
  const url = AppConfig.API_URL_JAVA + '/api/v1/file/data/save';
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  const request = post(url, data, config);
  return {
    type: UPLOAD_DOCUMENT,
    payload: request
  };
};

export const actionDeleteLocation = data => {
  const request = ocraApiService('deleteLocation', data);
  return {
    type: LOCATION_DELETE,
    payload: request
  };
};

export const actionGetSupplierOrganization = data => {
  const request = ocraApiService('getSupplierOrganization', data);
  return {
    type: LOCATION_DELETE,
    payload: request
  };
};

export const actionSetSupplierCode = data => {
  const request = ocraApiService('setSupplierCode', data);
  return {
    type: SUPPLIER_CODE,
    payload: request
  };
};

export const actionDeleteUserRole = data => {
  const request = ocraApiService('deleteUserRole', data);
  return {
    type: DELETE_USER_ROLE,
    payload: request
  };
};

export const actionCreateRM = data => {
  const request = ocraApiService('createMasterRawMaterial', data);
  return {
    type: CREATE_RAW_MATERIAL,
    payload: request
  };
};

export const actionUpdateRM = data => {
  const request = ocraApiService('updateRawMaterial', data);
  return {
    type: UPDATE_RAW_MATERIAL,
    payload: request
  };
};


export const actionGetRM = data => {
  const request = ocraApiService('getRawMaterial', data);
  return {
    type: GET_RAW_MATERIAL,
    payload: request
  };
};
export const actionGetRMByKeyword = data => {
  const request = ocraApiService('getRMByKeyword', data);
  return {
    type: GET_RAW_MATERIAL,
    payload: request
  };
};

export const actionDeleteRM = data => {
  const request = ocraApiService('deleteRawMaterial', data);
  return {
    type: DELETE_RAW_MATERIAL,
    payload: request
  };
};

export const actionDeleteRawMaterialRecord = data => {
  const request = ocraApiService('deleteRMRecord', data);
  return {
    type: DELETE_RAW_MATERIAL,
    payload: request
  };
};


export const actionDeletePreferredSource = data => {
  const request = ocraApiService('deletePreferredSource', data);
  return {
    type: DELETE_RAW_MATERIAL,
    payload: request
  };
};

export const actionSearchSupplierByKeyword = data => {
  const request = ocraApiService('searchSupplierByKeyword', data);
  return {
    type: GET_RAW_MATERIAL,
    payload: request
  };
};
export const actionResetEmailMobileVerification = data => {
  const request = ocraApiService('resetEmailMobileVerification', data);
  return {
    type: RESET_VERIFICATION_LINK,
    payload: request
  };
};
export const actionCreateAggrementTemplate = data => {
  const request = ocraApiService('createAggrementTemplate', data);
  return {
    type: GET_RAW_MATERIAL,
    payload: request
  };
};
export const actionGetAggrementTemplate = data => {
  const request = ocraApiService('rmAggrementTemplate', data);
  return {
    type: GET_RAW_MATERIAL,
    payload: request
  };
};

export const actionGetBuyerContactPerson = data => {
  const request = ocraApiService('getBuyerContactPerson', data);
  return {
    type: BUYER_CONTACT_PERSON,
    payload: request
  };
};

export const actionGetRMTemplate = data => {
  const request = ocraApiService('getRMTemplate', data);
  return {
    type: GET_RAW_MATERIAL,
    payload: request
  };
};

export const actionGetHistoricallyData = data => {
  const request = ocraApiService('getHistoricallyData', data);
  return {
    type: HISTORICALLY_DATA,
    payload: request
  };
};

export const actionPublishRM = data => {
  const request = ocraApiService('publishRM', data);
  return {
    type: CREATE_RAW_MATERIAL,
    payload: request
  };
};

export const actionCheckRMDelta = data => {
  const request = ocraApiService('checkRMDelta', data);
  return {
    type: CREATE_RAW_MATERIAL,
    payload: request
  };
};

export const actionCheckRMQuotationApproval = data => {
  const request = ocraApiService('checkRMQuotationApproval', data);
  return {
    type: CREATE_RAW_MATERIAL,
    payload: request
  };
};

export const actionGetPreferredHistoricData = data => {
  const request = ocraApiService('getPreferredHistoricData', data);
  return {
    type: HISTORICALLY_DATA,
    payload: request
  };
};

export const actionSetRMApproval = data => {
  const request = ocraApiService('setRMApproval', data);
  return {
    type: GET_RAW_MATERIAL,
    payload: request
  };
};

export const actionGetRMApproval = data => {
  const request = ocraApiService('getRMApproval', data);
  return {
    type: GET_RAW_MATERIAL,
    payload: request
  };
};

export const actionRawMaterialApprovalProcessExist = data => {
  const request = ocraApiService('rawMaterialApprovalProcessExist', data);
  return {
    type: GET_RAW_MATERIAL,
    payload: request
  };
};

export const actionRawMaterialApproval = data => {
  const request = ocraApiService('rawMaterialApproval', data);
  return {
    type: GET_RAW_MATERIAL,
    payload: request
  };
};

export const actionRawMaterialDDList = data => {
  const request = ocraApiService('getRawMaterialDDList', data);
  return {
    type: GET_RAW_MATERIAL_DD_LIST,
    payload: request
  };
};

export const actionCreateRawMaterial = data => {
  const request = ocraApiService('createRawMaterial', data);
  return {
    type: CREATE_RAWMATERIAL,
    payload: request
  };
};
export const actionGetRawMaterialById = data => {
  const request = ocraApiService('getRawMaterialById', data);
  return {
    type: GET_RAW_MATERIAL_BY_ID,
    payload: request
  };
};

export const actionUpdateRMData = data => {
  const request = ocraApiService('updateRawMaterialData', data);
  return {
    type: UPDATE_RAW_MATERIAL_DATA,
    payload: request
  };
};

export const actionGetRMRateChangeAgreement = data => {
  const request = ocraApiService('getRMRateChangeAgreement', data);
  return {
    type: GET_RM_RATE_CHANGE_AGREEMENT,
    payload: request
  };
};

export const actionGetRMAgreementData = data => {
  const request = ocraApiService('getRMAgreementData', data);
  return {
    type: GET_RM_AGREEMENT_DATA,
    payload: request
  };
};

export const actionRMAgreementApproval = data => {
  const request = ocraApiService('RMAgreementApproval', data);
  return {
    type: RM_AGREEMENT_APPROVAL,
    payload: request
  };
};

export const actionGetBlanketRenewal = data => {
  const request = ocraApiService('getBlanketRenewal', data);
  return {
    type: GET_BLANKET_RENEWAL,
    payload: request
  };
};

export const actionGetReevaluateRFQ = data => {
  const request = ocraApiService('getReevaluateRFQ', data);
  return {
    type: GET_REEVALUETERFQ,
    payload: request
  };
};

export const actionGetRFQPartDetail = data => {
  data['selected'] = false;
  const request = ocraApiService('getRFQPartDetail', data);
  return {
    type: GET_PART_BY_RFQ_ID,
    payload: request
  };
};

export const actionSubmitBlanketRenewal = data => {
  const request = ocraApiService('submitBlanketRenewal', data);
  return {
    type: CREATE_BLANKET_RENEWAL,
    payload: request
  };
};
export const actionGetCommodityForBOM = data => {
  const request = ocraApiService('GetSuggestionCommodityList', data);
  return {
    type: GET_SUGGESTION_COMMODITY,
    payload: request
  };
};
// CREATE_BLANKET_RENEWAL,
// GET_BLANKET_RENEWAL,
// GET_REEVALUETERFQ,
// UPDATE_REEVALUETERFQ,

export const actionCreateProgram = data => {
  const request = ocraApiService('createProgram', data);
  return {
    type: CREATE_PROGRAM,
    payload: request
  };
};

export const actionGetProgram = data => {
  const request = ocraApiService('getProgram', data);
  return {
    type: GET_PROGRAM,
    payload: request
  };
};

export const actionDeleteProgram = data => {
  const request = ocraApiService('deleteProgram', data);
  return {
    type: DELETE_PROGRAM,
    payload: request
  };
};

export const actionGetPartAndAssignBuyerList = data => {
  const request = ocraApiService('getPartAndAssignBuyerList', data);
  return {
    type: GET_PART_AND_BUYERS,
    payload: request
  };
};

export const actionGetBomCodeList = data => {
  const request = ocraApiService('getBomCodeList', data);
  return {
    type: GET_BOM_CODE_LIST,
    payload: request
  };
};

export const actionGetMappingColumnFields = data => {
  const request = ocraApiService('getMappingColumnFields', data);
  return {
    type: GET_MAPPING_COLUMNS,
    payload: request
  };
};

export const actionGetBuyerColumnMappings = data => {
  const request = ocraApiService('getBuyerColumnMappings', data);
  return {
    type: GET_BUYER_COLUMN_MAPPINGS,
    payload: request
  };
};

export const actionSaveBuyerColumnMappings = data => {
  const request = ocraApiService('saveBuyerColumnMappings', data);
  return {
    type: SAVE_BUYER_COLUMN_MAPPINGS,
    payload: request
  };
};


export const actionDropDownIndex = data => {
  const request = ocraApiService('getDropDownIndex', data);
  return {
    type: GET_BOM_CODE_LIST,
    payload: request
  };
};


export const actionCreatePartsBOM = data => {
  const request = ocraApiService('createPartsBOM', data);
  return {
    type: CREATE_PART_BOM,
    payload: request
  };
};

export const actionGetComponentTypeList = data => {
  const request = ocraApiService('getComponentTypeList', data);
  return {
    type: GET_COMPONENTTYPE_LIST,
    payload: request
  };
};

export const actionGetQualitySignificanceList = data => {
  const request = ocraApiService('qualitySignificanceList', data);
  return {
    type: GET_QUALITY_SIGNIFICANCE_LIST,
    payload: request
  };
};

export const actionPartSearchForBOM = data => {
  const request = ocraApiService('partSearchForBOM', data);
  return {
    type: PART_SEARCH_FOR_BOM,
    payload: request
  };
};

export const actionGetVendorDocument = data => {
  const request = ocraApiService('getVendorDocument', data);
  return {
    type: VENDOR_DOC,
    payload: request
  };
};

export const actionGetVendorFacility = data => {
  const request = ocraApiService('getVendorFacility', data);
  return {
    type: VENDOR_DOC,
    payload: request
  };
};
export const actionGetItemCodeList = data => {
  const request = ocraApiService('getItemCodeList', data);
  return {
    type: SEARCH_FOR_ITEM_CODE,
    payload: request
  };
};
export const actionGetPartListForCreateRFP = data => {
  const request = ocraApiService('getPartList', data);
  return {
    type: SEARCH_FOR_PART_LIST,
    payload: request
  };
};

export const getCurrentRFQForCreateRFP = data => {
  const request = ocraApiService('getCurrentRFQByPartId', data);
  return {
    type: GET_CURRENT_RFQ_BY_PART_ID,
    payload: request
  };
};

export const actionGetWareHouseDropdownData = data => {
  const request = ocraApiService('getWareHouseDropdownData', data);
  return {
    type: GET_WAREHOUSE_DD,
    payload: request
  };
};

export const actionGetWareHouseList = data => {
  const request = ocraApiService('getWareHouseList', data);
  return {
    type: GET_WAREHOUSE_LIST,
    payload: request
  };
};

export const actionGetAllPartsInWareHouse = data => {
  const request = ocraApiService('getAllPartsInWarehouse', data);
  return {
    type: GET_ALL_PARTS_IN_WAREHOUSE,
    payload: request
  };
};

export const actionSaveWarehouseData = data => {
  const request = ocraApiService('saveWarehouseData', data);
  return {
    type: SAVE_WAREHOUSE_DATA,
    payload: request
  };
};

export const actionDeleteWarehouseData = data => {
  const request = ocraApiService('deleteWarehouseData', data);
  return {
    type: DELETE_WAREHOUSE_DATA,
    payload: request
  };
};
export const actionGetWarehouseListWithResion = data => {
  const request = ocraApiService('getWarehouseListWithResion', data);
  return {
    type: WAREHOUSE_DATA_WITH_REGION,
    payload: request
  };
};


export const actionGetWarehouseLocation = data => {
  const request = ocraApiService('getWarehouseLocation', data);
  return {
    type: GET_WAREHOUSE_LOCATION,
    payload: request
  };
};
export const actionSaveWarehouseLocation = data => {
  const request = ocraApiService('saveWarehouseLocation', data);
  return {
    type: SAVE_WAREHOUSE_LOCATION,
    payload: request
  };
};

export const actionCreateAmendPO = data => {
  const request = ocraApiService('createAmendPO', data);
  return {
    type: CREATE_AMENDPO,
    payload: request
  };
};

export const actionGetAmendPO = data => {
  const request = ocraApiService('getAmendPO', data);
  return {
    type: GET_AMENDPO,
    payload: request
  };
};

export const actionSetApprovalForPO = data => {
  const request = ocraApiService('setDirectPurchaseApproverForPO', data);
  return {
    type: DIRECT_PURCHASE,
    payload: request
  };
};
export const actionDuplicatePOSetApprover = data => {
  const request = ocraApiService('duplicatePOSetApprover', data);
  return {
    type: DIRECT_PURCHASE,
    payload: request
  };
};
export const actionDeletePOSetApprover = data => {
  const request = ocraApiService('deletePOSetApprover', data);
  return {
    type: DELETE_DIRECT_PURCHASE,
    payload: request
  };
};
export const actionGetAllFilteredInventory = data => {
  const request = ocraApiService('getAllFilteredInventory', data);
  return {
    type: INVENTORY_FILTER_DATA,
    payload: request
  };
};
export const actionCreateInventory = data => {
  const request = ocraApiService('createInventory', data);
  return {
    type: CREATE_INVENTORY,
    payload: request
  };
};

export const actionDevelopmentPart = data => {
  const request = ocraApiService('getDevelopmentPart', data);
  return {
    type: GET_BUILD_PLAN_DATA,
    payload: request
  };
};

export const actionGetBuildPhase = data => {
  const request = ocraApiService('getBuildPhase', data);
  return {
    type: GET_BUILD_PLAN_DATA,
    payload: request
  };
};

export const actionGetBOMHistoryData = data => {
  const url = AppConfig.API_URL_JAVA + "/api/v1/user/bom/bomHistory";
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };
  const request = post(url, data, config);
  return {
    type: HISTORY_BOM_DATA,
    payload: request
  };
};

export const actionGetBOMCostData = data => {
  const url = AppConfig.API_URL_JAVA + "/api/v1/cost/bom";
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };
  const request = post(url, data, config);
  return {
    type: COST_BOM_DATA,
    payload: request
  };
};

export const actionCurrencyExchange = data => {
  const request = ocraApiService('currencyExchange', data);
  return {
    type: CURRENCY_EXCHANGE,
    payload: request
  };
};

export const actionGetAssignedRequest = data => {
  const request = ocraApiService('getAssignedRequest', data);
  return {
    type: GET_ASSIGNED_REQUEST,
    payload: request
  };
};

export const actionGetTeamMembers = data => {
  const request = ocraApiService('getTeamMembers', data);
  return {
    type: GET_TASK_ACTION,
    payload: request
  };
};


export const actionSendDeleteAndArchive = data => {
  const request = ocraApiService('sendDeleteAndArchive', data);
  return {
    type: SEND_DELETE_ARCHIVE_IDS,
    payload: request
  };
};


export const actionGetNavigationItem = data => {
  const request = ocraApiService('getNavigationItem', data);
  return {
    type: GET_NAVIGATION_ITEM,
    payload: request
  };
};

export const actionSaveNavItems = data => {
  return {
    type: "GET_SAVE_NAVIGATION_ITEM",
    payload: data
  };
};


export const actionAddNavigationBookmark = data => {
  const request = ocraApiService('addNavigationBookmark', data);
  return {
    type: ADD_NAVIGATION_BOOKMARK,
    payload: request
  };
};

export const actionDeleteNavigationBookmark = data => {
  const request = ocraApiService('deleteBookmarks', data);
  return {
    type: DELETE_NAVIGATION_BOOKMARK,
    payload: request
  };
};

export const actionGetnavigationId = data => {
  return {
    type: SET_BOOKMARK_ID,
    payload: data
  };
};


export const actionEnableBOM = data => {
  const request = ocraApiService('enableBomOption', data);
  return {
    type: ENABLE_BOM_OPTION,
    payload: request
  };
};

export const actionGetEnableBOM = data => {
  const request = ocraApiService('getEnableBomOption', data);
  return {
    type: GET_ENABLE_BOM_OPTION,
    payload: request
  };
};

export const actionGetnavigationTabId = data => {
  return {
    type: SET_TAB_KEY,
    payload: data
  };
};

export const actionGetPartCirculationList = data => {
  const request = ocraApiService('getPartCirculationList', data);
  return {
    type: PART_CIRCULATION_LIST,
    payload: request
  };
};

export const actionMenuToggle = data => {
  return {
    type: MENU_TOGGLE,
    payload: data
  };
};


export const actionCreateAmendPORelease = data => {
  const request = ocraApiService('createAmendPORelease', data);
  return {
    type: CREATE_AMENDPO,
    payload: request
  };
};

export const actionGetAmendPORelease = data => {
  const request = ocraApiService('getAmendPORelease', data);
  return {
    type: GET_AMENDPO,
    payload: request
  };
};
export const actionSupplierGetRegApproval = data => {
  const request = ocraApiService("supplierGetRegApproval", data);
  return {
    type: GET_REG_APPROVAL,
    payload: request
  };
};

export const actionSupplierGetRegApprovalSuccess = data => {
  return {
    type: GET_REG_APPROVAL_SUCCESS,
    payload: data
  };
};
export const actionSupplierSaveRegApproval = data => {
  const request = ocraApiService("supplierSaveRegApproval", data);
  return {
    type: SAVE_REG_APPROVAL,
    payload: request
  };
};

export const actionSupplierSaveRegApprovalSuccess = data => {
  return {
    type: SAVE_REG_APPROVAL_SUCCESS,
    payload: data
  };
};
export const actionDeleteRegApprovals = data => {
  const request = ocraApiService("deleteRegApprovals", data);
  return {
    type: DELETE_REG_APPROVAL,
    payload: request
  };
};

export const actionBlankNavigation = () => {
  const request = {};
  return {
    type: BLANK_NAVIGATION_ITEM,
    payload: request
  };
};

export const actionGetProjectPart = data => {
  const request = ocraApiService('getProjectPart', data);
  return {
    type: GET_PROJECT_PART,
    payload: request
  };
};

export const actionGetPartAndBomListForCreateRFP = data => {
  const request = ocraApiService('getPartAndBOMList', data);
  return {
    type: SEARCH_FOR_PART_AND_BOM_LIST,
    payload: request
  };
};

export const actionGetPartDetailsForRFP = data => {
  const request = ocraApiService('getPartDetailsForRFP', data);
  return {
    type: GET_PART_DEATIL_FOR_RFP,
    payload: request
  };
};
export const actionGetAddressesForRFP = data => {
  const request = ocraApiService('getAddressesForRFP', data);
  return {
    type: GET_ADDRESS_FOR_RFP,
    payload: request
  };
};

export const actionGetEvaluationTemplate = data => {
  const request = ocraApiService('getEvaluationTemplate', data);
  return {
    type: GET_EVALUATION_TEMPLATE,
    payload: request
  };
};
export const actionEvaluationTemplateCreate = data => {
  const request = ocraApiService('evaluationTemplateCreate', data);
  return {
    type: EVALUATION_TEMPLATE_CREATE,
    payload: request
  };
};

export const actionGetLookUp = data => {
  const request = ocraApiService('getLookUpList', data);
  return {
    type: GET_LOOKUP_LIST,
    payload: request
  };
};

export const actionGetERPConnectionStatus = data => {
  const request = ocraApiService('checkERPConnection', data);
  return {
    type: GET_ERP_CONNECTION_STATUS,
    payload: request
  };
};

export const actionGetSeriesGroupMap = data => {
  const request = ocraApiService('getSeriesGroupMap', data);
  return {
    type: GET_SERIES_GROUP_MAP,
    payload: request
  };
};


export const actionGetERPCodesForType = data => {
  const request = ocraApiService('getERPCodesForType', data);
  return {
    type: GET_GROUP_CODE_LIST,
    payload: request
  };
};


export const actionGetTemplateDataForEdit = data => {
  const request = ocraApiService('getTemplateDataForEdit', data);
  return {
    type: GET_TEMPLATE_DATA,
    payload: request
  };
};

export const actionApprovalEvaluationTemplate = data => {
  const request = ocraApiService('approvalEvaluationTemplate', data);
  return {
    type: APPROVE_SENDBACK_TEMPLATE,
    payload: request
  };
};

export const actionGetEvaluationList = data => {
  const request = ocraApiService('getEvaluationList', data);
  return {
    type: GET_EVALUATION_LIST,
    payload: request
  };
};

export const actionGetSuppliersList = data => {
  const request = ocraApiService("getSuppliersList", data);
  return {
    type: GET_SUPPLIER_LIST,
    payload: request
  };
};

export const actionGetSuppliersDetailList = data => {
  const request = ocraApiService("getSupplierDetailList", data);
  return {
    type: GET_DETAIL_SUPPLIER_LIST,
    payload: request
  };
};

export const actionEvaluationListUpdate = data => {
  const request = ocraApiService("evaluationListUpdate", data);
  return {
    type: EVALUATION_LIST_UPDATE,
    payload: request
  };
};

export const actionEnableQuotationSettings = data => {
  const request = ocraApiService('enableQuotationSettings', data);
  return {
    type: ENABLE_BOM_OPTION,
    payload: request
  };
};

export const actionGetEnableQuotationSettings = data => {
  const request = ocraApiService('getEnableQuotationSettings', data);
  return {
    type: GET_ENABLE_BOM_OPTION,
    payload: request
  };
};

export const actionDeleteEvaluationTemplate = data => {
  const request = ocraApiService('deleteEvaluationTemplate', data);
  return {
    type: DELETE_EVALUATION_TEMPLATE,
    payload: request
  };
};
export const actionDeleteEvaluationList = data => {
  const request = ocraApiService('deleteEvaluationList', data);
  return {
    type: DELETE_EVALUATION_LIST,
    payload: request
  };
};
export const actionEvaluationTemplateUpdate = data => {
  const request = ocraApiService("evaluationTemplateUpdate", data);
  return {
    type: EVALUATION_TEMPLATE_UPDATE,
    payload: request
  };
};

export const actionGetEvaluationDataById = data => {
  const request = ocraApiService("getEvaluationDataById", data);
  return {
    type: GET_EVALUATION_DATA_BYID,
    payload: request
  };
};
export const actionInspectionUpdate = data => {
  const request = ocraApiService("inspectionUpdate", data);
  return {
    type: INSPECTION_UPDATE,
    payload: request
  };
};
export const actioninspectionDelete = data => {
  const request = ocraApiService('inspectionDelete', data);
  return {
    type: INSPECTION_DELETE,
    payload: request
  };
};

export const actionGetERPFreeStock = data => {
  const request = ocraApiService('getERPFreeStock', data);
  return {
    type: GET_ERP_FREE_STOCK_LIST,
    payload: request
  };
}

export const actionProcessBomParts = data => {
  const request = ocraApiService('processBomParts', data);
  return {
    type: PROCESS_BOM_PARTS,
    payload: request
  };
}

export const actionGetAssignedRequestRfp = data => {
  const request = ocraApiService('getAssignedRequestRfp', data);
  return {
    type: GET_ASSIGNED_REQUEST,
    payload: request
  };
};
export const actionGetAssignedRequestCostEst = data => {
  const request = ocraApiService('getAssignedRequestCostEst', data);
  return {
    type: GET_ASSIGNED_REQUEST,
    payload: request
  };
};
export const actionGetAssignedRequestSourcing = data => {
  const request = ocraApiService('getAssignedRequestSourcing', data);
  return {
    type: GET_ASSIGNED_REQUEST,
    payload: request
  };
};
export const actionGetAssignedRequestStandardPo = data => {
  const request = ocraApiService('getAssignedRequestStandardPo', data);
  return {
    type: GET_ASSIGNED_REQUEST,
    payload: request
  };
};
export const actionGetAssignedRequestBlanketPo = data => {
  const request = ocraApiService('getAssignedRequestBlanketPo', data);
  return {
    type: GET_ASSIGNED_REQUEST,
    payload: request
  };
};
export const actionGetAssignedRequestSpotPo = data => {
  const request = ocraApiService('getAssignedRequestSpotPo', data);
  return {
    type: GET_ASSIGNED_REQUEST,
    payload: request
  };
};
export const actionGetAssignedRequestCirculationReq = data => {
  const request = ocraApiService('getAssignedRequestCirculationReq', data);
  return {
    type: GET_ASSIGNED_REQUEST,
    payload: request
  };
};
export const actionGetAssignedRequestProgramSourcing = data => {
  const request = ocraApiService('getAssignedRequestProgramSourcing', data);
  return {
    type: GET_ASSIGNED_REQUEST,
    payload: request
  };
};
export const actionGetAssignedRequestIndirectPurchase = data => {
  const request = ocraApiService('getAssignedRequestIndirectPurchase', data);
  return {
    type: GET_ASSIGNED_REQUEST,
    payload: request
  };
};
export const actionGetAssignedRequestBudget = data => {
  const request = ocraApiService('getAssignedRequestBudget', data);
  return {
    type: GET_ASSIGNED_REQUEST,
    payload: request
  };
};
export const actionGetAssignedRequestRawMaterial = data => {
  const request = ocraApiService('getAssignedRequestRawMaterial', data);
  return {
    type: GET_ASSIGNED_REQUEST,
    payload: request
  };
};
export const actionInsertLegacyData = data => {
  const request = ocraApiService("insertLegacyData", data);
  return {
    type: INSERT_LEGACY_DATA,
    payload: request
  };
};
export const actionDeleteLegacyData = data => {
  const request = ocraApiService("deleteLegacyData", data);
  return {
    type: DELETE_LEGACY_DATA,
    payload: request
  };
};
export const actionSearchByBudgetItem = data => {
  const request = ocraApiService("searchByBudgetItem", data);
  return {
    type: DELETE_LEGACY_DATA,
    payload: request
  };
};
export const actionBulkPOStatus = data => {
  const request = ocraApiService("bulkPOStatus", data);
  return {
    type: BULK_PO_APPROVE,
    payload: request
  };
};
export const actionTargetDateUpdate = data => {
  const request = ocraApiService("targetDateUpdate", data);
  return {
    type: TARGET_DATE,
    payload: request
  };
};
export const actionGetAllUserProfile = data => {
  const request = ocraApiService("getAllUserProfile", data);
  return {
    type: ALL_USER_PROFILE,
    payload: request
  };
};

export const actionUserSessionlogout = data => {
  const request = ocraApiService("userSessionLogout", data);
  return {
    type: USER_SESSION_LOGOUT,
    payload: request
  };
};

