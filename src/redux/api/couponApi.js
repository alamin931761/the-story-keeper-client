import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/coupons",
  }),
  tagTypes: ["coupon"],

  endpoints: (builder) => ({
    addCoupon: builder.mutation({
      query: (data) => {
        return {
          url: "/add-coupon",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["coupon"],
    }),

    getSingleCoupon: builder.query({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "GET",
        };
      },
      providesTags: ["coupon"],
    }),

    getAllCoupons: builder.query({
      query: () => {
        return {
          url: "/",
          method: "GET",
        };
      },
      providesTags: ["coupon"],
    }),

    updateCoupon: builder.mutation({
      query: (options) => {
        return {
          url: `/${options.id}`,
          method: "PATCH",
          body: options.updatedData,
        };
      },
      invalidatesTags: ["coupon"],
    }),

    deleteCoupon: builder.mutation({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["coupon"],
    }),

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
