import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("fetch/products", async () => {
  const response = await fetch(
    `https://project-1-backend-v3.vercel.app/product`,
    {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("project_1"),
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
});

export const fetchSingleProduct = createAsyncThunk(
  "fetch/SingleProduct",
  async (id) => {
    const response = await fetch(
      `https://project-1-backend-v3.vercel.app/product/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("project_1"),
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const fetchByCategory = createAsyncThunk(
  "fetch/productByCategory",
  async (ObjectWithCategoryName) => {
    const response = await fetch(
      `https://project-1-backend-v3.vercel.app/productByCategory/${ObjectWithCategoryName.category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`project_1`),
        },
      }
    );

    const data = await response.json();
    console.log(data);
    return [data, ObjectWithCategoryName.category];
  }
);
const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
    status: "idle", // "loading" , "successful" , "error"
    error: null,
    product: null,
    category: "All",
    price: "All",
  },
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload.price;
    },
    setCategory: (state, action) => {
      state.category = action.payload.category;
    },
    clearProduct: (state) => {
      state.product = null;
    },
    makeWishListFalseForSelectedProduct: (state) => {
      state.product.in_wishlist = false;
    },
    makeWishListTrueForSelectedProduct: (state) => {
      state.product.in_wishlist = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "successful";
        state.products = [...action.payload.data.products];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "successful";
        state.product = action.payload.data.product;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.status = "successful";
        state.products = [...action.payload[0].data.products];
        state.category = action.payload[1];
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const {
  makeWishListFalseForSelectedProduct,
  makeWishListTrueForSelectedProduct,
  setCategory,
  setPrice,
  clearProduct,
} = productSlice.actions;
export default productSlice;
