import { apiSlice } from "./apiSlice";
import { CATEGORIES_URL } from "../../redux/constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}/categories`,
        method: "GET",
      }),
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORIES_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
