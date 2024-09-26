import { useNavigate } from "react-router-dom";
import ProductWishlist from "../components/ProductWishlist.jsx";
import { fetchWishList } from "../features/Wishlist/WishListSlice";
import { useEffect, useState } from "react";
import { auth } from "../utils/auth.js";
import { useDispatch, useSelector } from "react-redux";
function WishList() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { WishList, error, status } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  useEffect(() => {
    const authAccess = auth();
    console.log(`access : `, authAccess);
    if (!authAccess) {
      navigate("/signin");
    }
  }, [navigate]);
  useEffect(() => {
    dispatch(fetchWishList());
  }, []);
  useEffect(() => {
    setProducts(() => [...WishList]);
    console.log(WishList);
  }, [WishList]);
  // status == "loading" &&
  return (
    <>
      {WishList.length == 0 && (
        <h1 className="text-center mx-auto max-w-screen-xl">Loading...</h1>
      )}
      {/* {WishList.length > 0 && ( */}
      <div className="max-w-screen-xl mx-auto mt-[80px]  mb-4 px-2">
        <h1 className="font-mono text-[40px] sm:text-[50px]">
          WishList Products
        </h1>
        {products && products.length > 0 && (
          <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {products.map((ele, index) => (
              <ProductWishlist
                setProducts={setProducts}
                key={index}
                product={ele}
              />
            ))}
          </div>
        )}
        {products.length == 0 && (
          <p className="mt-[100px] text-center text-[20px] flex justify-center items-center">
            WISH LIST{" "}
            <span className="mx-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="red"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
            IS EMPTY
          </p>
        )}
      </div>
      {/* )} */}
      {status == "error" && <p>{error}</p>}
    </>
  );
}

export default WishList;
