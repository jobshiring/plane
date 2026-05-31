import { _mock } from '../mock';
import { paymentMethodsList } from './data';

// ----------------------------------------------------------------------

export const _paymentMethods = [...Array(2)].map((_, index) => ({
  _id: _mock.id(index),
  name: paymentMethodsList[index],
  mode: index === 0 ? 'development' : 'production',
  status: 'active',
}));
