import { configureStore } from "@reduxjs/toolkit";
import { useSelector as useReduxSelector, useDispatch as useReduxDispatch } from "react-redux";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

// 🧩 Example: import your local reducers (no API calls)
import { reducer } from "./rootReducer";
import { middleware } from "./middleware";

// 🧱 Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Wrap the reducer with persistence
const persistedReducer = persistReducer(persistConfig, reducer);

// 🏗️ Configure Redux store
export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
});

// Create the persistor instance
export const persistor = persistStore(reduxStore);

// 🔧 Hooks
export const useDispatch = () => useReduxDispatch();
export const useSelector = useReduxSelector;
