import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/all`,
        method: "GET",
        providesTags: ["Products"],
        keepUnusedDataFor: 5,
      }),
    }),

    getProductDetail: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/detail/${id}`,
        method: "GET",
        providesTags: ["Products"],
        keepUnusedDataFor: 5,
      }),
    }),

    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
        method: "GET",
        providesTags: ["Products"],
        keepUnusedDataFor: 5,
      }),
    }),

    getRandomProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/random`,
        method: "GET",
        providesTags: ["Products"],
        keepUnusedDataFor: 5,
      }),
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/addproduct`,
        method: "POST",
        body: data,
      }),
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),

    uploadImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    createRewiew: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.id}/reviews`,
        method: "POST",
        body: data,
      }),
    }),

    createProductlan2: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/createproduct`,
        method: "POST",
        body: data,
      }),
    }),

    updateProductlan2: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/updateproduct/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    findProductByName: builder.query({
      query: (name) => ({
        url: `${PRODUCTS_URL}/product/${name}`,
        method: "GET",
        providesTags: ["Products"],
        keepUnusedDataFor: 5,
      }),
    }),

    createReviewByname: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/product/${data.name}/reviews`,
        method: "POST",
        body: data,
        invalidatesTags: ["Products"],
        keepUnusedDataFor: 5,
      }),
    }),

    getRelativeProduct: builder.query({
      query: (name) => ({
        url: `${PRODUCTS_URL}/product/${name}/category`,
        method: "GET",
        providesTags: ["Products"],
        keepUnusedDataFor: 5,
      }),
    }),

    filterProducts: builder.query({
      query: (data) => ({
        url: `${PRODUCTS_URL}/filter`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductDetailQuery,
  useGetTopProductsQuery,

  useGetRandomProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadImageMutation,
  useCreateRewiewMutation,
  useCreateProductlan2Mutation,
  useUpdateProductlan2Mutation,
  useFindProductByNameQuery,
  useCreateReviewBynameMutation,
  useGetRelativeProductQuery,
  useFilterProductsQuery,
} = productApiSlice;
