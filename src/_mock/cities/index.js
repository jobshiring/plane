import { _mock } from '../mock';
import { cityNames, cityCodes, countryNames } from './data';

// ----------------------------------------------------------------------

export const _cities = [...Array(34)].map((_, index) => ({
  _id: _mock.id(index),
  code: cityCodes[index],
  city: cityNames[index],
  country: countryNames[index],
  status: index === 5 || index === 8 ? 'disabled' : 'active',
  order: index + 1,
}));
