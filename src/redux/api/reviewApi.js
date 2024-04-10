import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/reviews",
  }),
  tagTypes: ["review"],

  endpoints: (builder) => ({
    // add review
    addReview: builder.mutation({
      query: ({ id, review, token }) => {
        return {
          url: `/add-review/${id}`,
          method: "POST",
          body: review,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["review"],
    }),

    // get single review
    getSingleReview: builder.query({
      query: ({ id }) => {
        return {
          url: `/single-review/${id}`,
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),

    // get all review
    getAllReviews: builder.query({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),

    // update review
    updateReview: builder.mutation({
      query: ({ id, review, token }) => {
        return {
          url: `/${id}`,
          method: "PATCH",
          body: review,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["review"],
    }),

    deleteReview: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: `/${id}`,
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetSingleReviewQuery,
  useGetAllReviewsQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
