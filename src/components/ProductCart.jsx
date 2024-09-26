/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  fetchCart,
  removeFromcart,
  addOneToProductQuantityInCart,
  removeOneToProductQuantityInCart,
} from "../features/Cart/CartSlice";
import { useDispatch } from "react-redux";

import {
  reduceQuantityOfProduct,
  addQuantityOfProduct,
  removeProduct,
} from "../features/Cart/CartSlice";

function ProductCart({ ele }) {
  //   const [quantity, setQuantity] = useState(ele.productQuantity);
  const dispatch = useDispatch();
  function handleQuantityReduction(productCartId) {
    if (ele.productQuantity > 1) {
      //   setQuantity(quantity - 1);
      //   setCartProducts((cartProducts) =>
      //     cartProducts.map((ele) =>
      //       ele.productCartId === productCartId
      //         ? { ...ele, productQuantity: ele.productQuantity - 1 }
      //         : ele
      //     )
      //   );
      dispatch(reduceQuantityOfProduct({ productCartId }));
      dispatch(removeOneToProductQuantityInCart({ productCartId }));
    } else {
      //   setCartProducts((cartProducts) =>
      //     cartProducts.filter((ele) => ele.productCartId !== productCartId)
      //   );
      dispatch(removeFromcart({ productCartId }));
      dispatch(removeProduct({ productCartId }));
    }
  }
  function handleQuantityAddition(productCartId) {
    // setQuantity(quantity + 1);
    // setCartProducts((cartProducts) =>
    //   cartProducts.map((ele) =>
    //     ele.productCartId == productCartId
    //       ? { ...ele, productQuantity: ele.productQuantity + 1 }
    //       : ele
    //   )
    // );
    dispatch(addQuantityOfProduct({ productCartId }));
    dispatch(addOneToProductQuantityInCart({ productCartId }));
  }

  return (
    <div className="flex rounded-xl shadow-lg shadow-emerald-700 p-4 justify-evenly ">
      <CardHeader floated={false} className="w-[30%] h-fit">
        <img src={`${ele.productImg}`} alt="profile-picture" />
      </CardHeader>
      <div className="flex flex-col gap-[10px] mt-[15px]">
        <Typography variant="h4">{ele.productName}</Typography>
        <Typography variant="lead">COLOR : {ele.productColor}</Typography>
        <Typography variant="lead">PRICE : {ele.productPrice}</Typography>
        <div className="flex items-center gap-[8px] justify-start ">
          <span>QUANTITY : </span>
          <button
            onClick={() => handleQuantityReduction(ele.productCartId)}
            className="p-1 rounded-full shadow-lg "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <span>{ele.productQuantity}</span>
          <button
            onClick={() => handleQuantityAddition(ele.productCartId)}
            className="p-1 rounded-full shadow-lg "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <Typography variant="lead">SIZE : {ele.productSize}</Typography>
        <Button
          onClick={() => {
            const productCartId = ele.productCartId;
            dispatch(removeFromcart({ productCartId }));
            dispatch(removeProduct({ productCartId }));
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default ProductCart;
