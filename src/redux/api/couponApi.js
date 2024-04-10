import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/coupons",
  }),
  tagTypes: ["coupon"],

  endpoints: (builder) => ({
    // add coupon
    addCoupon: builder.mutation({
      query: ({ data, token }) => {
        return {
          url: "/add-coupon",
          method: "POST",
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["coupon"],
    }),

    // get single coupon
    getSingleCoupon: builder.query({
      query: ({ id, token }) => {
        return {
          url: `/${id}`,
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      providesTags: ["coupon"],
    }),

    // get all coupons
    getAllCoupons: builder.query({
      query: ({ token }) => {
        return {
          url: "/",
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      providesTags: ["coupon"],
    }),

    // update coupon
    updateCoupon: builder.mutation({
      query: ({ id, updatedData, token }) => {
        return {
          url: `/${id}`,
          method: "PATCH",
          body: updatedData,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["coupon"],
    }),

    // delete coupon
    deleteCoupon: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: `/${id}`,
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["coupon"],
    }),

    // verify coupon
    verifyCoupon: builder.mutation({
      query: (code) => {
        return {
          url: `/verify-coupon`,
          method: "POST",
          body: code,
        };
      },
    }),
  }),
});

export const {
  useAddCouponMutation,
  useGetSingleCouponQuery,
  useGetAllCouponsQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useVerifyCouponMutation,
} = couponApi;
