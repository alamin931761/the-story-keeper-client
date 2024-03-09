import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/bookApi";
import paginationAndFilterReducer from "./features/paginationAndFilterSlice";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    paginationAndFilter: paginationAndFilterReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(bookApi.middleware);
  },
});
