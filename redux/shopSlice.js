import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	shoppingCartItemCount: null,
};

const shopSlice = createSlice({
	name: "shop",
	initialState,
	reducers: {
		setShoppingCartItemCount: (state) => {
			state.shoppingCartItemCount = state.shoppingCartItemCount + 1;
		},
	},
});

export const { setShoppingCartItemCount } = shopSlice.actions;
export const shopSelector = (state) => state.shop;
export default shopSlice.reducer;
