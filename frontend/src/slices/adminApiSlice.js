import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";  
export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
    userDetails: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/home`,
        method: "GET",
      }),
    }),
    userData: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/userData/${data}`,
        method: "GET",
      }),
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/updateUser`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/deleteUser/${data}`,
        method: "POST",
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/createUser`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserDetailsQuery,
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useUserDataMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation
} = adminApiSlice;
