import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk("get/cart", async () => {
  const response = await fetch(`http://localhost:5500/cart`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem(`project_1`),
    },
  });
  const data = await response.json();
  console.log(`Cart fetched:`, data);
  return data;
});

export const postToCart = createAsyncThunk(
  "post/cart",
  async (product, { dispatch }) => {
    const response = await fetch(`http://localhost:5500/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(`project_1`),
      },
      body: JSON.stringify(product),
    });
    dispatch(fetchCart());
    const data = await response.json();
    return data;
  }
);

export const removeFromcart = createAsyncThunk(
  "delete/cart",
  async (ObjectWithProductCardId, { dispatch }) => {
    console.log(`delete it`, ObjectWithProductCardId);
    const response = await fetch(
      `http://localhost:5500/cart/${ObjectWithProductCardId.productCartId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem(`project_1`),
        },
      }
    );
    const data = await response.json();
    dispatch(fetchCart());
    return data;
  }
);

export const addOneToProductQuantityInCart = createAsyncThunk(
  "Add/CartProductQuantity",
  async (objectWithProductCartId, { dispatch }) => {
    console.log(`add 1`, objectWithProductCartId);
    const response = await fetch(`http://localhost:5500/cart/addedBy1`, {
      method: "POST",
      body: JSON.stringify(objectWithProductCartId),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(`project_1`),
      },
    });
    const data = await response.json();
    // dispatch(fetchCart());
    return data;
  }
);

export const removeOneToProductQuantityInCart = createAsyncThunk(
  "Remove/CartProductQuantity",
  async (objectWithProductCartId, { dispatch }) => {
    console.log(`remove 1`, objectWithProductCartId);
    const response = await fetch(`http://localhost:5500/cart/subtractBy1`, {
      method: "POST",
      body: JSON.stringify(objectWithProductCartId),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(`project_1`),
      },
    });
    const data = await response.json();
    // dispatch(fetchCart());
    return data;
  }
);

export const clearCart = createAsyncThunk("post/clearcart", async () => {
  const response = fetch(`http://localhost:5500/cart/clear`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem(`project_1`),
    },
  });
  const data = response.json();

  return data;
});

const CartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    cart: [],
    status: "idle", // loading , successful , error
    error: null,
    statusAddToCart: "idle",
  },
  reducers: {
    reduceQuantityOfProduct: (state, action) => {
      const { productCartId } = action.payload;
      state.cart = state.cart.map((ele) =>
        ele.productCartId === productCartId
          ? { ...ele, productQuantity: ele.productQuantity - 1 }
          : ele
      );
    },
    addQuantityOfProduct: (state, action) => {
      const { productCartId } = action.payload;
      state.cart = state.cart.map((ele) =>
        ele.productCartId === productCartId
          ? { ...ele, productQuantity: ele.productQuantity + 1 }
          : ele
      );
    },
    removeProduct: (state, action) => {
      const { productCartId } = action.payload;
      state.cart = state.cart.filter(
        (ele) => ele.productCartId != productCartId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "successful";
        state.cart = [...action.payload.data[0].products];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });

    builder
      .addCase(postToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postToCart.fulfilled, (state, action) => {
        state.status = "successful";
        state.statusAddToCart = action.payload.message;
      })
      .addCase(postToCart.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });

    builder
      .addCase(removeFromcart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromcart.fulfilled, (state) => {
        state.status = "successful";
      })
      .addCase(removeFromcart.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });

    builder
      .addCase(addOneToProductQuantityInCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOneToProductQuantityInCart.fulfilled, (state) => {
        state.status = "successful";
        // setTimeout(() => (state.status = "idle"), 100);
      })
      .addCase(addOneToProductQuantityInCart.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });

    builder
      .addCase(removeOneToProductQuantityInCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeOneToProductQuantityInCart.fulfilled, (state) => {
        state.status = "successful";
        // setTimeout(() => (state.status = "idle"), 100);
      })
      .addCase(removeOneToProductQuantityInCart.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });

    builder
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "successful";
        state.cart = [];
      })
      .addCase(clearCart.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default CartSlice;

export const { reduceQuantityOfProduct, addQuantityOfProduct, removeProduct } =
  CartSlice.actions;
