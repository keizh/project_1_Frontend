/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
  fetchWishList,
} from "../features/Wishlist/WishListSlice";
export default function ProductHomeCart({ product }) {
  const { WishList } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const {
    _id,
    name,
    description,
    price,
    category,
    subCategory,
    for: genderCategory,
    sizesAvailable,
    colorOptions,
    material,
    brand,
    stock,
    rating,
    reviews,
    imageURL,
    in_wishlist,
  } = product;
  const [wishlist, setWishlist] = useState(false);

  const onClickHandler = () => {
    // if its true , remove it from wishList , since it will removed now and the state will be changed to false meaning it is not part of wishlist anymoreH
    if (wishlist) {
      dispatch(
        removeFromWishList({
          productId: _id,
        })
      );
    } else {
      // add it to wishlist since it will pushed in the wishlist
      dispatch(
        addToWishList({
          productId: _id,
          productImg: imageURL[colorOptions[0]],
          productPrice: price,
          productName: name,
        })
      );
    }
    setWishlist((state) => !state);
  };

  useEffect(() => {
    if (WishList.find((ele) => ele.productId == _id)) {
      setWishlist(true);
    } else {
      setWishlist(false);
    }
  }, []);

  return (
    <Card className="w-full  shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img
          // src={`${"https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"}`}
          src={`${imageURL[colorOptions[0]]}`}
          className="h-[500px] md:h-[360px] object-contain object-center"
          alt={`${colorOptions[0]}`}
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          size="sm"
          color={wishlist ? "red" : "white"}
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
          onClick={onClickHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
      </CardHeader>
      <NavLink className="block" to={`product/${_id}`}>
        <CardBody>
          <div className=" flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              {name}
            </Typography>
            <Typography
              color="blue-gray"
              className="flex items-center gap-1.5 font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-0.5 h-5 w-5 text-yellow-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              {rating}
            </Typography>
          </div>
          <div className="flex justify-between my-2">
            <Typography variant="h4" color="grey" className="mt-1">
              Price :
            </Typography>
            <Typography variant="h4" color="grey" className="mt-1">
              $ {price}
            </Typography>
          </div>
          <Button className="mt-2" size="lg" fullWidth={true}>
            CHECKOUT
          </Button>
        </CardBody>
      </NavLink>
    </Card>
  );
}
