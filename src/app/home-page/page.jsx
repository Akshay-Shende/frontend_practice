"use client";
import React, { useEffect, useState, useContext } from "react";
import Card from "@/_components/card";
import InfiniteScroll from "react-infinite-scroll-component";
import useProducts from "@/appwriteServices/productService";
import { LoadingContext } from "@/context/loadingContext";
import Spinner from "@/_components/spinner";
import useCart from "@/appwriteServices/cartServices";
import { setCartCount } from "@/features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const Page = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [cartData, setCartData] = useState([]);
  const { getProducts } = useProducts();
  const { getCartByUserId } = useCart();
  const userId = useSelector((state) => state.logInUserReducer.user.id);
  const cartCount = useSelector((state) => state.cartReducer.cartCount);
  const { loading, setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getProducts();
        console.log(userId);
        if (!userId == 0) {
          const cart = await getCartByUserId(userId);
          dispatch(setCartCount(cart.documents.length));
          let cartProduct = cart.documents.map((item) => item);
          console.log(cartProduct);

          setCartData(cartProduct);
        }
        setItems(res.documents);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId,cartCount]);

  const fetchMoreData = () => {
    // if (items.length >= 200) {
    //   setHasMore(false);
    //   return;
    // }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className="grid grid-cols-3 gap-12 justify-center mx-28">
        {items.map((item) => (
          <Card
            key={item.$id}
            product={item}
            cartData={cartData.filter((e) => e.ProductId == item.$id)}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Page;
