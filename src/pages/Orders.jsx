import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../features/Order/OrderSlice";
function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const authAccess = auth();
    console.log(`access : `, authAccess);
    if (!authAccess) {
      navigate("/signin");
    } else {
      console.log(`dispatch is made`);
      dispatch(fetchOrders());
    }
  }, [navigate, dispatch]);

  const { orders, status, error } = useSelector((state) => state.order);
  console.log(`efewfew`, orders);

  return (
    <div className="max-w-screen-xl mx-auto pt-[100px] px-4">
      <Typography variant="h1" color="blue" textGradient className="mb-5">
        PRIOR ORDER's
      </Typography>
      {orders.length > 0 && (
        <div className="flex gap-[20px] flex-col">
          {orders.map((ele, index) => (
            <div
              className="p-5 shadow-lg shadow-slate-700 rounded-lg"
              key={index}
            >
              <Typography
                variant="h5"
                color="red"
                className="mb-5 flex justify-between"
              >
                <span>Order Id</span> <span>{ele.orderId}</span>
              </Typography>
              <div className="flex gap-[20px] flex-wrap">
                {ele.products.map((ele, index) => (
                  <div
                    key={index}
                    className="p-2 rounded mb-[15px] shadow-md shadow-amber-500"
                  >
                    <ul>
                      <li>Name : {ele.productName}</li>
                      <li>Color : {ele.productColor}</li>
                      <li>Size : {ele.productSize}</li>
                      <li>Quantity : {ele.productQuantity}</li>
                      <li>Product Cost : {ele.productPrice}</li>
                    </ul>
                  </div>
                ))}
              </div>
              <Typography
                variant="h5"
                color="blue"
                textGradient
                className="mb-5"
              >
                Total Price : $ {ele.total}
              </Typography>
            </div>
          ))}
        </div>
      )}
      {orders.length == 0 && <p>NO ORDER's HAVE BEEN MADE</p>}
    </div>
  );
}

export default Orders;
