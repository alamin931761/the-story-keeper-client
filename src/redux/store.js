import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/bookApi";
import { userApi } from "./api/userApi";
import paginationAndFilterReducer from "./features/paginationAndFilterSlice";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    paginationAndFilter: paginationAndFilterReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      bookApi.middleware,
      userApi.middleware
    );
  },
});
