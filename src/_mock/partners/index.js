import { _mock } from '../mock';
import { partnersList } from './data';

// ----------------------------------------------------------------------

export const _featuredPartners = [...Array(12)].map((_, index) => ({
  _id: _mock.id(index),
  cover: {
    _id: _mock.id(index),
    url: `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${partnersList[index].code}.svg`,
  },
  name: partnersList[index].name,
}));
