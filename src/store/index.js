import storage from "redux-persist/lib/storage";
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authReducer from "../features/auth/slice";
import dashboardReducer from "../features/dashboard/slice";
import settingsReducer from "../features/setting/slice";
import companyReducer from "../features/company/slice";
import yourJobsReducer from "../features/yourjobs/slice";
import candidatesReducer from "../features/candidate/slice";
import connectedReducer from "../features/connected/slice";
import creditsReducer from "../features/credits/slice";
import chatReducer from "../features/chat/slice";
import profileSearchReducer from "../features/profileSearch/slice";
import familyStatusReducer from "../features/profileSearch/slice";
import filterModalReducer from '../app-ui/filterModal/slice';

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["profile"],
};

const reducers = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  settings: settingsReducer,
  company: companyReducer,
  yourJobs: yourJobsReducer,
  candidates: candidatesReducer,
  connected: connectedReducer,
  credits: creditsReducer,
  chat: chatReducer,
  profileSearch: profileSearchReducer,
  filterModal: filterModalReducer

});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export let persistor = persistStore(store);
