import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

export const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    bookCount: (state, payload) => {
      state = payload;
    },
  },
});
