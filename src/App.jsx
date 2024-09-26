/* eslint-disable react/prop-types */
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import MegaMenuDefault from "./components/Nav.jsx";
import Cart from "./pages/Cart.jsx";
import Product from "./pages/Product.jsx";
import WishList from "./pages/WishList.jsx";
import Orders from "./pages/Orders.jsx";
import EditProfileDetails from "./pages/EditProfileDetails.jsx";
import Help from "./pages/Help.jsx";

function AppNavigation({ children }) {
  return (
    <>
      <MegaMenuDefault />
      {children}
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <AppNavigation>
              <Home />
            </AppNavigation>
          }
        />
        <Route
          path="/wishlist"
          element={
            <AppNavigation>
              <WishList />
            </AppNavigation>
          }
        />
        <Route
          path="/cart"
          element={
            <AppNavigation>
              <Cart />
            </AppNavigation>
          }
        />
        <Route
          path="/product/:id"
          element={
            <AppNavigation>
              <Product />
            </AppNavigation>
          }
        />
        <Route
          path="/Orders"
          element={
            <AppNavigation>
              <Orders />
            </AppNavigation>
          }
        />
        <Route
          path="/EditProfileDetails"
          element={
            <AppNavigation>
              <EditProfileDetails />
            </AppNavigation>
          }
        />
        <Route
          path="/Help"
          element={
            <AppNavigation>
              <Help />
            </AppNavigation>
          }
        />
      </Routes>
    </div>
  );
}
