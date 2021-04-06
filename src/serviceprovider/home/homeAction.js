import { post, get } from "axios";
import { 
    GET_MENU_FILTER, 
    GET_MENU_FILTER_SUCCESS,
    GET_BOOKMARK,
    GET_BOOKMARK_SUCCESS,
    GET_BOOKMARK_ERROR,
    GET_FILTER_BOOKMARK,
    GET_FILTER_BOOKMARK_SUCCESS,
    GET_CHANGE_BOOKMARK,
    GET_CHANGE_BOOKMARK_SUCCESS,
    GET_CHANGE_BOOKMARK_ERROR,
    PERSIST_SELECTION
 } from "./types";
import ocraApiService from "../../common/core/api/apiService";

export const actionGetMenuFilter = data => {
    const request = ocraApiService("getPrimeMenuItems", data);
    return {
      type: GET_MENU_FILTER,
      payload: request
    };
};  
  
export const actionGetMenuFilterSuccess = data => {
    return {
        type: GET_MENU_FILTER_SUCCESS,
        payload: data
    };
};

export const actionGetError = errorType => {
    return {
      type: errorType
    };
};

export const actionGetBookmark = data => {
    const request = ocraApiService("getBookmarks", data);
    return {
      type: GET_BOOKMARK,
      payload: request
    };
};

export const actionGetBookmarkSuccess = data => {
    return {
        type: GET_BOOKMARK_SUCCESS,
        payload: data
    };
};

export const actionGetFilterBookmark = data => {
    const request = ocraApiService("filterBookmarks", data);
    return {
      type: GET_FILTER_BOOKMARK,
      payload: request
    };
};

export const actionGetFilterBookmarkSuccess = data => {
    return {
        type: GET_FILTER_BOOKMARK_SUCCESS,
        payload: data
    };
};

export const actionGetChangeBookmark = data => {
    const request = ocraApiService("changeBookmarks", data);
    return {
      type: GET_CHANGE_BOOKMARK,
      payload: request
    };
};

export const actionGetChangeBookmarkSuccess = data => {
    return {
        type: GET_CHANGE_BOOKMARK_SUCCESS,
        payload: data
    };
};

export const actionPersistSelection = data => {
    return {
        type: PERSIST_SELECTION,
        payload: data
    };
}