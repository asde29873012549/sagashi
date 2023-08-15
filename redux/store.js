/* eslint-disable*/
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sellReducer from "./sellSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    sell: sellReducer,
  },
});
