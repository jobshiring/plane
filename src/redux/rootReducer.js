/* Instruments */
import { combineReducers } from 'redux';
import { settingSlice, flightSlice, userSlice } from './slices';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can use other storage options if needed

const persistConfig = {
  key: 'setting',
  storage, // Use the storage engine you imported
  // Other configuration options if needed
  keyPrefix: 'redux-',
  whitelist: ['currency', 'darkMode', 'contact', 'themeMode', 'palette'],
};
const flightPersistConfig = {
  key: 'flight',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['booking', 'expiry', 'backUrl', 'isBooking'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['user', 'isAuthenticated'],
};

export const reducer = combineReducers({
  setting: persistReducer(persistConfig, settingSlice.reducer),
  flight: persistReducer(flightPersistConfig, flightSlice.reducer),
  user: persistReducer(userPersistConfig, userSlice.reducer),
});
