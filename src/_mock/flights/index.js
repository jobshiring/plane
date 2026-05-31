import { _mock } from '../mock';
import oneWayFlights from './oneway.json';
import roundTripFlights from './roundtrip.json';
import {
  cityNames,
  airportCodes,
  tripType,
  totalSeats,
} from '../airports/data';
import { currencyCodes, exchangeRates } from './data';

// Get departure date (current date + days) with time set to 00:00:00
const getDepartureDate = (days) => {
  const departureDate = new Date();
  departureDate.setDate(departureDate.getDate() + days);
  departureDate.setHours(0, 0, 0, 0);
  return departureDate;
};

// Get arrival date by adding hours to departure
const getArrivalDate = (days, hours) => {
  const departureDate = new Date();
  departureDate.setDate(departureDate.getDate() + days);
  const arrivalDate = new Date(departureDate);
  arrivalDate.setHours(arrivalDate.getHours() + hours);
  return arrivalDate;
};

export const _featuredFlights = [...Array(8)].map((_, index) => ({
  _id: _mock.id(index),
  status: index === 5 || index === 8 ? 'disabled' : 'active',
  departure: {
    city: cityNames[index],
    iataCode: airportCodes[index],
    _id: _mock.id(index),
  },
  arrival: {
    city: cityNames[20 - index],
    iataCode: airportCodes[20 - index],
    _id: _mock.id(index),
  },
  departureDate: getDepartureDate(index + 5),
  arrivalDate: getArrivalDate(index + 5, index * 2 + 5),
  tripType: tripType[index],
  totalSeats: totalSeats[index],
}));

export const _flights = (params) => {
  const { currency, type } = params;
  const currencyIndex = currencyCodes.findIndex(
    (v) => v === (params.currency.toUpperCase() || 'USD')
  );
  const currentRate = exchangeRates[currencyIndex];
  return (type === 'round' ? roundTripFlights : oneWayFlights).map(
    (outerArray) =>
      outerArray.map((innerArray) =>
        innerArray.map((flight) => ({
          ...flight,
          currency,
          price: Number((flight.price * currentRate).toFixed(1)),
          actual_price: Number((flight.actual_price * currentRate).toFixed(1)),
          tax: Number((flight.tax * currentRate).toFixed(1)),
        }))
      )
  );
};
