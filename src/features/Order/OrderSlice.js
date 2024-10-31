import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postOrder = createAsyncThunk(
  `post/order`,
  async (objForBackend, { dispatch }) => {
    const response = fetch(`https://project-1-backend-v3.vercel.app/order`, {
      method: "POST",
      body: JSON.stringify(objForBackend),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(`project_1`),
      },
    });
    const data = response.json();
    dispatch(fetchOrders);
    return data;
  }
);

export const fetchOrders = createAsyncThunk("fetch/order", async () => {
  const response = await fetch(
    `https://project-1-backend-v3.vercel.app/order`,
    {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem(`project_1`),
      },
    }
  );
  const data = await response.json();
  console.log(`orders:`, data);
  return data.data.Orders;
});

const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.status = "successful";
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "successful";
        state.orders = [...action.payload];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default OrderSlice;
