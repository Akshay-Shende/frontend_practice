"use client"
import React, { useState } from 'react';
import Card from "@/_components/card";
import InfiniteScroll from "react-infinite-scroll-component";

const Page = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 200) {
      setHasMore(false);
      return;
    }

    // Simulate an API call
    setTimeout(() => {
      setItems((prevItems) => prevItems.concat(Array.from({ length: 20 })));
    }, 1000);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p style={{ textAlign: 'center' }}>You've seen it all!</p>}
    >
      <div className="grid grid-cols-3 gap-12 justify-center mx-28">
        {items.map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Page;
