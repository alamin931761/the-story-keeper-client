import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  limit: 3,
  page: 1,
  count: 3,
  minimumValue: 0,
  maximumValue: 2000,
  sort: "availableQuantity",
};

export const paginationAndFilterSlice = createSlice({
  name: "paginationAndFilter",
  initialState,
  reducers: {
    documentsCount: (state, action) => {
      state.count = action.payload;
    },

    pageNumber: (state, action) => {
      state.page = action.payload;
    },

    minimumSliderValue: (state, action) => {
      state.minimumValue = action.payload;
    },

    maximumSliderValue: (state, action) => {
      state.maximumValue = action.payload;
    },

    documentsLimit: (state, action) => {
      state.limit = action.payload;
    },

    documentsSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const {
  documentsCount,
  pageNumber,
  minimumSliderValue,
  maximumSliderValue,
  documentsLimit,
  documentsSort,
} = paginationAndFilterSlice.actions;

export default paginationAndFilterSlice.reducer;
