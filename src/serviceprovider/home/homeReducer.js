import { 
    GET_MENU_FILTER_SUCCESS,
    GET_BOOKMARK_SUCCESS,
    GET_BOOKMARK_ERROR,
    GET_FILTER_BOOKMARK_SUCCESS,
    GET_FILTER_BOOKMARK_ERROR,
    GET_CHANGE_BOOKMARK_SUCCESS,
    GET_CHANGE_BOOKMARK_ERROR,
    PERSIST_SELECTION
} from "./types";
  
const INITIAL_STATE = {
    menuFilter: [],
    bookmark: [],
    selectedOpt: ""
};
  
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MENU_FILTER_SUCCESS:
            return Object.assign({}, state, {
                menuFilter: action.payload
            });

        case GET_BOOKMARK_SUCCESS:
            return Object.assign({}, state, {
                bookmark: action.payload
            });

        case GET_BOOKMARK_ERROR:
            return Object.assign({}, state, {
                bookmark: []
            });

        case GET_FILTER_BOOKMARK_SUCCESS:
            return Object.assign({}, state, {
                bookmark: action.payload
            });

        case GET_FILTER_BOOKMARK_ERROR:
            return Object.assign({}, state, {
                bookmark: []
            });

        case GET_CHANGE_BOOKMARK_SUCCESS:
            return Object.assign({}, state, {
                bookmark: action.payload
            });

        case GET_CHANGE_BOOKMARK_ERROR:
            return Object.assign({}, state, {
                bookmark: []
            });

        case PERSIST_SELECTION:
            return Object.assign({}, state, {
                selectedOpt: action.payload
            });

        default:
        return state;
    }
};