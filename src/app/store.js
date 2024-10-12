"use client";
import { configureStore } from "@reduxjs/toolkit";
import paginationReducer  from "@/features/pagination/paginationSlice";
import logInUserReducer   from "@/features/logInUser/logInUserSlice";
import cartReducer from "@/features/cart/cartSlice";

import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  paginationReducer,
  logInUserReducer,
  cartReducer,

  // Add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
