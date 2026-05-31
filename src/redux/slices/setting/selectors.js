// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const darkMode = (state) => state.setting.darkMode;
export const themeMode = (state) => state?.setting?.themeMode;
export const themePalette = (state) => state.setting.palette;
export const currency = (state) => state.setting.currency;
export const baseCurrency = (state) => state.setting.baseCurrency;
export const contact = (state) => state.setting.contact;
export const getSettings = (state) => state.setting;
