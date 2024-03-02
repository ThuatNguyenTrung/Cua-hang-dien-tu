import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../../redux/constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}`,
        method: "POST",
      }),
    }),

    getAll: builder.query({
      query: () => ({
        url: `${USERS_URL}/all`,
        method: "GET",
        providesTags: ["Users"],
        keepUnusedDataFor: 5,
      }),
    }),

    profile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
        keepUnusedDataFor: 5,
      }),
    }),

    update: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update`,
        method: "PUT",
        body: data,
      }),
    }),

    delete: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),

    profileById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/profile/${id}`,
        method: "GET",
        keepUnusedDataFor: 5,
      }),
    }),

    updateById: builder.mutation({
      query: (data) => {
        if (!data || !data.id) {
          throw new Error("Invalid data object. Missing id property.");
        }
        return {
          url: `${USERS_URL}/update/${data.id}`,
          method: "PUT",
          body: data,
          invalidatesTags: ["User"],
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAllQuery,
  useProfileQuery,
  useUpdateMutation,
  useDeleteMutation,
  useProfileByIdQuery,
  useUpdateByIdMutation,
} = usersApiSlice;
