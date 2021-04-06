import * as R from 'ramda';

import {
    getLocalStorage,
  } from '../commonFunctions';

export const getFeatureStatus = (pageName, featureName) => {
    const featureToggle = getLocalStorage('featureToggle');
    return R.pathOr(false, [pageName, featureName,'isActive'], featureToggle)
}