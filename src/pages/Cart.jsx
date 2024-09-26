/* eslint-disable no-unused-vars */
import React from "react";
import { auth } from "../utils/auth.js";
import { postOrder } from "../features/Order/OrderSlice.js";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import ProductCart from "../components/ProductCart.jsx";
import {
  fetchCart,
  removeFromcart,
  addOneToProductQuantityInCart,
  removeOneToProductQuantityInCart,
} from "../features/Cart/CartSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useActionData, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { clearCart } from "../features/Cart/CartSlice.js";

function Cart() {
  const dispatch = useDispatch();
  const { cart, status, error, orderPosted } = useSelector(
    (state) => state.cart
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [cartProducts, setCartProducts] = useState([]);
  const [totalQuantity, setTotalQunatity] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleOrder = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      try {
        await dispatch(postOrder({ products: cartProducts, total: totalCost }));
        await dispatch(clearCart());
        await dispatch(fetchCart());
        setCartProducts([]);
        setLoading(false);
        setOpen(true);
      } catch (err) {
        console.log(`error in pushing order ${err.message}`);
      }
    }, 1000);
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const navigate = useNavigate();
  useEffect(() => {
    const authAccess = auth();
    console.log(`access : `, authAccess);
    if (!authAccess) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    setCartProducts(cart);
    setTotalQunatity(cart.reduce((acc, ele) => acc + ele.productQuantity, 0));
    setTotalCost(
      cart.reduce((acc, ele) => acc + ele.productQuantity * ele.productPrice, 0)
    );
    console.log(cart);
  }, [cart]);

  return (
    <>
      <h1 className="px-3 max-w-screen-xl mx-auto mt-[80px]  font-mono text-[40px] sm:text-[50px] ">
        Cart 🛒
      </h1>

      {/* {cartProducts.length > 0 && ( */}
      <div className="flex px-3 gap-[20px] flex-col md:flex-row md:justify-between max-w-screen-xl mx-auto my-[20px] min-h-screen">
        <div className="md:w-[65%] h-fit  flex flex-col gap-[20px]">
          {cartProducts.length > 0 &&
            cart.map((ele, index) => (
              <ProductCart
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                ele={ele}
                key={index}
              />
            ))}
          {cart.length == 0 && (
            <p className="mt-[100px] text-center text-[20px] flex justify-center items-center">
              <span>CART IS EMPTY</span>
            </p>
          )}
        </div>
        <div className="md:w-[30%] h-fit p-5 rounded-xl shadow-lg shadow-amber-700 sticky top-[70px]">
          <Typography variant="h4" className="flex justify-between">
            Price Details
          </Typography>
          <hr />
          {cartProducts.map((ele, index) => (
            <Typography
              key={index}
              variant="h6"
              className="flex justify-between mb-[5px]"
            >
              <span> Price : ( {ele.productQuantity} item )</span>{" "}
              <span>
                {" "}
                {(ele.productQuantity * ele.productPrice).toFixed(2)}{" "}
              </span>
            </Typography>
          ))}

          {cartProducts.length > 0 ? (
            <>
              <Typography variant="h6" className="flex justify-between">
                <span> Discount </span>{" "}
                <span>-{(totalCost * 0.15).toFixed(2)} </span>
              </Typography>
              <Typography variant="h6" className="flex justify-between">
                <span> Delivery Charges </span> <span>$10</span>
              </Typography>
              <hr className="my-[5px]" />
              <Typography variant="h6" className="flex justify-between">
                <span> TOTAL AMOUNT</span>{" "}
                <span>${(totalCost - totalCost * 0.15 - 10).toFixed(2)}</span>
              </Typography>
              <hr className="my-[5px]" />
              <Typography variant="h6" className="flex justify-between">
                You will save ${(totalCost * 0.15).toFixed(2)} on this order
              </Typography>
              <Button
                loading={loading}
                className="mt-[10px] w-[100%] bg-blue-700 flex justify-center"
                size="lg"
                onClick={handleOrder}
              >
                Place Order
              </Button>
            </>
          ) : (
            <Typography variant="h6" className="flex justify-between mt-[5px]">
              The Cart is waiting to be filled.
            </Typography>
          )}
        </div>
      </div>
      {/* )} */}
      {status == "error" && <p>{error}</p>}
      {status == "loading" && cartProducts.length == 0 && <h1>Loading...</h1>}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Shopify Alert</DialogHeader>
        <DialogBody>Your Order has been successfully placed</DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Cart;
