import { combineReducers } from "redux";

// Common Reducers
import Common from "./reducerCommon";
import User from "../../../authorization/authorizationReducer";
import supplierUsers from "../../../users/userReducer";
import BuyerData from "../../../../serviceprovider/actionReducer/buyerReducer";
import dashboard from "../../../../serviceprovider/dashboard/dashboardReducer";
import home from "../../../../serviceprovider/home/homeReducer";
const appReducer = combineReducers({
  state: (state = {}) => state,
  User,
  supplierUsers,
  Common,
  BuyerData,
  dashboard,
  home,
});

const rootReducer = (state, action) => {
  if (action, action.type === "USER_LOGOUT") {
    state.User = undefined
    state.BuyerData = undefined
    state = undefined;

  }
  return appReducer(state, action);
};

export default rootReducer;
