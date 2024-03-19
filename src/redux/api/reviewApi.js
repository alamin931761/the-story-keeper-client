import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/reviews",
  }),
  tagTypes: ["review"],

  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ id, review }) => {
        return {
          url: `/add-review/${id}`,
          method: "POST",
          body: review,
        };
      },
      invalidatesTags: ["review"],
    }),

    getSingleReview: builder.query({
      query: (id) => {
        return {
          url: `/single-review/${id}`,
          method: "GET",
        };
      },
    }),

    getAllReviews: builder.query({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),

    updateReview: builder.mutation({
      query: ({ id, review }) => {
        return {
          url: `/${id}`,
          method: "PATCH",
          body: review,
        };
      },
      invalidatesTags: ["review"],
    }),

    deleteReview: builder.mutation({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "DELETE",
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
