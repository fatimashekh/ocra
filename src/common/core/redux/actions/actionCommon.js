import { LOADER_HIDE, LOADER_SHOW, LOADER_DISPLAY, LOADER_REMOVE } from '../types';

export const actionLoaderShow = () => {
  return {
    type: LOADER_SHOW,
    payload: true
  }
}

export const actionLoaderHide = () => {
  return {
    type: LOADER_HIDE,
    payload: false
  }
}

export const actionLoaderDisplay = () => {
  return {
    type: LOADER_DISPLAY,
    payload: true
  }
}

export const actionLoaderRemove = () => {
  return {
    type: LOADER_REMOVE,
    payload: false
  }
}