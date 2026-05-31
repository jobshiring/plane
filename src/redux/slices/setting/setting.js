/* Core */
import { createSlice } from '@reduxjs/toolkit';
import palette from '@/theme/palette';
const initialState = {
  themeMode: 'system',
  darkMode: false,
  currency: 'USD',
  baseCurrency: 'USD',
  palette: {
    primary: palette.light.primary.main,
    secondary: palette.light.secondary.main,
    defaultDark: palette.dark.background.default,
    defaultLight: palette.light.background.default,
    paperDark: palette.dark.background.paper,
    paperLight: palette.light.background.paper,
    isLoading: true,
  },
  contact: {
    address: '',
    addressOnMap: '',
    email: '',
    phone: '',
  },
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeMode: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.darkMode = !state.darkMode;
    },
    setThemeMode(state, action) {
      state.themeMode = action.payload;
    },
    setCurrency(state, action) {
      state.currency = action.payload.currency;
      state.baseCurrency = action?.payload?.baseCurrency || state.baseCurrency;
    },
    setThemePalette(state, action) {
      state.palette = action.payload;
    },
    setContectInfo(state, action) {
      state.contact = action.payload;
    },
  },
});
// Actions
export const { setThemeMode } = settingSlice.actions;
