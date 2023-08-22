import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	progress: 5,
};

const sellSlice = createSlice({
	name: "sell",
	initialState,
	reducers: {
		makeProgress: (state, action) => {
			state.progress = action.payload;
		},
	},
});

export const { makeProgress } = sellSlice.actions;
export const sellSelector = (state) => state.sell;
export default sellSlice.reducer;
