import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	isRegisterFormActive: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		toggleRegisterForm: (state) => {
			state.isRegisterFormActive = !state.isRegisterFormActive;
		},
	},
});

export const { toggleRegisterForm } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;
