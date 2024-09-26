import { useEffect, useState } from "react";
import { auth } from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "./LoadingPage";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/Product/ProductSlice";
import ProductHomeCart from "../components/ProductHomeCart";
import { fetchByCategory } from "../features/Product/ProductSlice";

export default function Home() {
  const location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, status, error, category } = useSelector(
    (state) => state.products
  );
  const [productsState, setProductsState] = useState(null);

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

  useEffect(() => {
    setProductsState(products);
  }, [products]);
  //  && status == "loading"
  // && status == "successful"
  return (
    <>
      {products.length == 0 && <Loader />}
      {products.length > 0 && (
        <div className="max-w-screen-xl mx-auto mt-[80px] mb-4 ">
          <div className="flex justify-between">
            <h1 className="px-3 max-w-screen-xl mx-auto mt-[20px] font-mono text-[40px] sm:text-[50px]">
              Products for {category}
            </h1>
            <div></div>
          </div>
          <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {productsState &&
              products.map((product, index) => (
                <ProductHomeCart key={index} product={product} />
              ))}
          </div>
        </div>
      )}
      {status == "error" && (
        <div className="max-w-screen-xl mx-auto my-4"> error Occured</div>
      )}
    </>
  );
}
