import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { loadingReducer } from "./loadingSlice";

const rootReducer = combineReducers({
  loading: loadingReducer,
});

export const store = configureStore({ reducer: rootReducer });
