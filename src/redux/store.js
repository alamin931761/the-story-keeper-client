import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/bookApi";
import { userApi } from "./api/userApi";
import { reviewApi } from "./api/reviewApi";
import paginationAndFilterReducer from "./features/paginationAndFilterSlice";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    paginationAndFilter: paginationAndFilterReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      bookApi.middleware,
      userApi.middleware,
      reviewApi.middleware
    );
  },
});
