import AsyncStorage from "@react-native-async-storage/async-storage";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { api } from "./api";

import FavoriteSlice from "./FavoriteSlice";
import QuerySlice from "./QuerySlice";

const reducers = combineReducers({
    favorites: FavoriteSlice,
    searchResults: QuerySlice,
    [api.reducerPath]: api.reducer,
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ['favorites', 'searchResults'] // add reducers you want to persist here
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
});

export default store;
