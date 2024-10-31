import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../features/Product/ProductSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postToCart } from "../features/Cart/CartSlice";
import { auth } from "../utils/auth";
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Alert,
} from "@material-tailwind/react";
import {
  addToWishList,
  removeFromWishList,
  fetchWishList,
} from "../features/Wishlist/WishListSlice";
import {} from "../features/Cart/CartSlice";
function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  const { statusAddToCart, error } = useSelector((state) => state.cart);
  const [productState, setProductState] = useState(null);
  const [wishlist, setWishlist] = useState(product?.in_wishlist);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  // const [alert, setAlert] = useState("idle");
  // when product changes it will re-run the useEffect
  useEffect(() => {
    setProductState(product);
    console.log(product);
  }, [product]);

  const navigate = useNavigate();
  useEffect(() => {
    const authAccess = auth();
    console.log(`access : `, authAccess);
    if (!authAccess) {
      navigate("/signin");
    }
  }, [navigate]);

  // when the component is mounted intially , it will dispatch
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);

  // function handleShowingAlert() {
  //   setAlert(statusAddToCart);
  //   setTimeout(() => {
  //     setAlert("idle");
  //   }, 1000);
  // }

  // useEffect(() => {
  //   if (statusAddToCart != "idle") handleShowingAlert();
  // }, [statusAddToCart]);

  const onClickHandler = () => {
    // if its true , remove it from wishList , since it will removed now and the state will be changed to false meaning it is not part of wishlist anymoreH
    if (wishlist) {
      dispatch(
        removeFromWishList({
          productId: productState?._id,
        })
      );
    } else {
      // add it to wishlist since it will pushed in the wishlist
      dispatch(
        addToWishList({
          productId: productState?._id,
          productImg:
            productState?.imageURL[
              productState?.colorOptions[selectedColorIndex]
            ],
          productPrice: productState?.price,
          productName: productState?.name,
        })
      );
    }
    console.log();
    setWishlist((state) => !state);
  };

  const handleAddToCart = (productState) => {
    dispatch(
      postToCart({
        productId: productState?._id,
        productCartId: `${productState?._id}+${productState?.sizesAvailable[selectedSizeIndex]}+${productState?.colorOptions[selectedColorIndex]}`,
        productImg:
          productState?.imageURL[
            productState?.colorOptions[selectedColorIndex]
          ],
        productQuantity: 1,
        productColor: productState?.colorOptions[selectedColorIndex],
        productPrice: productState?.price,
        productSize: productState?.sizesAvailable[selectedSizeIndex],
        productName: productState?.name,
      })
    );
  };

  return (
    <div className="flex flex-col gap-[50px] pt-[70px]">
      <div className="my-3 flex flex-col sm:flex-row gap-[20px] items-center sm:items-start sm:sticky sm:top-0 justify-center max-w-screen-xl mx-auto">
        <div className="w-full max-w-[400px] h-fit flex items-center justify-center">
          <CardHeader floated={false} color="blue-gray">
            <img
              src={`${
                productState?.imageURL[
                  productState?.colorOptions[selectedColorIndex]
                ]
              }`}
              alt="ui/ux review check"
              className=""
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
        </div>
        <div className="w-full px-[15px] flex flex-col gap-[15px]">
          <Typography variant="h5">Name : {productState?.name}</Typography>
          <Typography variant="paragraph">
            {productState?.description}
          </Typography>
          <Typography variant="h6">
            Category : {productState?.category}
          </Typography>
          <Typography variant="h6">Gender : {productState?.for}</Typography>
          <span>Available Sizes :</span>
          <div className="flex gap-[10px] flex-wrap">
            {productState?.sizesAvailable.map((ele, index) => (
              <Button
                key={index}
                variant={selectedSizeIndex == index ? "text" : "outlined"}
                onClick={() => {
                  setSelectedSizeIndex(index);
                }}
              >
                {ele}
              </Button>
            ))}
          </div>
          <span>Available Colors :</span>
          <div className="flex gap-[10px] flex-wrap">
            {productState?.colorOptions.map((ele, index) => (
              <Button
                key={index}
                variant={selectedColorIndex == index ? "text" : "outlined"}
                onClick={() => {
                  setSelectedColorIndex(index);
                }}
                className={`text-${ele.toLowerCase()}-200`}
              >
                {ele}
              </Button>
            ))}
          </div>
          <Typography variant="lead">
            Material : {productState?.material}
          </Typography>
          <Typography variant="lead">Brand : {productState?.brand}</Typography>
          <Typography variant="lead">
            Rating : ⭐ {productState?.rating}
          </Typography>
          <Typography variant="lead">
            Reviews : {productState?.reviews}
          </Typography>
          <Button
            color="teal"
            fullWidth
            onClick={() => handleAddToCart(productState)}
          >
            {" "}
            Add to Cart
          </Button>
        </div>
      </div>
      {/* <div className="flex items-center justify-center ">
        {alert == "add to cart" && (
          <Alert className="max-w-[500px]  w-full text-center" color="green">
            {alert}
          </Alert>
        )}
        {alert == "Product is in cart" && (
          <Alert className="max-w-[500px]  w-full text-center" color="amber">
            {alert}
          </Alert>
        )}
      </div> */}
      <div className="h-[150px]"></div>
    </div>
  );
}

export default Product;
