/* eslint-disable no-unused-vars */
import {
  createActionCreatorInvariantMiddleware,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

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
  async (product, { dispatch, rejectWithValue }) => {
    try {
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
      // dispatch(fetchWishList());
      const data = await response.json();
      console.log(data);
      return data.newUpdatedWishList.products;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeFromWishList = createAsyncThunk(
  "Remove/wishList",
  async (productIdContainingObject, { dispatch, rejectWithValue }) => {
    try {
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

      const data = await response.json();

      return productIdContainingObject.productId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
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
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.status = "successfull";
        state.WishList = action.payload;
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });

    builder
      .addCase(removeFromWishList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromWishList.fulfilled, (state, action) => {
        state.status = "successfull";
        console.log(`125-->`, action.payload);
        state.WishList = state.WishList.filter(
          (ele) => ele.productId != action.payload
        );
      })
      .addCase(removeFromWishList.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default WishListSlice;
export const { removeFromWishListSYNC } = WishListSlice.actions;
