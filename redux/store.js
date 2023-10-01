import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sellReducer from "./sellSlice";
import loadingReducer from "./loadingSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		sell: sellReducer,
		loading: loadingReducer,
	},
});
