import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/books" }),
  tagTypes: ["book"],

  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (data) => ({
        url: "/add-book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),

    getAllBooks: builder.query({
      query: (params) => {
        return {
          url: "/",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["book"],
    }),

    getSingleBook: builder.query({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "GET",
        };
      },
      providesTags: ["book"],
    }),

    updateBook: builder.mutation({
      query: (options) => {
        return {
          url: `/${options.id}`,
          method: "PATCH",
          body: options.data,
        };
      },
      invalidatesTags: ["book"],
    }),

    deleteBook: builder.mutation({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["book"],
    }),

    getRandomBooks: builder.query({
      query: ({ id, bookCategory }) => {
        return {
          url: `/random-books/${id}`,
          method: "GET",
          params: bookCategory,
        };
      },
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetRandomBooksQuery,
} = bookApi;
