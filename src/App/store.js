import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/Product/ProductSlice";
import WishListSlice from "../features/Wishlist/WishListSlice";
import CartSlice from "../features/Cart/CartSlice";
import OrderSlice from "../features/Order/OrderSlice";
import UserSlice from "../features/User/UserSlice";

export default configureStore({
  reducer: {
    products: productSlice.reducer,
    wishlist: WishListSlice.reducer,
    cart: CartSlice.reducer,
    order: OrderSlice.reducer,
    user: UserSlice.reducer,
  },
});
