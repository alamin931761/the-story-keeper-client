import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    search: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { search } = searchSlice.actions;

export default searchSlice.reducer;
