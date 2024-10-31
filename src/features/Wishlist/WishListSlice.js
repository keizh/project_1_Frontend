import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWishList = createAsyncThunk("fetch/wishList", async () => {
  const response = await fetch(
    `https://project-1-backend-v3.vercel.app/wishlist`,
    {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("project_1"),
      },
    }
  );

  const data = await response.json();
  // console.log(data);
  // console.log(data.data.wishlistData.products);
  return data.data.wishlistData.products;
});

export const addToWishList = createAsyncThunk(
  "Add/wishList",
  async (product, { dispatch }) => {
    const response = await fetch(
      `https://project-1-backend-v3.vercel.app/wishlist/add`,
      {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("project_1"),
        },
      }
    );
    dispatch(fetchWishList());
    const data = await response.json();
    console.log(data);
  }
);

export const removeFromWishList = createAsyncThunk(
  "Remove/wishList",
  async (productIdContainingObject, { dispatch }) => {
    const response = await fetch(
      `https://project-1-backend-v3.vercel.app/wishlist/remove`,
      {
        method: "POST",
        body: JSON.stringify(productIdContainingObject),
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("project_1"),
        },
      }
    );
    dispatch(fetchWishList());
    const data = await response.json();
    console.log(data);
  }
);

const WishListSlice = createSlice({
  name: "WishListSlice",
  initialState: {
    WishList: [],
    status: "idle", // "error" , "loading" , "successful",
    error: null,
  },
  reducers: {
    removeFromWishListSYNC: (state, action) => {
      const { productId } = action.payload;
      console.log(productId);
      state.WishList = state.WishList.filter(
        (ele) => ele.productId !== productId
      );
      console.log(state.WishList);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishList.fulfilled, (state, action) => {
        state.status = "successfull";
        state.WishList = [...action.payload];
      })
      .addCase(fetchWishList.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });

    builder
      .addCase(addToWishList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishList.fulfilled, (state) => {
        state.status = "successfull";
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });

    builder
      .addCase(removeFromWishList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromWishList.fulfilled, (state) => {
        state.status = "successfull";
      })
      .addCase(removeFromWishList.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default WishListSlice;
export const { removeFromWishListSYNC } = WishListSlice.actions;
