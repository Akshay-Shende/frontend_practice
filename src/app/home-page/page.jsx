"use client"
import React, { useEffect, useState, useContext } from 'react';
import Card from "@/_components/card";
import InfiniteScroll from "react-infinite-scroll-component";
import useProducts from '@/appwriteServices/productService';
import { LoadingContext } from '@/context/loadingContext';
import Spinner from '@/_components/spinner';

const Page = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const { getProducts } = useProducts();
  const { loading, setLoading } = useContext(LoadingContext);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getProducts();
      setItems(res.documents);
      setLoading(false);
    })();
  }, []);
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
          <Card key={item.$id} product={item}/>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Page;
