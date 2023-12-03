import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	hasSeen: false,
	lastMessage: "",
};

const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		setHasSeen: (state, action) => {
			state.hasSeen = action.payload;
		},
		setLastMessage: (state, action) => {
			state.lastMessage = action.payload;
		},
	},
});

export const { setHasSeen, setLastMessage } = messageSlice.actions;
export const messageSelector = (state) => state.message;
export default messageSlice.reducer;
