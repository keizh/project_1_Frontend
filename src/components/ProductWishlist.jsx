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
import { removeFromWishListSYNC } from "../features/Wishlist/WishListSlice";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromWishList } from "../features/Wishlist/WishListSlice";

export default function ProductWishlist({ product, setProducts }) {
  const dispatch = useDispatch();
  const { productId, productImg, productPrice, productName } = product;
  const onClickHandler = () => {
    dispatch(removeFromWishListSYNC({ productId }));
    dispatch(removeFromWishList({ productId }));
  };
  return (
    <Card className="w-full  shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img
          src={`${productImg}`}
          className="h-[500px] md:h-[360px] object-contain object-center"
          alt="product_image"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          size="sm"
          color="red"
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
      <NavLink className="block" to={`/product/${productId}`}>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {productName}
          </Typography>
          <div className="flex justify-between my-2">
            <Typography variant="h4" color="grey" className="mt-1">
              Price :
            </Typography>
            <Typography variant="h4" color="grey" className="mt-1">
              $ {productPrice}
            </Typography>
          </div>
          <Button className="mt-2" size="lg" fullWidth={true}>
            VIEW PRODUCT
          </Button>
        </CardBody>
      </NavLink>
    </Card>
  );
}
