import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
};

export const orderInfoSlice = createSlice({
  name: "orderInfo",
  initialState,
  reducers: {
    info: (state, action) => {
      state.order = { ...state.order, ...action.payload };
    },

    clearInfo: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { info, clearInfo } = orderInfoSlice.actions;

export default orderInfoSlice.reducer;
