import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/bookApi";
import { userApi } from "./api/userApi";
import { reviewApi } from "./api/reviewApi";
import { couponApi } from "./api/couponApi";
import paginationAndFilterReducer from "./features/paginationAndFilterSlice";
import orderInfoReducer from "./features/orderInfoSlice";
import { paymentApi } from "./api/paymentApi";
import { orderApi } from "./api/orderApi";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    paginationAndFilter: paginationAndFilterReducer,
    orderInfo: orderInfoReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      bookApi.middleware,
      userApi.middleware,
      reviewApi.middleware,
      couponApi.middleware,
      paymentApi.middleware,
      orderApi.middleware
    );
  },
});
