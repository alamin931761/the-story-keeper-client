import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/users",
  }),
  tagTypes: ["user"],

  // create or login user
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

    // get single user
    getSingleUser: builder.query({
      query: ({ email }) => {
        return {
          url: `/${email}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    // get all users
    getAllUsers: builder.query({
      query: ({ token }) => {
        return {
          url: "/",
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      providesTags: ["user"],
    }),

    // update profile
    updateProfile: builder.mutation({
      query: ({ email, data, token }) => {
        return {
          url: `/update-profile/${email}`,
          method: "PATCH",
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["user"],
    }),

    updateRole: builder.mutation({
      query: ({ email, role, token }) => {
        return {
          url: `/update-role/${email}`,
          method: "PATCH",
          body: role,
          headers: { Authorization: `Bearer ${token}` },
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
