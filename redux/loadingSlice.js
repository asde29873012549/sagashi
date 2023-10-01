import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	active: false,
};

const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		activate: (state) => {
			state.active = !state.active;
		},
	},
});

export const { activate } = loadingSlice.actions;
export const loadingSelector = (state) => state.loading;
export default loadingSlice.reducer;
