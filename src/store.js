import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import nowPlayingReducer from "./assets/reducers/nowPlayingReducer";
import moviePopularReducer from "./assets/reducers/moviePopularReducer";
import upComingReducer from "./assets/reducers/upComingReducer";
import topRatedReducer from "./assets/reducers/topRatedReducer";
import searchReducer from "./assets/reducers/searchReducer";
import detailReducer from "./assets/reducers/detailReducer";
import authMeReducer from "./assets/reducers/authMeReducer";
import loginReducer from "./assets/reducers/loginReducer";
import registerReducer from "./assets/reducers/registerReducer";

const rootReducers = combineReducers({
  nowPlaying: nowPlayingReducer,
  moviePopular: moviePopularReducer,
  upComing: upComingReducer,
  topRated: topRatedReducer,
  search: searchReducer,
  detail: detailReducer,
  auth: authMeReducer,
  login: loginReducer,
  register: registerReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["todo"],
  // blacklist: ["counter"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
