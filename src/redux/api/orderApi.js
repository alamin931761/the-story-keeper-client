import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/orders" }),
  tagTypes: ["order"],

  endpoints: (builder) => ({
    // create order
    createOrder: builder.mutation({
      query: ({ order, token }) => {
        return {
          url: "/create-order",
          method: "POST",
          body: order,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["order"],
    }),

    // get all orders
    getAllOrders: builder.query({
      query: ({ token }) => {
        return {
          url: "/",
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      providesTags: ["order"],
    }),

    // get user orders
    getUserOrders: builder.query({
      query: ({ email, token }) => {
        return {
          url: `/${email}`,
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      providesTags: ["order"],
    }),

    // update order status
    updateOrderStatus: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: `/${id}`,
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
