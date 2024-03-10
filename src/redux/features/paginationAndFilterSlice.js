import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  limit: 3,
  page: 1,
  count: 3,
  minimumValue: 0,
  maximumValue: 2000,
  sort: "updatedAt",
};

export const paginationAndFilterSlice = createSlice({
  name: "paginationAndFilter",
  initialState,
  reducers: {
    bookCount: (state, action) => {
      state.count = action.payload;
    },

    pageNumber: (state, action) => {
      state.page = action.payload;
    },

    bookSize: (state, action) => {
      state.size = action.payload;
    },

    minimumSliderValue: (state, action) => {
      state.minimumValue = action.payload;
    },

    maximumSliderValue: (state, action) => {
      state.maximumValue = action.payload;
    },

    booksLimit: (state, action) => {
      state.limit = action.payload;
    },

    booksSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const {
  bookCount,
  pageNumber,
  minimumSliderValue,
  maximumSliderValue,
  booksLimit,
  booksSort,
} = paginationAndFilterSlice.actions;

export default paginationAndFilterSlice.reducer;
