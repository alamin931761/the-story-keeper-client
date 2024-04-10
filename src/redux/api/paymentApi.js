import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/payments",
  }),
  tagTypes: ["payment"],

  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: ({ total, token }) => {
        return {
          url: "/create-payment-intent",
          method: "POST",
          body: { total },
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["payment"],
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
