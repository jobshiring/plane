import { _mock } from '../mock';
import { airportNames, airportCodes, cityNames, countryNames } from './data';

// ----------------------------------------------------------------------

export const _airports = [...Array(33)].map((_, index) => ({
  _id: _mock.id(index),
  airport: airportNames[index],
  code: airportCodes[index],
  city: cityNames[index],
  country: countryNames[index],
  status: index === 5 || index === 8 ? 'disabled' : 'active',
  type: index > 15 ? 'destination' : 'origin',
  order: index + 1,
}));

const origin = _airports.filter((v) => v.type === 'origin').slice(0, 5);
const destination = _airports
  .filter((v) => v.type === 'destination')
  .slice(0, 5);

export const _airportSuggestions = [...origin, ...destination];
