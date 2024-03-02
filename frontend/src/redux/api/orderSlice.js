import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";
import {
  markOrderAsDelivered,
  markOrderAsPaidByAdmin,
} from "../../../../backend/controllers/orderController";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    getOrderDetail: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "GET",
      }),
    }),

    payOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PAYPAL_URL}/${id}/pay`,
        method: "PUT",
        body: data,
      }),
    }),

    getPaypalClientId: builder.query({
      query: () => ({
        url: `${PAYPAL_URL}`,
        method: "GET",
      }),
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        method: "GET",
      }),
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/all`,
        method: "GET",
      }),
    }),

    deliverOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/deliver`,
        method: "PUT",
      }),
    }),

    getTotalOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/total-orders`,
        method: "GET",
      }),
    }),

    getTotalSales: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/total-sales`,
        method: "GET",
      }),
    }),

    getTotalSalesByDate: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/total-sales-by-date`,
        method: "GET",
      }),
    }),

    markOrderAsPaidByAdmin: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/paid`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useDeliverOrderMutation,
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
  useMarkOrderAsPaidByAdminMutation,
} = orderApiSlice;
