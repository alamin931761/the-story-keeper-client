import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/orders" }),
  tagTypes: ["order"],

  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: "/create-order",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["order"],
    }),

    getAllOrders: builder.query({
      query: () => {
        return {
          url: "/",
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),

    getUserOrders: builder.query({
      query: (email) => {
        return {
          url: `/${email}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),

    updateOrderStatus: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/${id}`,
          method: "PATCH",
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
