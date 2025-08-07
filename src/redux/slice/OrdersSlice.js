import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: [], // better default
  reducers: {
    setOrders: (state, action) => {
      return action.payload; // assumes payload is an array
    },
    clearOrders: () => {
      return [];
    }
  }
});

export const { setOrders, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
