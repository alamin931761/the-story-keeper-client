import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/books" }),
  tagTypes: ["book"],

  endpoints: (builder) => ({
    // add book
    addBook: builder.mutation({
      query: ({ data, token }) => {
        return {
          url: "/add-book",
          method: "POST",
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["book"],
    }),

    // get all books
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

    // get single book
    getSingleBook: builder.query({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "GET",
        };
      },
      providesTags: ["book"],
    }),

    // update book
    updateBook: builder.mutation({
      query: ({ id, data, token }) => {
        return {
          url: `/${id}`,
          method: "PATCH",
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["book"],
    }),

    // delete book
    deleteBook: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: `/${id}`,
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["book"],
    }),

    // get random books
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
