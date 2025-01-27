import { useEffect, useLayoutEffect, useState } from "react";
import { auth } from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "./LoadingPage";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/Product/ProductSlice";
import ProductHomeCart from "../components/ProductHomeCart";
import { fetchByCategory } from "../features/Product/ProductSlice";
import { Input } from "@material-tailwind/react";
import { fetchUserData } from "../features/User/UserSlice";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, status, category, price } = useSelector(
    (state) => state.products
  );
  const [productsState, setProductsState] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const authAccess = auth();
    console.log(`access : `, authAccess);
    if (!authAccess) {
      navigate("/signin");
    } else {
      dispatch(fetchUserData());
      if (category == "All") dispatch(fetchProducts());
      else dispatch(fetchByCategory({ category }));
    }
  }, [navigate, dispatch, category]);

  const handleSearch = (e) => setSearch(e.target.value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search != "") {
        console.log(search);
        console.log(productsState);
        setProductsState((productsState) =>
          productsState.filter((product) =>
            new RegExp(search, "i").test(product.name)
          )
        );
      } else {
        setProductsState(products);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search, products]);

  const renderingProducts = () => {
    if (productsState) {
      if (productsState.length == 0) {
        return <p className="mt-5 text-center">No Such Products Found</p>;
      } else {
        const filteredArray = productsState.filter((ele) => {
          if (price == "All") {
            return true;
          } else {
            return ele.price < price;
          }
        });

        if (filteredArray.length == 0) {
          return <p>No Products</p>;
        } else {
          const renderedItems = filteredArray.map((product, index) => (
            <ProductHomeCart key={index} product={product} />
          ));
          return renderedItems;
        }
      }
    } else {
      return <p>No Products to such filtering</p>;
    }
  };

  return (
    <>
      {products.length == 0 && status == "loading" && <Loader />}
      {products.length > 0 && (
        <div className="max-w-screen-xl mx-auto mt-[80px] mb-4 ">
          <div className="flex flex-col  justify-center  gap-[10px]">
            <h1 className="pointer px-3 max-w-screen-xl mx-auto mt-[20px] font-mono text-[40px] sm:text-[50px]">
              Products for {category}
            </h1>
            {/* <button
              onClick={() => {
                // let jwt = localStorage.getItem("project_1");
                // const { id } = jwtDecode(jwt);
                // console.log(id);
                // dispatch(fetchUserData());
              }}
            >
              click
            </button> */}
            <p className="text-center">
              {price == "All"
                ? `Products of All Prices`
                : `Products wil price less than ${price}`}
            </p>
            <div className="w-96  mx-auto">
              <Input
                onChange={handleSearch}
                label="search Products"
                className=" mx"
              />
            </div>
          </div>
          <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {/* {productsState &&
              productsState
                .filter((ele) => {
                  if (price == "All") {
                    return true;
                  } else {
                    return ele.price < price;
                  }
                })
                .map((product, index) => (
                  <ProductHomeCart key={index} product={product} />
                ))}
            {productsState && productsState.length == 0 && (
              <p className="mt-5 text-center">No Such Products Found</p>
            )} */}
            {renderingProducts()}
          </div>
        </div>
      )}
      {status == "error" && (
        <div className="max-w-screen-xl mx-auto my-4"> error Occured</div>
      )}
    </>
  );
}
