import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/payments",
  }),
  tagTypes: ["payment"],

  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (data) => {
        return {
          url: "/create-payment-intent",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["payment"],
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
