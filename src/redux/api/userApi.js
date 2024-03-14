import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/users",
  }),
  tagTypes: ["user"],

  endpoints: (builder) => ({
    createOrLoginUser: builder.mutation({
      query: (data) => {
        return {
          url: "/create-or-login-user",
          method: "PUT",
          body: data,
        };
      },
    }),

    getSingleUser: builder.query({
      query: (email) => {
        return {
          url: `/${email}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    getAllUsers: builder.query({
      query: () => {
        return {
          url: "/",
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    updateProfile: builder.mutation({
      query: (options) => {
        return {
          url: `/update-profile/${options.email}`,
          method: "PATCH",
          body: options.data,
        };
      },
      invalidatesTags: ["user"],
    }),

    updateRole: builder.mutation({
      query: (options) => {
        return {
          url: `/update-role/${options.email}`,
          method: "PATCH",
          body: options.role,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateOrLoginUserMutation,
  useGetSingleUserQuery,
  useGetAllUsersQuery,
  useUpdateProfileMutation,
  useUpdateRoleMutation,
} = userApi;
