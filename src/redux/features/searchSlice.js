import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchBook: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { searchBook } = searchSlice.actions;

export default searchSlice.reducer;
