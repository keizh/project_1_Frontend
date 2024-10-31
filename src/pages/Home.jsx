import { useEffect, useState } from "react";
import { auth } from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "./LoadingPage";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/Product/ProductSlice";
import ProductHomeCart from "../components/ProductHomeCart";
import { fetchByCategory } from "../features/Product/ProductSlice";
import { Input } from "@material-tailwind/react";

export default function Home() {
  const location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, status, error, category } = useSelector(
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
      if (category == "All") dispatch(fetchProducts());
      else dispatch(fetchByCategory({ category }));
    }
  }, [navigate, dispatch, category]);

  // useEffect(() => {
  //   setProductsState(products);
  // }, [products]);
  //  && status == "loading"
  // && status == "successful"

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

  return (
    <>
      {products.length == 0 && status == "loading" && <Loader />}
      {products.length > 0 && (
        <div className="max-w-screen-xl mx-auto mt-[80px] mb-4 ">
          <div className="flex flex-col  justify-center  gap-[10px]">
            <h1 className="px-3 max-w-screen-xl mx-auto mt-[20px] font-mono text-[40px] sm:text-[50px]">
              Products for {category}
            </h1>
            <div className="w-96  mx-auto">
              <Input
                onChange={handleSearch}
                label="search Products"
                className=" mx"
              />
            </div>
          </div>
          <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {productsState &&
              productsState.map((product, index) => (
                <ProductHomeCart key={index} product={product} />
              ))}
            {productsState && productsState.length == 0 && (
              <p className="mt-5 text-center">No Such Products Found</p>
            )}
          </div>
        </div>
      )}
      {status == "error" && (
        <div className="max-w-screen-xl mx-auto my-4"> error Occured</div>
      )}
    </>
  );
}
