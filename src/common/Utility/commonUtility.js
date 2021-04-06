import * as R from 'ramda';
import { uniqBy } from 'lodash';

export const getErpPaymentTerm = (paymentTerm, paymentTermLookUp, paymentTermEnabled, key = 'value') => {

    if(!R.isEmpty(paymentTermLookUp) && !R.isNil(paymentTermLookUp) && paymentTermEnabled) {
       const paymentTermValue = R.find(R.propEq(key, R.toString(paymentTerm)))(paymentTermLookUp);
        return R.isNil(paymentTermValue) ? paymentTerm : R.pathOr(paymentTerm, ['label'],paymentTermValue)
    }
    return paymentTerm;
}

export const getFilter = (partList, key) =>
  uniqBy(
    partList
      .map((data) => {
        if (data[key]) {
          return { text: data[key], value: data[key] };
        }
      })
      .filter(Boolean),
    "text"
  );
