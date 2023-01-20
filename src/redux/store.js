import AsyncStorage from "@react-native-async-storage/async-storage";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import FavoriteSlice from "./FavoriteSlice";

const reducers = combineReducers({
    favorites: FavoriteSlice
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ['favorites'] // add reducers you want to persist here
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export default store;
